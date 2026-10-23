# Scentora — A Web-Based E-Commerce Platform

> **Tagline:** Discover Your Signature Scent.

Scentora is a premium product-based full-stack e-commerce web application built using the **MERN** stack (MongoDB, Express, React, Node.js) with a luxury aesthetic. Initially designed for luxury fragrances, the underlying architecture and design tokens are built to scale seamlessly to lifestyle fashion accessories (sunglasses, watches, leather wallets, and belts) without architectural rewrites.

---

## 📌 Phase 1: Project Foundation & Design System

Phase 1 establishes the rock-solid foundation for the entire application lifecycle:
- **Clean Monorepo Structure:** Dedicated, isolated `client/` and `server/` applications.
- **Centralized Luxury Design System:** Strict color tokens defined in CSS variables and mapped directly to Tailwind CSS utilities.
- **Persistent Dual Theme System:** Seamless Light and Dark modes with OS `prefers-color-scheme` detection, `localStorage` persistence, and zero-flash synchronous pre-hydration.
- **Luxury Editorial & Interface Typography:** Combination of *Playfair Display* (editorial serif) and *Plus Jakarta Sans* (interface sans-serif).
- **Reusable Component Library:** ThemeToggle, Button, Card, Badge, Input, Select, Navbar, and Footer.
- **Resilient Express Backend:** Modular API architecture with JSON parsing, CORS configuration, centralized error handling, and a live health check endpoint (`/api/health`) that remains available even if MongoDB is not yet running.

---

## 🎨 Brand Identity & Design Tokens

### Primary Brand Palette

| Color Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Charcoal** | `#171717` | Deep neutral, dark surface, primary brand contrast |
| **Gold** | `#D4AF72` | Luminous luxury accent, dark mode primary button |
| **Ivory** | `#F4EFE6` | Soft editorial background, dark mode primary text |
| **White** | `#FFFFFF` | Crisp light surface, button contrast |
| **Accent Gold (Accessible)** | `#B68A45` | Higher contrast gold for readable text/accents in light mode |

### Theme Token Mappings

| Token / Element | Light Mode | Dark Mode |
| :--- | :--- | :--- |
| **Page Background** | `#F4EFE6` (Ivory) | `#111111` (Deep Charcoal) |
| **Main Surface & Cards** | `#FFFFFF` (White) | `#1A1A1A` (Charcoal Surface) |
| **Elevated Surface** | `#FFFFFF` | `#222222` (Elevated Charcoal) |
| **Primary Text** | `#171717` (Charcoal) | `#F4EFE6` (Ivory) |
| **Secondary Text** | `#6B6258` (Muted Warm) | `#B9B0A3` (Muted Ivory) |
| **Primary Button BG** | `#171717` (Charcoal) | `#D4AF72` (Luminous Gold) |
| **Primary Button Text** | `#FFFFFF` (White) | `#171717` (Charcoal) |
| **Accent Color** | `#B68A45` (Deep Gold) | `#D4AF72` (Gold) |
| **Borders** | `#E5DED2` (Soft Ivory Border) | `#343434` (Muted Dark Border) |
| **Subtle Hover** | `#EEE7DC` | `#292621` |

---

## 📁 Project Folder Structure

