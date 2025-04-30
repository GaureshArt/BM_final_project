# Freelance Collaboration Platform

A web-based freelance collaboration platform built with modern technologies, enabling clients and freelancers to connect, collaborate, and manage projects efficiently.

---

## 🚀 Project Overview

This project implements a **JWT-based authentication** system to securely manage user sessions. Once authenticated, users are directed to a personalized **dashboard** with role-specific features.

---

## 🖥️ Dashboard Features

The dashboard includes a **side menu** with multiple tabs that provide role-based access and functionalities:

### 🏠 Home Tab

- Displays **all featured projects**.
- Both **clients** and **freelancers** can view the projects.
- Only **freelancers** are allowed to **place bids** on projects.

### 📁 My Projects Tab

This tab dynamically adapts based on the user's role:

#### For Clients:
- Displays **all posted projects** by the client.
- Each project includes associated **milestones**.
- Shows any **bids received** from freelancers.

#### For Freelancers:
- Displays **all accepted projects** the freelancer is currently working on.
- Each project includes a **progress bar** to track milestone completion.

---

## 💬 Messaging System

A **messaging system** was planned to facilitate communication between clients and freelancers after bid acceptance. However, due to **time constraints**, this feature was not implemented in the current version.

---

## ✅ Tech Highlights

- 🔐 JWT-based authentication
- 🎯 Role-specific dashboard (Client/Freelancer)
- 🗂️ Project and milestone tracking
- 📊 Dynamic progress updates
- 📦 Modular and scalable backend architecture

---



## 📁 Getting Started

### 🔧 Backend Setup (NestJS + MySQL)

1. Navigate to the backend directory:
   ```bash
   cd backend/freelance
Install dependencies:
npm install


Create a .env file in the root of the backend folder with the following values:

```
.env

PORT=3306
TYPE=mysql
HOST=localhost
USERNAME=<YOUROWNNAME>
PASSWORD=<PASSWORD>
DATABASE=freelanceDb
NODE_ENV=production

JWT_SECRET=supersecretkey
JWT_REFRESH_SECRET=refreshsecretkey

CLOUDINARY_NAME=dvacmvrws
CLOUDINARY_API_KEY=885843339691187
CLOUDINARY_API_SECRET=PoOSMQ_u0DiUjVQ-ijugoJShUJA
```


## You can use freelanceDbDump to dump data and get some initial start instead of cold start of ui.

Run the backend server:
```
npm run start:dev
````


### 🔧 Frontend  Setup (react)

using yarn
instal package json

Ui library antD
``` yarn add ant ```
tailwind css

after seting up this
run
```yarn dev  ```



---

## Demo 



https://github.com/user-attachments/assets/f05dac82-4ffd-4a39-912b-3895fc05bab0



