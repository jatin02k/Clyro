# Task Manager - Base Version

A secure, full-stack task management application built with modern web technologies.

## 🚀 Features

### Current Features
- ✅ **User Authentication** - Secure signup, login, and logout
- ✅ **Task Management** - Create, read, update, delete tasks
- ✅ **User Data Isolation** - Each user only sees their own tasks
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Real-time Updates** - Optimistic UI updates with error handling
- ✅ **Secure API** - JWT authentication with protected routes

### Planned Features
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Task priority levels
- [ ] Search and advanced filtering
- [ ] Team collaboration features
- [ ] Task templates
- [ ] Progress tracking
- [ ] Email notifications
- [ ] SaaS subscription model

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **DaisyUI** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icons
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Cookie Parser** - Cookie handling

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd task-manager
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Environment Setup**

Create `.env` file in the server directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
SECRET_KEY=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

4. **Start the application**
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status

### Tasks
- `GET /api/task` - Get all user tasks
- `POST /api/task` - Create new task
- `GET /api/task/:id` - Get specific task
- `PUT /api/task/:id` - Update task
- `DELETE /api/task/:id` - Delete task

## 🏗️ Project Structure

```
task-manager/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand stores
│   │   ├── api/           # API configuration
│   │   └── assets/        # Static assets
│   └── package.json
├── server/                # Backend Node.js app
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Custom middlewares
│   │   └── utils/         # Utility functions
│   └── package.json
└── README.md
```

## 🔒 Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **JWT Authentication** - Secure token-based authentication
- **User Data Isolation** - Users can only access their own data
- **Input Validation** - Server-side validation for all inputs
- **CORS Protection** - Configured for secure cross-origin requests
- **HTTP-Only Cookies** - Secure cookie storage for tokens

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Backend (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [DaisyUI](https://daisyui.com/) - UI components
- [Zustand](https://github.com/pmndrs/zustand) - State management

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ for learning and portfolio purposes** 