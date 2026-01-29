# Step-up (MVP)

Step-up is a lightweight, responsive e-commerce web application focusing on athletic and casual footwear (strictly excluding heels). This MVP demonstrates a modern "Guest Checkout" flow using local state persistence.

## 🧱 Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API + LocalStorage
- **Data Source:** Static JSON (Mock Data)

## 🚀 Features
- **Product Catalog:** Responsive grid display of ~20 shoe items.
- **Cart Management:** Add/Remove items, adjust quantities.
- **Persistence:** Cart saves to browser LocalStorage (survives refresh).
- **Mock Checkout:** Simulates network latency (1.5s) and clears cart on success.
- **Heel-Free Zone:** Curated dataset excludes high heels.

## 🛠️ Installation & Setup

1. **Clone/Download** the repository.
2. **Install dependencies:**
   ```bash
   npm install