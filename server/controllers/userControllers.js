const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const jwt = require("jsonwebtoken");

const cloudinary = require("../utils/cloudinary");
const sendEmail = require("../utils/sendEmail");

const { JWT_SECRET, CLIENT_ACCESS_URL } = require("../config/keys");

// signup new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, contact, pic } = req.body;

  if (!name || !email || !password || !contact) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });
  const contactExists = await User.findOne({ contact });
  if (userExists) {
    return res.status(400).json({
      message: "Your E-Mail Id is already Registered with E-Talk",
      success: false,
    });
  }
  if (contactExists) {
    return res.status(400).json({
      message: "Your Mobile is already Registered with E-Talk",
      success: false,
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    contact,
    pic,
  });

  if (user) {
    const token = generateToken(user._id, "120s");
    const url = `${CLIENT_ACCESS_URL}/verify-email/${token}`;
    const options = {
      name: user.name,
      email: user.email,
      subject: "Verify Email",
      verification_Link: url,
      message_Content:
        "<p> Hi " +
        user.name +
        ",<br /> Please verify your E-Talk Account by clicking on the verification link. This Verification link is valid for 2:00 minutes <br /> <a href =" +
        url +
        " >Verify</a></p> ",
    };
    await sendEmail(options);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id, "30d"),
      message: "An Email is sent to your Email. Please Verify Your Email",
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the User");
  }
});

// Resend verication link
const resendVerificationLink = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(201).json({
        message: "Invalid Email",
      });
      return;
    }

    const token = generateToken(user._id, "120s");
    const url = `${CLIENT_ACCESS_URL}/verify-email/${token}`;
    const options = {
      name: user.name,
      email: user.email,
      subject: "Verify Email",
      verification_Link: url,
      message_Content:
        "<p> Hi " +
        user.name +
        ",<br /> Please verify your E-Talk Account by clicking on the verification link. This Verification link is valid for 2:00 minutes <br /> <a href =" +
        url +
        " >Verify</a></p> ",
    };
    await sendEmail(options);

    res.status(201).json({
      // verificationURL: url,
      message: `An Email is sent to your Email ${user.email}. Please Verify Your Email`,
    });
  } catch (error) {
    res.status(400).send({ message: "Internal Server Error" });
  }
});

// verify Email
const verifyEmail = asyncHandler(async (req, res) => {
  try {
    const { token } = req.body;

    //decodes token id
    const decoded = await jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });
    // console.log(user);
    if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }
    const data = {
      is_verified: true,
    };
    const updatedUser = await User.findByIdAndUpdate(user._id, data, {
      new: true,
    });

    res.status(200).send({
      message: "Email verified successfully",
      // updatedUser,
      success: true,
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Invalid Verification Link", success: false });
  }
});

// sign in user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Invalid Credentials OR User not found",
      success: false,
    });
  }
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
      message: "Login Successfull",
      success: true,
    });
  } else {
    return res.status(404).json({
      message: "Invalid Credentials OR User not found",
      success: false,
    });
  }
  if (!user.is_verified) {
    const token = generateToken(user._id, "120s");
    const url = `${CLIENT_ACCESS_URL}/verify-email/${token}`;

    const options = {
      name: user.name,
      email: user.email,
      subject: "Verify Email",
      verification_Link: url,
      message_Content:
        "<p> Hi " +
        user.name +
        ",<br /> Please verify your E-Talk Account by clicking on the verification link. This Verification link is valid for 2:00 minutes <br /> <a href =" +
        url +
        " >Verify</a></p> ",
    };
    await sendEmail(options);

    return res.status(201).json({
      // verificationURL: url,
      message: `An Email is sent to your Email ${user.email}. Please Verify Your Email`,
    });
  }
});

// Search user
const allUsers = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  } catch (error) {
    return res.status(401).json({
      message: "Unathorize Access",
      success: false,
    });
  }
});

