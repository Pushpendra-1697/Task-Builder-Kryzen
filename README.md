# Task-Builder Application

## Overview
This project combines the powerful drag and drop functionality provided by the React DnD library with a secure authentication system. It aims to create an interactive and personalized experience for users while maintaining the necessary security measures to protect sensitive data and ensure appropriate access control.

## Project Type
Fullstack

## Deplolyed App
Frontend: https://kryzen-mocha.vercel.app
Backend: https://kryzen-server.onrender.com
Database: mongodb+srv://pushpendra:push@cluster0.zr7oie4.mongodb.net/kryzen?retryWrites=true&w=majority&appName=Cluster0

## Directory Structure
Task-Builder-Kryzen/
├─ server/
     ├─ Configs
     ├─ Models
     ├─ Middleware
     ├─ Routes
     ├─ index.js
├─ client/
│  ├─ src
      ├─ Components
      ├─ Pages
      │     ├─ AllRoutes.jsx
      │     ├─ Dashboard.jsx
      │     ├─ Home.jsx
      │     ├─ Signin.jsx
      │     ├─ Signup.jsx
      ├─ redux
      │      ├──Bug Tracker
      │      │    ├─ bug.action.js
      │      │    ├─ bug.reducer.js
      │      │    ├─ bug.type.js
      │      ├── store.js      
      ├─ Styles 
      │     ├─Comman.css
      ├─  App.js
      ├─  index.js


## Video Walkthrough of the project
https://drive.google.com/file/d/137uhzNo1mEZBcVj-LZCo2kaYq1eRuLuc/view?usp=drive_link

## Features
- Form for adding task name, status, and date.
- Task details submission to the database.
- View task page with sections for tasks, in progress, completed, and pending.
- Draggable and droppable tasks.
- Updating database upon task drop.
- Filter for tasks based on task creation date.
- Authentication

## Additional Features
- User can set task priority according to preferences and filter by task priority

## assumptions
- Deployed on vercel for frontend and render for backend
- preferred PDF format and layout for data export
- Assumption about the availability of third-party libraries or plugins for drag-and-drop functionality and PDF generation
- Assumption about the level of security measures required for authentication and data protection.

## Installation & Getting started

https://github.com/Pushpendra-1697/Task-Builder-Kryzen

Clone the above Repository from Github. Then do the following steps:

```bash
    cd client
    npm install
    npm run start

    cd server
    npm install
    npm run server
```
## Usage
- Task Management: Users can create, organize, and track tasks efficiently within different stages of completion (e.g., tasks, in progress, done, rework).
- Reporting: Users can generate PDF reports containing task-related data, facilitating communication and documentation.
- Overall, the application serves as a comprehensive tool for efficient task and project management, promoting productivity, collaboration, and transparency.

## Credentials
- Email Address: test@gmail.com
- Password: Push1697@

## Technology Stack
### A) Frontend :
React (JSX Syntax), Redux, Chakra-ui Library for Styling & Modal, axios for handling asynchrous request, react-router-dom for routing or Navigate from one page to another, Standard react components, React-hooks, chakra-icons & react-icons and Drag & Drop by react-dnd library.
### B) Backend :
Node.js, Express.js, mongodb (NoSQL), mongoose for connect database to server, cors for handling the cors error, relationships between collections, jsonwebtoken, node-fetch, BSON and Bsondump.

## PORT Used
- For Frontend ___>>>> 3000
- For Backend ___>>>> 8000

## Some HTTP (Hyper Text Transfer Protocol) Status Code Which I used :
404 ---> Not Found/failure

201 ---> Created/post

200 --->  OK/Success/get/put

## API Endpoints
In case of Backend Applications provide a list of your API endpoints, methods, brief descriptions, and examples of request/response.
GET / - Welcome in Task Manager App!!!😊
GET /download/pdf - Download the collected data in PDF format from the database (status-wise)
POST /users/signup - For Registration a new user
POST /users/login - For Logged in an user

- Below are the restricted endpoints
GET /dashboard/ - For retrieving the tasks data for dashboard
POST /dashboard/post - For storing a new task in DB
PATCH /dashboard/patch - For updating the task details (one or many) by task id
DELETE /dashboard/delete - For deleting the task by task id


# Some Project Screenshots :
# A) For Computer Screen:
![Screenshot (606)](https://github.com/Pushpendra-1697/Task-Builder-Kryzen/assets/104748364/ff85d3fd-a703-4fa0-97d8-471a6ab04c40)

![Screenshot (607)](https://github.com/Pushpendra-1697/Task-Builder-Kryzen/assets/104748364/57e85a20-f54d-40a2-a8aa-45d24296d8de)

![Screenshot (608)](https://github.com/Pushpendra-1697/Task-Builder-Kryzen/assets/104748364/6384cb76-9255-474e-b824-f11c553f4d60)

![Screenshot (609)](https://github.com/Pushpendra-1697/Task-Builder-Kryzen/assets/104748364/58c6eaaa-a598-497e-b465-510ab620337e)

![Screenshot (610)](https://github.com/Pushpendra-1697/Task-Builder-Kryzen/assets/104748364/5948c0d0-0d4a-4a85-b10e-9c86f0cfef69)

# B) For Mobile Screen :
![Screenshot (611)](https://github.com/Pushpendra-1697/Task-Builder-Kryzen/assets/104748364/2b9ae15a-e00a-4d88-9859-a024a5767a27)