```
scentora/
├── client/                      # Frontend Application (React + Vite + Tailwind)
│   ├── public/
│   │   └── favicon.svg          # Scentora luxury monogram SVG favicon
│   ├── src/
│   │   ├── assets/              # Static assets & brand imagery
│   │   ├── components/
│   │   │   ├── common/          # Reusable UI primitives (Button, Card, Input, Badge, ThemeToggle)
│   │   │   ├── layout/          # Navbar & Footer components
│   │   │   └── preview/         # Visual theme and API health preview components
│   │   ├── context/             # ThemeContext & ThemeProvider
│   │   ├── hooks/               # useTheme custom hook
│   │   ├── layouts/             # MainLayout wrapper
│   │   ├── pages/               # PlaceholderHome page
│   │   ├── services/            # Axios API client & health check service
│   │   ├── styles/              # theme.css (CSS variables) & index.css (Tailwind)
│   │   ├── utils/               # Helper utilities
│   │   ├── App.jsx              # React Router & ThemeProvider setup
│   │   └── main.jsx             # React DOM entry point
│   ├── index.html               # HTML shell with Google Fonts & zero-flash theme script
│   ├── vite.config.js           # Vite build configuration
│   ├── tailwind.config.js       # Tailwind CSS theme token extension
│   ├── postcss.config.js        # PostCSS configuration
│   ├── package.json             # Frontend dependencies & scripts
│   ├── .env.example             # Client environment template
│   └── .env                     # Local client environment
├── server/                      # Backend Application (Node.js + Express + Mongoose)
│   ├── config/
│   │   └── db.js                # Resilient MongoDB connection & status tracker
│   ├── controllers/
│   │   └── healthController.js  # GET /api/health controller
│   ├── middleware/
│   │   ├── errorHandler.js      # Centralized error handler
│   │   └── notFoundHandler.js   # 404 Route handler
│   ├── models/                  # Mongoose data schemas (Phase 2+)
│   ├── routes/
│   │   ├── healthRoutes.js      # Health endpoint routing
│   │   └── index.js             # Central API router (/api/...)
│   ├── utils/
│   │   └── logger.js            # Logging helper
│   ├── server.js                # Express entry point & middleware initialization
│   ├── package.json             # Server dependencies & scripts
│   ├── .env.example             # Server environment template
│   └── .env                     # Local server environment
├── .gitignore                   # Root gitignore
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.x or higher (Tested on Node v22.16.0)
- **npm**: v9.x or higher (Tested on npm 10.9.2)
- **MongoDB** 7.x: local instance, Docker container, or MongoDB Atlas URI

### 0. Start MongoDB

The quickest way is Docker (data persists in the `scentora-mongo-data` volume and the container restarts automatically):

```bash
docker run -d --name scentora-mongo --restart unless-stopped \
  -p 127.0.0.1:27017:27017 -v scentora-mongo-data:/data/db mongo:7.0
```

Day to day: `docker start scentora-mongo` / `docker stop scentora-mongo`.

---

### 1. Backend Setup & Run

Open a terminal in the project root:

```bash
cd server
cp .env.example .env   # then set JWT_SECRET to a long random string
npm install
npm run dev
```

On first start, an empty database is seeded automatically with the catalogue (18 fragrances, 7 categories), demo accounts and sample orders. To wipe all data and reseed: `npm run seed:reset`.

The Express server will start at:
- **Root:** `http://localhost:5000`
- **Health Check:** `http://localhost:5000/api/health`

#### Backend Environment Variables (`server/.env`)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Port for the Express server |
| `NODE_ENV` | `development` | Runtime environment (`development` / `production`) |
| `CLIENT_URL` | `http://localhost:5173` | Allowed frontend origin for CORS |
| `MONGODB_URI`| `mongodb://127.0.0.1:27017/scentora` | MongoDB connection string |
| `JWT_SECRET` | *(required)* | Secret used to sign login tokens. The server refuses to start without it. |
| `JWT_EXPIRES_IN` | `7d` | How long a login stays valid |

*Note: If MongoDB is offline, the server keeps running: `/api/health` reports `database: disconnected` and every other endpoint returns `503` until the database is back.*

---

### 2. Frontend Setup & Run

Open a second terminal in the project root:

```bash
cd client
npm install
npm run dev
```

The Vite dev server will start at:
- **Local Application:** `http://localhost:5173`

#### Frontend Environment Variables (`client/.env`)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `http://localhost:5000/api` | Backend Express API base URL |

---

### 3. Demo Accounts (seeded)

| Role | Email | Password |
| :--- | :--- | :--- |
| Admin | `admin@scentora.com` | `scentora2026` |
| Customer | `connoisseur@scentora.com` | `perfume123` |
| Customer (with order history) | `aaditya.sharma@example.com`, `natasha.s@example.com` | `perfume123` |

Promo code: `SCENT10` (10% off). Orders under ₹3,000 pay ₹250 shipping.

---

## 🔌 REST API

