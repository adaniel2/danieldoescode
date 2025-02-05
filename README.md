### 🔗 Connect with me:
- [LinkedIn](https://www.linkedin.com/in/dan13l/)
- [bonjrmusic.com](https://bonjrmusic.com)

---

## 📹 Voyis Project Demo Video (Feb 5th, 2025)

This demo quickly goes through all the implemented features as of Feb 5th, 2025 for the Voyis project.

https://github.com/user-attachments/assets/855dfca6-934e-4205-94dd-d93af862cd3c

Check out the full website here: [danieldoescode.com](https://danieldoescode.com) *(coming soon)*

---

## 🚀 Requirements

- **Node.js**: v22.13.0 (or higher)
- **npm**: v10.9.2 (or higher)

It may be possible to use v20 or higher as some dependencies require it, but this project was developed with the versions above.

## 🛠️ Technologies Used

This project is built with:

- **[React](https://reactjs.org/)** - Frontend framework
- **[Vite](https://vitejs.dev/)** - Fast development tooling
- **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - Programming language
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Mantine](https://mantine.dev/)** - UI component library
- **[Amazon EC2](https://aws.amazon.com/ec2/)** - Hosting infrastructure
- **[Docker](https://www.docker.com/)** - Containerization
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automation
- **(Coming Soon) [Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework 
- **[Nginx](https://www.nginx.com/)** - Web server for deployment

---

## 📌 Step-by-step Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/adaniel2/danieldoescode.git
cd danieldoescode
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure Mapbox Access

This project uses Mapbox, and an access token is required:

- Sign up or log in at [Mapbox](https://www.mapbox.com/).
- Follow instructions to obtain a public access token.
- Create a `.env` file in the project root.
- Add the following line to the `.env` file, replacing `YOUR_MAPBOX_ACCESS_TOKEN` with your actual token:

```bash
VITE_MAPBOX_ACCESS_TOKEN=YOUR_MAPBOX_ACCESS_TOKEN
```

> **Important:** Don't forget to add your `.env` file to `.gitignore` to avoid exposing your token.

### 4️⃣ Run the development server

Start the Vite development server:

```bash
npm run dev
```

Navigate to [http://localhost:5173/](http://localhost:5173/) (or the URL shown in your terminal) to view the app.

### 5️⃣ Build for Production

When you're ready to deploy, build the app:

```bash
npm run build
```

The production-ready files will be output to the `dist` directory.

---

## 📁 Project Structure

```
.
├── public/            # Static assets
├── src/
│   ├── assets/        # Images and other assets
│   ├── components/    # Reusable UI components
│   │   ├── legacy/    # Older components
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── GISViewer.jsx
│   │   ├── LogConsole.jsx
│   │   ├── PointCloudViewer.jsx
│   │   ├── SideBar.jsx
│   │   ├── SideBarCheckbox.jsx
│   │   ├── SettingsBurger.jsx
│   │   ├── ToggleHeaderButton.jsx
│   ├── constants/     # Constants and config values
│   │   ├── GISLayers.js
│   │   ├── MantineOverride.js
│   ├── context/       # React Context API for state management
│   │   ├── BasePathContext.jsx
│   │   ├── ConsoleContext.jsx
│   │   ├── PointCloudMappingContext.jsx
│   │   ├── SideBarContext.jsx
│   │   ├── UIContext.jsx
│   ├── pages/         # Page-level components
│   │   ├── GIS.jsx
│   │   ├── PCV.jsx
│   │   ├── Voyis.jsx
│   ├── utils/         # Utility functions
│   │   ├── AltitudeColorMapper.jsx
│   │   ├── DropzoneFileHandler.jsx
│   │   ├── GISSummaryGenerator.jsx
│   │   ├── PointCloudSummaryGenerator.jsx
│   ├── App.jsx        # Main application component
│   ├── routes.jsx     # Routing setup
│   ├── index.css      # Global styles
│   ├── index.js       # Entry point
├── .gitignore         # Git ignore file
├── Dockerfile         # Docker container setup
├── eslint.config.js   # ESLint configuration
├── index.html         # HTML entry file
├── nginx.conf         # Nginx configuration
├── package.json       # Dependencies and scripts
├── postcss.config.cjs # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.js     # Vite configuration
└── README.md          # Documentation
```
