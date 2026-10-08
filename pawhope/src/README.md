# PawHope — Secure Stray Animal Rescue & Donation Gateway 🐾

PawHope is a React-based web application built with Vite and deployed on Vercel. It features a simulated GCash payment integration protected by client-side **AES-256-GCM** encryption.

## 🚀 Live Demo
- **URL:** https://pawhope-nuzd7x5u9-kimsidmana08s-projects.vercel.app/

## 🛡️ Security Architecture
The platform enforces client-side data privacy before submitting sensitive donor information across the network.

- **Key Derivation (PBKDF2):** Converts a passkey into a 256-bit key using **100,000 iterations of SHA-256** and custom salt.
- **Encryption Algorithm (AES-256-GCM):** Authenticated encryption mode ensuring data confidentiality and tamper verification.
- **Initialization Vector (IV):** Generates a unique 12-byte random vector (`window.crypto.getRandomValues`) per transaction to prevent repeatable ciphertexts.

## 📁 Repository Structure
```text
src/
├── components/       # Reusable Navbar and Footer components
├── pages/            # Page views (Home, Donate, Admin, ReportAnimal)
├── cryptoUtils.js    # PBKDF2 & AES-256-GCM encryption utility
└── App.jsx           # React Router setup