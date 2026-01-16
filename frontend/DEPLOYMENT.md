# Deploying to Cloudways

Your frontend application is now ready for deployment.

## Prerequisite: Environment Setup
I have updated your `.env` file to include the `VITE_N8N_WEBHOOK_URL`. 
**Important**: When deploying to production, ensure your `.env` variables are correctly set. For a static build, these variables are **baked into the build** at build time. 
Since I just ran the build, the `VITE_N8N_WEBHOOK_URL` and `VITE_SUPABASE` keys from your local `.env` are now in the `dist` files.

## Automated Deployment (GitHub Actions)
I have set up a GitHub Action to automatically deploy your changes whenever you push to the `main` branch.

### 1. Configure GitHub Secrets
For this to work, you need to add your Cloudways SFTP credentials to your GitHub repository:

1.  Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2.  Click **New repository secret**.
3.  Add the following secrets:
    *   `FTP_SERVER`: Your Cloudways Server IP address.
    *   `FTP_USERNAME`: Your **Application** Username (Recommended) or Master Username.
        *   *Note: Using Application Credentials ensures you land directly in the correct folder so the deploy script works flawlessly.*
    *   `FTP_PASSWORD`: Your **Application** Password.

### 2. Push to Deploy
Once the secrets are set, any commit pushed to the `main` branch will trigger the **Deploy to Cloudways** workflow.

- You can check the progress in the **Actions** tab of your GitHub repository.
- The workflow builds your project (`npm run build`) and uploads the `dist` folder to `public_html`.

### Note on Environment Variables
Since you have un-ignored `.env` in your `.gitignore`, your environment variables (like `VITE_N8N_WEBHOOK_URL`) will be included in the repository and used during the build process on GitHub. **Ensure you do not commit sensitive real keys if you want to keep them private.** If you prefer to keep `.env` ignored, you should add your env variables as GitHub Secrets and map them in the `deploy.yml` file.
