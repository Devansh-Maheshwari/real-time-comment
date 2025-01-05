# Real-time-Comment project

This repository contains a full-stack web application for managing comments, built with **Next.js** for the front-end and a **Node.js** backend connected to a **MySQL** database.

---


## 🛠️ Tech Stack

### **Frontend (Next.js)**
- Next.js 
- Material-UI (MUI)
- Axios

### **Backend**
- Node.js
- Express.js
- MySQL

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org) (v18 or above)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

---

### **Setup Instructions**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Devansh-Maheshwari/real-time-comment.git  
   cd real-time-comment

---
# Install dependencies and start both backend and frontend

# Backend setup
cd backend
npm install
# Update MySQL credentials in backend/config.js file (see below for more details)

# Start the backend server
node server.js &

# Frontend setup
cd ../frontend
npm install
npm run dev
