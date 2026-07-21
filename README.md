<div align="center">
  <img src="public/logo.png" alt="VaporClip Logo" width="320" />

  # VaporClip

  **Quick. Digital. Share.**

  *Fast, secure, and self-expiring rich text & code clipping platform built for modern privacy.*

  [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
</div>

---

## ⚡ Overview

**VaporClip** is an ephemeral rich-text pastebin application. It enables developers and teams to quickly share code snippets, rich text notes, and sensitive formatted content with zero logs and auto-vaporizing expiration controls.

---

## ✨ Features

* 📝 **Rich Text & Code Editor**: Powered by TipTap WYSIWYG editor supporting headings, code blocks, lists, links, images, and formatting.
* ⏳ **Automatic Vaporization**: Set clips to automatically vaporize after **1 Hour**, **1 Day**, or **30 Days** using MongoDB TTL indexes.
* 🔐 **Password Lock**: Encrypt and gate sensitive clips behind bcrypt password protection.
* 🛡️ **IP Restriction Shield**: Lock clips so they can only be unlocked and viewed from the creator's IP address.
* 🧹 **XSS Protection**: Dual-layer HTML sanitization using `DOMPurify` on both client and server sides.
* 🚀 **Strict Content Security Policy (CSP)**: Nonce-based CSP headers implemented via Next.js proxy middleware.
* 📊 **Live Global Stats**: Real-time counter tracking total clips created, active live clips, and total views.
* 🚩 **Reporting System**: Built-in clip reporting mechanism to mitigate malicious content.
* 📋 **One-Click Share**: Automated link generation with immediate clipboard copying.

---

## 🛠️ Tech Stack

### Frontend & Core
* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack & React 19
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/) Icons
* **Rich Text Editor**: [TipTap Editor](https://tiptap.dev/) (`@tiptap/react`, `@tiptap/starter-kit`, extensions)
* **State & Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest)

### Backend & Security
* **Database**: [MongoDB](https://www.mongodb.com/) with native Node driver
* **Password Hashing**: `bcryptjs`
* **Sanitization**: `isomorphic-dompurify`
* **Middleware**: Custom Next.js proxy middleware (`proxy.ts`) with cryptographic nonce generation for Strict CSP

---

## 📁 Project Structure

```
quickshare/
├── app/
│   ├── api/
│   │   ├── pastes/            # Create & retrieve clips API
│   │   │   └── [id]/          # Unlock paste & report route
│   │   └── stats/             # Live platform statistics
│   ├── p/[id]/                # Protected paste viewer page
│   ├── layout.tsx             # Root layout with CSP & metadata
│   ├── page.tsx               # Home page with Editor & Options
│   └── providers.tsx          # React Query provider setup
├── components/
│   ├── editor/                # Tiptap Editor & Options Panel
│   ├── paste-view/            # Content viewer & Password gate
│   ├── Header.tsx             # VaporClip header & live stats
│   ├── Footer.tsx             # Footer component
│   └── VaporClipLogo.tsx      # Brand logo component
├── hooks/                     # Custom React hooks
├── lib/                       # MongoDB, Sanitizer, Nanoid, Rate Limiter
├── proxy.ts                   # CSP Nonce & Security Middleware
├── public/                    # Logo assets & icons
└── types/                     # TypeScript interface definitions
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.x or later
* **npm**: v9.x or later
* **MongoDB**: Local MongoDB instance or MongoDB Atlas Connection URI

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/vaporclip.git
   cd vaporclip
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the project root:
   ```env
   MONGODB_URI=mongodb://localhost:27017/vaporclip
   MONGODB_DB=vaporclip
   # Optional: Google Analytics ID
   NEXT_PUBLIC_GA_ID=
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/pastes` | Create a new paste/clip |
| `GET` | `/api/pastes/[id]` | Fetch clip metadata or unlocked content |
| `POST` | `/api/pastes/[id]` | Unlock a password-protected clip |
| `POST` | `/api/pastes/[id]/report` | Report a clip for abuse |
| `GET` | `/api/stats` | Retrieve live platform usage stats |

---

## 🔒 Security Practices

* **No Plaintext Passwords**: Passwords are hashed using `bcrypt` before storage.
* **Auto Expire (TTL)**: Documents expire automatically in MongoDB using native TTL indexes.
* **XSS Defense**: Incoming HTML is sanitized with `DOMPurify` before database entry and re-sanitized prior to DOM rendering.
* **Zero Logging**: Privately hosted with zero user logging or tracking.

---

## 📄 License

This project is licensed under the MIT License.
