# CSE 340 Service Network

A professional web application built with **Node.js** and **Express.js**, designed to connect volunteers with meaningful service opportunities within their communities.

## 🚀 Key Features

- **Dynamic Content**: Explore categorized service projects and organizations.
- **Service Management**: Create, view, and edit service projects, organizations, and categories.
- **Responsive Design**: A clean, academic, and institutional interface optimized for all devices.
- **Global Reach**: Connecting passionate individuals with international service networks.

## 🛠️ Tech Stack

- **Backend**: Node.js & Express.js
- **Frontend**: EJS (Embedded JavaScript) Templates
- **Styling**: Modern CSS3 with Flexbox and Grid layouts
- **Icons**: Lucide Icons for a clean, professional look
- **Database**: PostgreSQL integration (via `pg` pool)

## 📋 Installation & Setup

### Prerequisites
- Node.js (v14+)
- PostgreSQL (local or cloud instance)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kasagga39/CSE-340-COURSE-REPO.git
   cd CSE-340-COURSE-REPO
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgres://user:password@localhost:5432/cse340
   ```

4. **Initialize Database:**
   Run the setup script:
   ```bash
   psql -f src/models/setup.sql
   ```

5. **Start the application:**
   ```bash
   npm start
   ```
   *For development with auto-reload, use `npm run dev`.*

## 📂 Project Architecture

```text
├── public/                # Static assets (CSS, Images)
├── src/
│   ├── controllers/      # Route handlers and business logic
│   ├── models/           # Data models and database interactions
│   ├── middleware/       # Custom middleware (Flash messages, etc.)
│   └── views/            # EJS templates and partials
├── server.js              # Application entry point
└── render.yaml            # Deployment configuration
```

## 🌐 Routes

- `/` - Landing Page
- `/organizations` - List of partner organizations
- `/projects` - Browse all service projects
- `/categories` - Service project categories

## 📄 License

This project is licensed under the **ISC License**.

## 🤝 Contributing

We welcome contributions! Please fork the repository and submit a pull request for any improvements or bug fixes.

---
Built with by the CSE 340 Community.