// get my self
const getmyself = asyncHandler(async (req, res) => {
  try {
    const userDetails = req.user;
    return res.status(200).json({ user: { userDetails } });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    const password_Reset_Token = generateToken(user._id, "300s");
    const password_Reset_URL = `${CLIENT_ACCESS_URL}/reset-password/${password_Reset_Token}`;
    const options = {
      name: user.name,
      email: user.email,
      subject: "Forgot-Password",
      message_Content:
        "<p> Hi " +
        user.name +
        ",<br /> You can Reset your Password by clicking on the Reset password. This password Reset link will be active only for 5:00 minutes <br /> <a href =" +
        password_Reset_URL +
        " >Reset password</a></p> ",
    };

    await sendEmail(options);
    res.status(201).json({
      // passwordResetLink: password_Reset_URL,
      message: `Your Password Reset Link has been sent to your Email ${user.email} . Please check you Spam or Junk Folder.`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    //decodes token id
    const decoded = await jwt.verify(token, JWT_SECRET);

    let user = await User.findOne({ _id: decoded.id }).select("password");
    // console.log(user);
    if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }
    // const data = {
    //   is_verified: true,
    // };
    // user = await User.findByIdAndUpdate(user._id, data, {
    //   new: true,
    // });
    user.password = newPassword;
    user = await user.save();

    res.status(200).send({
      message: "Password changed successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).send({
      message: "password Reset Link has been expired",
      success: false,
    });
  }
});

// update profile name or about status

const updateProfile = asyncHandler(async (req, res) => {
  try {
    const { name, about } = req.body;
    let user = await User.findById(req.user._id).select("-password");
    // console.log(req.user);
    const data = {
      name: name || user.name,
      about: about || user.about,
    };
    user = await User.findByIdAndUpdate(user._id, data, { new: true });
    return res.status(200).json({
      message: "your profile update successfully.",
      // user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

/**
 *  Inviting User
 */

const invitingUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const InvitedUser = await User.findOne({ email });
    console.log(InvitedUser);
    const senderUser = req.user;
    const websiteUrl = CLIENT_ACCESS_URL;
    // console.log(senderUser);
    if (InvitedUser !== null) {
      res.status(201).json({
        success: false,
        message: "User Already Exist. You chat with user.",
      });
    }

    const options = {
      // name: InvitedUser.name,
      email: email,
      subject: "E-Talk Invitation",
      // verification_Link: url,
      message_Content:
        "<p> Hi " +
        email +
        ",<br /> Your Friend " +
        senderUser.name +
        " is available on the E-Talk. " +
        senderUser.name +
        " is Waitng for you. Please Register yourself and start chatting with " +
        senderUser.name +
        " . Click here to <br /> <a href =" +
        websiteUrl +
        " >Register</a></p> ",
    };

    await sendEmail(options);

    res.status(201).json({
      success: true,
      message: `An Invitation Email is sent to your friend email ${email} `,
    });
  } catch (error) {
    res.status(400).send({ succss: true, message: "Internal Server Error" });
  }
});

// upload profile image
const uploadProfileImage = asyncHandler(async (req, res) => {
  try {
    const file = req.file;

    let user = await User.findById(req.user.id);
    // delete exsisting image from cloudinary
    if (user.cloudinary_id) {
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }

    // upload new image to cloudinary
    const result = await cloudinary.uploader.upload(file.path);

    const data = {
      // name: req.body.name || user.name,
      pic: result.secure_url || user.pic,
      cloudinary_id: result.public_id || user.cloudinary_id,
    };

    user = await User.findByIdAndUpdate(user._id, data, { new: true });
    res.status(200).json({
      message: "image uploaded successfully",
      result,
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = {
  registerUser,
  verifyEmail,
  authUser,
  allUsers,
  getmyself,
  uploadProfileImage,
  resendVerificationLink,
  forgotPassword,
  resetPassword,
  updateProfile,
  invitingUser,
};
