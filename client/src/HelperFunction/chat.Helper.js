// To get the sender
export const getSender = (loggedUser, users) => {
  // console.log(users);
  if (!users) {
    return;
  }
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

// To get the sender pic
export const getSenderPic = (loggedUser, users) => {
  // console.log(users);
  if (!users) {
    return;
  }
  return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
};

// get sender profile details
export const getSenderProfileDetails = (loggedUser, sender) => {
  const { users } = sender;
  const data = {
    senderName: "",
    senderAbout: "",
    senderEmail: "",
    senderContact: "",
    senderPic: "",
  };

  users.forEach((element) => {
    if (loggedUser._id !== element._id) {
      data.senderName = element.name;
      data.senderAbout = element.about;
      data.senderEmail = element.email;
      data.senderContact = element.contact;
      data.senderPic = element.pic;
    }
  });
  // console.log(data);
  return data;
};

// get group public details
export const getGroupProfileDetails = (loggedUser, sender) => {
  // console.log(sender);
  const { _id, chatName, isGroupChat, users, groupAdmin, createdAt } = sender;

  const data = {
    groupId: _id,
    groupName: chatName,
    groupPic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6wQvepXb0gM_Ft1QUOs6UyYJjPOmA-gq5Yw&usqp=CAU",
    groupCreatedAt: createdAt,
    groupCreatedBy: groupAdmin.name,
    groupAdmin: {
      id: groupAdmin._id,
      name: groupAdmin.name,
    },
    groupUsers: [],
  };

  users.forEach((element) => {
    const obj = {
      id: element._id,
      name: element.name,
      pic: element.pic,
      about: element.about,
    };
    if (groupAdmin._id !== element._id) {
      data.groupUsers.push(obj);
    } else {
      data.groupUsers.unshift(obj);
    }
  });

  // console.log(data);
  return data;
};

export const isMyMessage = (loggedUser, message) => {
  if (!message.sender || !loggedUser) {
    return;
  }
  if (loggedUser._id === message.sender._id) {
    return true;
  }
  return false;
};

// getting time
export const getTime = (createdAt) => {
  const date = new Date(createdAt);
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  // return `${timeString}`;
  return `${dateString} ${timeString}`;
};
