# Portfolio Website

A **modern, responsive portfolio website** showcasing my work in **Visualization Science, Front-End Architecture, and Digital Twin Analytics**.  
This site is built using **Next.js, TailwindCSS, and AWS Amplify** and includes interactive elements and a **secure contact form with reCAPTCHA validation**.

## 🚀 Features
- **⚡ Fast & Scalable** – Powered by **Next.js** with optimized routing.
- **🎨 Modern UI/UX** – Styled with **TailwindCSS + DaisyUI** for a sleek and customizable design.
- **📡 Hosted on AWS Amplify** – Integrated with **CloudFront** for fast global content delivery.
- **📬 Secure Contact Form** – Uses **Google reCAPTCHA v3** and **Formspree (temporary)** to prevent spam.

---

## 📂 Project Structure
```
/src
 ├── app
 │   ├── contact  # Contact form page with reCAPTCHA
 │   ├── projects # Portfolio projects section
 │   ├── api      # API routes (e.g., reCAPTCHA validation)
 │   ├── layout   # Global layout components
 │   ├── components
 │   │   ├── ContactForm.tsx   # Contact form with validation
 │   │   ├── Header.tsx        # Navigation bar
```

---

## ⚙️ Tech Stack
| Category             | Technology Used                                      |
|----------------------|------------------------------------------------------|
| **Frontend**        | Next.js, React, TypeScript                           |
| **Styling**         | TailwindCSS, DaisyUI, Lucide Icons                   |
| **Forms & API**     | Formspree (temporary), Google reCAPTCHA v3           |
| **Hosting & Infra** | AWS Amplify, CloudFront, GitHub Actions (CI/CD)      |

---

## 🔧 Installation & Setup
### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/adampluth/ap-portfolio-next-2025.git
cd ap-portfolio-next-2025
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**
Create a `.env.local` file in the root directory and add:
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=your-secret-key
```

### 4️⃣ **Run Locally**
```sh
npm run dev
```
Then visit **`http://localhost:3000`** in your browser.

---

## 🚀 Deployment
This project is **auto-deployed to AWS Amplify** using GitHub Actions.  

**✅ Steps for Deployment:**
1. **Push changes to the `main` branch** → Amplify automatically rebuilds & deploys.
2. **CloudFront CDN updates** for fast global delivery.
3. **Environment Variables** are stored in AWS Amplify.

---

## 🔒 Security & Optimization
- **reCAPTCHA v3** prevents spam in the contact form.
- **Server-side API routes** handle reCAPTCHA validation (avoids CORS issues).
- **Amplify + CloudFront** ensures fast, reliable content delivery.
- **CI/CD with GitHub Actions** automates deployment.

---

## 📬 Contact & Feedback
Want to collaborate or have feedback?  
Reach out via the **[contact form](https://your-portfolio-site.com/contact)** or connect on **[LinkedIn](https://linkedin.com/in/yourprofile)**.

---

## 🎯 Future Plans
✔ **Replace Formspree with a custom backend (Express + SQL or AWS Lambda).**  
✔ **Enhance UI with more animations and interactive elements.**  

---

## 📜 License
This project is licensed under the **MIT License**. Feel free to use and modify it.