All endpoints are under `/api`. Successful responses are `{ "status": "success", "data": ... }`; errors are `{ "status": "error", "message": "..." }`. Authenticated requests send `Authorization: Bearer <token>` (the token comes from login/register).

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| GET | `/health` | Public | Server and database status |
| POST | `/auth/register` | Public | Create a customer account → `{ token, user }` |
| POST | `/auth/login` | Public | Sign in → `{ token, user }` |
| POST | `/auth/admin/login` | Public | Sign in, administrators only |
| GET | `/auth/me` | User | Current user |
| GET | `/products` | Public | All products (optional `?category=` and `?search=`) |
| GET | `/products/:idOrSlug` | Public | One product |
| POST / PUT / DELETE | `/products`, `/products/:id` | Admin | Create, update (partial), delete |
| GET | `/categories` | Public | All categories |
| POST / PUT / DELETE | `/categories`, `/categories/:id` | Admin | Create, update, delete |
| POST | `/orders` | Public / User | Place an order (guest or signed in). The server prices items, applies the coupon, adds shipping and reserves stock. |
| GET | `/orders/mine` | User | My orders |
| GET | `/orders/:id` | Owner / Admin | One order (guest orders are readable by id) |
| GET | `/orders` | Admin | All orders |
| PATCH | `/orders/:id/status` | Admin | Set `Processing`, `Shipped` or `Delivered` |
| DELETE | `/orders/:id` | Admin | Delete an order |
| PUT | `/account/profile` | User | Update name, email, phone, address, preferences |
| GET / PUT | `/account/cart` | User | Saved cart (`{ items: [{ productId, quantity }] }`) |
| GET / PUT | `/account/wishlist` | User | Saved wishlist (`{ productIds: [] }`) |
| POST | `/coupons/validate` | Public | Check a promo code |
| POST | `/contact` | Public | Submit a contact inquiry |
| POST | `/newsletter` | Public | Subscribe an email |
| GET | `/admin/customers` | Admin | Customers with order count, lifetime spend and tier |
| GET | `/admin/inquiries` | Admin | Contact inquiries |
| POST | `/admin/reset-catalogue` | Admin | Restore products and categories to the seed data |

**How the frontend uses it:** the React contexts (`ProductContext`, `AuthContext`, `CartContext`, `WishlistContext`, `OrderContext`) call these endpoints through `client/src/services/scentoraApi.js`. Guests' carts and wishlists live in `localStorage`; when a guest signs in, they are merged into the account and synced to the server from then on.

---

## 🌓 How the Theme System Works

The theme system is built for performance, accessibility, and smooth user experience:

1. **Synchronous Anti-Flash Script (`index.html`):** An inline script executes in `<head>` before the DOM renders. It reads `localStorage.getItem('scentora-theme')` or `window.matchMedia('(prefers-color-scheme: dark)')` and immediately sets `data-theme="dark"` and class `dark` on `document.documentElement`.
2. **React Context (`ThemeContext.jsx`):** Provides `theme`, `toggleTheme()`, `setTheme()`, and `isDark`.
3. **OS System Preference Sync:** If the user hasn't explicitly chosen a theme, changing the OS system appearance (dark/light) automatically transitions the application.
4. **Token Isolation (`theme.css`):** All theme-dependent colors are declared as CSS custom properties (`--color-page-bg`, `--color-surface`, etc.). Components use semantic Tailwind utilities (`bg-page`, `bg-surface`, `text-content-primary`, `border-themeBorder`), eliminating duplicate theme conditionals.
5. **Reduced Motion:** Fully complies with `@media (prefers-reduced-motion: reduce)` by minimizing transitions when requested.
6. **Accessibility:** The `ThemeToggle` button includes descriptive `aria-label`, visible focus indicators, and uses crisp Lucide React `Sun` and `Moon` icons.

---

## 🧪 Verification & Testing Performed

1. **Client Build:** Executed `npm run build` in `client/` — completed cleanly in Vite with 0 errors.
2. **Server Startup:** Express server runs on port 5000, initializes middleware, and loads environment settings.
3. **Health Check Endpoint:** `GET /api/health` returns status code 200 with JSON payload (`status: "ok"`, uptime, environment, and resilient database status).
4. **Interactive Theme Toggle:** Seamless switching between Light and Dark themes.
5. **Theme Persistence:** Theme choice is saved in `localStorage` and restored on page refresh without visual flash.
6. **Responsive Layout:** Tested across both mobile and desktop viewports.
