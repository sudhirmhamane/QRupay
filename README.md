# QRUPAY


# 🩺 QRUPAY – Emergency Health QR System

> 🚑 A smart solution for emergency situations – MedLink stores your critical health data and links it to a scannable QR code for instant access by first responders.

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Click%20Here-brightgreen?style=for-the-badge)](https://qrupay.vercel.app/)

---

## 📌 Project Overview

**QRUPAY** is a modern web application designed to save lives in emergencies. Often, unconscious or speechless patients can't communicate essential health information like blood group, allergies, or emergency contacts. MedLink solves this by allowing users to store this data securely and generate a personal **QR code** linked to a public **read-only emergency profile**.

This QR can be printed, worn, or used as a phone wallpaper. When scanned, it shows vital details **without login**, helping doctors or rescuers take informed action quickly.

---

## 🔑 Key Features

- 🔐 Secure user authentication (JWT or Supabase Auth)
- 📝 Medical Info Form: name, age, blood group, allergies, chronic conditions, contact
- 📷 Unique QR code per user
- 📄 Public emergency info page (read-only access)
- 📱 Responsive design for mobile and desktop
- 🎨 Dashboard to view/update medical profile and QR
- 🧾 QR printable and phone wallpaper-ready
- 💾 All data stored securely in Supabase/MongoDB
- 🔒 Optional PIN-protected QR access (future scope)

---


## 🚀 Features

- **Secure Authentication:**  
  Register and log in with email/password using Supabase Auth.

- **Email Verification:**  
  Users must verify their email before accessing protected features.

- **Dashboard:**  
  Personalized dashboard for each user after login.

- **Medication Reminders:**  
  Track, update, and manage your medications. Never miss a dose!

- **Health Education:**  
  Access curated health education resources.

- **Health Services:**  
  Explore and connect with various health services.

- **Responsive Design:**  
  Fully responsive and mobile-friendly UI.

- **Modern Tech Stack:**  
  Built with React, TypeScript, Tailwind CSS, Supabase, and Vercel.

---

## 🏗️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend/Auth:** [Supabase](https://supabase.com/)
- **Deployment:** [Vercel](https://vercel.com/)
- **Routing:** React Router

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/qrupay.git
cd qrupay
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛡️ Authentication & Email Verification

- Users must verify their email address via a link sent to their inbox.
- After clicking the verification link, users are redirected back to the app and can log in.

---

## ✨ Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)


---

## 🧠 Use Case Example

1. A user creates a profile and enters:
   - Blood Group: O+
   - Allergy: Penicillin
   - Condition: Diabetes
   - Emergency Contact: +91-98765XXXXX

2. A unique QR code is generated.

3. The user prints the QR or sets it as their lock screen.

4. During an emergency, a responder scans the code and instantly sees critical info to act fast.


---

## 🚀 Goals

- ⏱️ Reduce emergency response time
- 💬 Enable non-verbal communication of critical info
- 📶 Allow offline QR availability (future update)
- ⚕️ Enable hospital/doctors to make quick, informed decisions

---

## 🔮 Future Scope

- NFC tag & wearable support (bracelets, bands)
- Multilingual interface for broader accessibility
- Government ID card integration
- Smartwatch app for real-time syncing
- Offline
