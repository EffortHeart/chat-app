
# E-Talk

E-Talk is a basic chat Application that is build using the MERN Stack stands for MongoDB, ExpressJS, ReactJS, NodeJS.

## Live Website

## Features

- Sign Up
- Sign In
- Email Verification
- Forgot Password
- Reset Password
- Dark/Light mode
- one-on-one
- Group Chat
- Group Creation with min 3 users
- Chat Theme
- Update Profile Image
- Update Profile Details
- View others profile
- Fully Responsive

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Deployment:** Vercel(Frontend), Backend(Render)

## Installation Guide

To Run E-Talk project on local system follow the simple steps:

### Step-1

clone this project on your local system

### Step-2 Installing Dependency

Installing Dependency for client and Server both

```bash
  cd E-Talk
```

To Installing Dependency for client

```bash
  cd client
  npm i
```

To Installing Dependency for server

```bash
  cd server
  npm i
```

### Step-3 Adding Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Environment Variables for Client

`REACT_APP_SERVER_ACCESS_BASE_URL`

### Environment Variables for Server

`MONGO_URL`

`JWT_SECRET`

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

`SMPT_SERVICES`

`SMPT_MAIL`

`SMPT_PASSWORD`

`SMPT_HOST`

`SMPT_PORT`

`CLIENT_ACCESS_URL`

### Step-4 Start the Application on local machine

#### To Start Frontend Server(or client):

Move into client Directory by

```bash
  cd client
```

start the Frontend server by

```bash
  npm start
```

after ruunning this command, It will start after some time.

#### To Start Backend Server(or server):

Move into server Directory by

```bash
  cd server
```

start the Backend server by

```bash
  npm start
```

To start the server automatic after every changes we have to run this command :

```bash
  npm run dev
```

after starting the both Frontend and Backend server you can access application on the browser.
