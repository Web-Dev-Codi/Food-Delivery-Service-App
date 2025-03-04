# Git Workflow Guidelines

### Pushing to GitHub Steps

#### In terminal

- CD into root folder
- git status (see if the changes you did are correct. If correct onto the next step)
- git add . (This command adds all of the changes at one)
- git commit -m "Your commit message here"
- git push -u origin NAME_OF_YOUR_BRANCH ( The -u means upstream. The upsteam creates the branch on GitHub)
- Now head to GitHub

#### Creating your Pull Request

- On the GitHub repo select Pull Request
- Make sure to compare your feature branch with the development branch (VERY IMPORTANT)
- Write a detailed comment explaining what you did and why.
- Hit the green button
- DO NOT HANDLE CONFLICTS ( Thats my job ;), Hugs and Kisses )

#### Running the server

- In the terminal make sure you are in the root folder
- npm run all
- This will run the backend & frontend simultaneously

## Branch Structure

- `main` - Production-ready code
- `development` - Integration branch for feature development
- Feature branches - Individual feature development

## Development Workflow

### 1. Creating a Feature Branch

```bash
# Ensure you're on the development branch
git checkout development

# Pull latest changes
git pull origin development

# Create and checkout your feature branch
git checkout -b feature/your-feature-name
```

### 2. Working on Your Feature

- Make regular commits with clear, descriptive messages
- Keep your feature branch updated with development

```bash
# Update your branch with latest development changes
git checkout development
git pull origin development
git checkout feature/your-feature-name
```

### 3. Creating a Pull Request

1. Push your feature branch to the remote repository

```bash
git push origin feature/your-feature-name
```

2. Go to the repository on GitHub
3. Create a new Pull Request
   - Base branch: `development`
   - Compare branch: `feature/your-feature-name`
4. Fill in the Pull Request template with:
   - Description of changes
   - Any related issues
   - Testing performed
   - Screenshots (if applicable)

## Important Notes

⚠️ **DO NOT MERGE PULL REQUESTS**

- All code reviews and merges will be handled by the project lead
- This applies to all branches, including feature branches to development
- While waiting for pull request review, and merge, keep your feature branch updated with the development branch.

```bash

## Best Practices

1. Keep feature branches focused and small
2. Write clear commit messages
3. Test your changes thoroughly before creating a Pull Request
4. Respond promptly to review comments
5. Delete feature branches after successful merge

## Questions or Issues?

Contact the project lead for:

- Code review status
- Branch strategy questions
- Priority concerns

Following these guidelines ensures a smooth and organized development process while maintaining code quality and stability.
```



# Four Flavors Express

###### Welcome to Four Flavors Express, your go-to food delivery platform that brings the best flavors from your favorite restaurants straight to your doorstep. Whether you’re craving local street food, gourmet dishes, or international cuisine, we’ve got you covered.



###### 🌐 Website
###### Visit us at: www.fourflavorsexpress.com



## 📱 About Four Flavors Express

###### Four Flavors Express is designed to provide a seamless food ordering experience. We partner with a wide range of restaurants, ensuring you have access to diverse menus and delicious meals, all delivered fast and fresh.


### Key Features

###### ✅ Easy Restaurant Browsing
###### ✅ Real-Time Order Tracking
###### ✅ Secure Online Payments
###### ✅ Personalized Recommendations
###### ✅ Scheduled Deliveries



## 📦 Project Structure

This project follows a **full-stack architecture** with a **React frontend** and a **Node.js/Express backend**.

##### **Four-Flavors-Express**

```bash
├── backend/               # Backend (API, Database, Business Logic)
│   ├── config/             # Database connection, environment variables
│   ├── controllers/        # Business logic & request handling
│   ├── models/              # Database models (Mongoose/Sequelize)
│   ├── routes/              # API routes (endpoints)
│   ├── middlewares/         # Authentication, error handling, etc.
│   ├── utils/                # Helper functions (e.g., email service, etc.)
│   ├── app.js                # Main Express app
│   └── server.js             # Server entry point
│
├── frontend/               # Frontend (User Interface)
│   ├── public/              # Static assets (images, icons, etc.)
│   ├── src/                  # Main React source files
│   │   ├── assets/           # Images, fonts, etc.
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Pages (Home, Menu, Cart, Profile, etc.)
│   │   ├── services/         # API calls (Axios/Fetch)
│   │   ├── hooks/            # Custom React Hooks
│   │   ├── context/          # Global State (Context API)
│   │   ├── App.jsx            # Main App Component
│   │   ├── main.jsx           # React entry point
│   │   └── styles/            # CSS/SCSS files
│   ├── index.html             # Main HTML template
│   └── vite.config.js         # Vite Configuration (if using Vite)
│
│
├── docs/                 
│  └── README.md              # Documentation, screenshots, API specs
│
├── .env                      # Environment variables
├── .gitignore                 # Files to ignore in git
├── README.md                  # Project README file
├── package.json               # Project metadata (combined if monorepo)
├── LICENSE                    # License file
└── yarn.lock / package-lock.json   # Dependency lock file
```

## 📜 Project Structure Explanation

| Folder/File   | Purpose                                            |
|---------------|----------------------------------------------------|
| `backend/`    | Houses all server-side logic (API, DB, authentication). |
| `frontend/`   | Contains all client-side code (React UI).          |
| `mobile/`     | Optional - for mobile app development.             |
| `docs/`       | Contains diagrams, API documentation, and internal documentation. |
| `.env`        | Stores environment variables like DB URI and API keys. |
| `README.md`   | Provides an overview of the project.               |
| `package.json`| Lists dependencies and scripts.                    |
| `.gitignore`  | Specifies files and directories to be ignored by git. |











### 🚀 Installation

###### If you want to run the app locally for development, follow these steps:

1. ###### Clone the repository: 

```
git clone https://github.com/yourusername/four-flavors-express.git

```

2. ###### Navigate to the project directory:

```
cd four-flavors-express

```

3. install dependencies: 

```
npm install

```

4. Start the development server 

```
npm run dev

```




## 🏗️ Tech Stack

| Component      | Technology          |
|-----------------|--------------------|
| Frontend        | React / Next.js     |
| Backend         | Node.js / Express   |
| Database        | MongoDB 
| Payment Gateway | Stripe   |
| Deployment      | Render       |

---

## 📦 Features Under Development

- 🎁 Loyalty Rewards Program  
- 💬 In-App Chat with Restaurants  
- 💸 Multi-Order Discounts  
- 🌙 Dark Mode for Night-Time Browsing

---






### 🍽️ Made with ❤️ by the Four Flavors Express Team





