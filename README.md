# 🧠 OS Process Scheduler Visualizer

A full-stack simulator for CPU scheduling algorithms like FCFS, SJF, Round Robin, and Priority.  
Built with **Node.js + Express** on the backend and **React + Bootstrap** on the frontend.

### 🌐 Live Demo  
🔗 [scheduler-visualizer.vercel.app](https://scheduler-visualizer.vercel.app)

---

## 🚀 Features

- Input process data: PID, arrival time, burst time, priority
- Choose scheduling algorithms:
  - FCFS (First Come First Serve)
  - SJF (Shortest Job First – Non-preemptive & Preemptive)
  - RR (Round Robin)
  - Priority (Preemptive & Non-preemptive)
- Gantt Chart Visualization
- Turnaround and Waiting Time calculations
- Reset & re-simulate

---

## 🛠 Tech Stack

| Layer      | Tech                         |
|-----------|------------------------------|
| Frontend  | React, Bootstrap, Axios      |
| Backend   | Node.js, Express             |
| Hosting   | Frontend: Vercel<br>Backend: AWS EC2 with NGINX + HTTPS |
| Tools     | PM2, Certbot, Git, GitHub    |

---

## 📁 Project Structure

scheduler-visualizer:
  backend:
    algorithms: # Scheduling logic (fcfs.js, sjf.js, etc.)
    routes:
      - scheduler.js
    - index.js
  frontend:
    src:
      components: # React components
        - InputForm.js
        - GanttChart.js
        - StatsTable.js
    - App.js
    - index.js

## ⚙️ Setup Instructions

### Backend (Node.js)
```bash
cd backend
npm install
node index.js
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

### ✨ Screenshots
Coming soon...

### 📄 License
MIT – free to use, modify, and share.

---


