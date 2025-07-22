# 🩺 QRUPA – Emergency Health QR System

> 🚑 A smart solution for emergency situations – MedLink stores your critical health data and links it to a scannable QR code for instant access by first responders.

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Click%20Here-brightgreen?style=for-the-badge)](https://qrupa.vercel.app/)

---

## 📌 Project Overview

**MedLink** (aka **QRUPA**) is a modern web application designed to save lives in emergencies. Often, unconscious or speechless patients can't communicate essential health information like blood group, allergies, or emergency contacts. MedLink solves this by allowing users to store this data securely and generate a personal **QR code** linked to a public **read-only emergency profile**.

This QR can be printed, worn, or used as a phone wallpaper. When scanned, it shows vital details **without login**, helping doctors or rescuers take informed action quickly.

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
- Offline-capable QR viewer
