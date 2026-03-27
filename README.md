Markdown
# 🚀 xicoder - Team Development & Contribution Guide

Welcome to the **xicoder** repository! This project is a collaborative effort. To ensure we don't overwrite each other's work and keep our database secure, every team member **must** follow these steps in order.

---

## 📋 1. Initial Setup (Do this once)

Every team member must follow these steps to get the project running on their local machine:

### A. Clone the Repository
Open your terminal (VS Code Terminal or PowerShell) and run:

git clone [https://github.com/xicoderteam/xicoder.git]
cd xicoder
B. Setup Security & Environment Variables
The .env file contains our Supabase keys and is hidden from GitHub for security. You must create it manually:

Navigate to the backend/ folder.

Create a new file named .env.

Add the following line (Ask Vikas for the actual secret key):

Plaintext
SUPABASE_KEY=your_actual_key_here
⚠️ WARNING: Never delete or modify the .gitignore file. It ensures your private keys are never leaked to the public.

🔄 2. The Daily Workflow (The 3-Step Loop)
To avoid "Merge Conflicts," follow this loop every time you start working on a new feature.

Step 1: Sync with the Team
Before you write any code, ensure your local copy is up to date with the latest version on GitHub:

PowerShell
git checkout main
git pull origin main
Step 2: Create a "Feature Branch"
Never code directly on the main branch. Create a new branch named after your specific task:

PowerShell
# Format: git checkout -b yourname-task-name
git checkout -b vikas-login-ui
Step 3: Save and Push your Work
Once your task is finished and tested locally:

PowerShell
# 1. Stage all changes
git add .

# 2. Commit with a clear description
git commit -m "Added validation logic to the login form"

# 3. Push your branch to GitHub
git push origin your-branch-name
🏗️ 3. Merging Code (Pull Requests)
After pushing your branch, your code is not yet in the main project. You must request a review:

Go to the xicoder GitHub Repository.

You will see a yellow bar: "your-branch had recent pushes".

Click "Compare & pull request".

Add a short description of what you changed.

Click "Create pull request".

Vikas (Lead) will review the code and merge it into the main branch.

🛑 4. Team Ground Rules
Pull Frequently: Always run git pull origin main before starting work to avoid conflicts.

One Task, One Branch: Do not mix multiple different features in a single branch.

No Secrets in Code: Never hardcode passwords or API keys. Always use the .env file.

Communication: If you see a 403 Forbidden or Permission Denied error, contact Vikas to verify your collaborator status.