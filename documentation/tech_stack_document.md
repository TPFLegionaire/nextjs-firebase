# Tech Stack Document

This document explains, in everyday language, the technology choices behind the ProLabs Riedel analysis website. It covers front-end and back-end tools, how we deploy and host the site, the outside services we talk to, and how we keep things secure and fast. By the end, you’ll understand why we picked each piece and how it all fits together.

## 1. Frontend Technologies

These are the tools and libraries we use to build everything you see and interact with in your browser.

*   **Next.js**\
    A React-based framework that makes pages load quickly, supports easy navigation between multiple pages, and lets us mix server-rendered and static content.
*   **TypeScript**\
    A superset of JavaScript that adds types (labels for data). It helps catch mistakes early and makes our code easier to maintain.
*   **Tailwind CSS**\
    A utility-first styling library. Instead of writing long custom stylesheets, we use small, reusable classes that match ProLabs’ branding (colors, spacing, fonts).
*   **Shadcn UI**\
    A ready-made collection of accessible, themeable building blocks (buttons, forms, modals) that match our Tailwind setup.
*   **Chart.js (or D3.js)**\
    A popular JavaScript charting library to draw interactive graphs and infographics from our static JSON data. Hover effects and scroll-triggered animations help highlight key numbers.
*   **Custom Hooks & Utilities**\
    Small React helpers (for things like toasts and mobile detection) that ensure consistent behavior across pages. They live in our `hooks` and `lib/utils.ts` folders.
*   **Static JSON Data**\
    All market share figures, product specs, and opportunity matrix details are stored in version-controlled JSON files under `/public/data/`. This makes it easy to update charts without touching code.

## 2. Backend Technologies

These components handle data storage, user management, and server-side processes that run behind the scenes.

*   **Firebase Firestore**\
    A NoSQL database to store and retrieve blog posts and any future internal data. It syncs in real time and scales automatically.
*   **Netlify Functions**\
    Serverless functions that process the contact form submissions and send emails to `manuel.boissiere@producthelpdesk.net`. They also handle calendar scheduling calls when an authenticated user books a strategy session.
*   **Clerk Auth**\
    A turn-key authentication service for sign-up, sign-in, password resets, and role-based access. This ensures only ProLabs personnel (VPs of Sales and Product) can see the detailed analysis.
*   **VP Calendar API**\
    A simple integration via Netlify Function that adds booked strategy sessions into the VP calendar, giving authenticated users a smooth scheduling experience.

## 3. Infrastructure and Deployment

This section covers where we write code, how we track changes, and how we publish updates to the world.

*   **Replit & Git**\
    Our code lives in a Git repository (hosted on Replit for easy collaboration). Every change is tracked, reviewed, and versioned.
*   **Netlify**\
    Hosts the built site and runs continuous deployment. Whenever we push to the main branch, Netlify rebuilds the app and deploys instantly. Environment variables (Clerk keys, Firebase credentials) live securely in Netlify’s dashboard.
*   **Bolt for Scaffolding**\
    A project setup tool that gives us initial folder structure and best practices, ensuring we follow a consistent pattern for code, testing, and configuration.
*   **Deepseek R1**\
    An AI-powered reasoning checker that helps us review architecture decisions and catch requirement mismatches early.

## 4. Third-Party Integrations

These external services add key features without us building everything from scratch.

*   **Clerk Auth**\
    Handles user accounts, sessions, and role checks out of the box.
*   **Firebase**\
    Manages blog content storage and real-time data sync.
*   **Netlify Functions**\
    Powers email routing (contact form) and calendar scheduling.
*   **VP Calendar API**\
    Lets signed-in users book strategy sessions directly into a leadership calendar.
*   **Style Portal (style.prolabs.com)**\
    Our source for official ProLabs colors, fonts, and logo files to keep the design on-brand.

## 5. Security and Performance Considerations

We’ve built multiple layers to keep data safe and pages snappy.

*   **HTTPS Everywhere**\
    All traffic is encrypted by default via Netlify.

*   **Secure Environment Variables**\
    Clerk API keys and Firebase credentials never hit the browser. They’re stored in Netlify’s secure settings.

*   **Role-based Access Control**\
    Clerk ensures only authorized ProLabs staff can view or export sensitive content (like the deep opportunity matrix).

*   **Data Validation**\
    Contact form inputs are checked in real time on the front end, and again in Netlify Functions to prevent malicious payloads.

*   **Performance Optimizations**

    *   Code splitting and lazy loading for large chart modules
    *   Image compression and optimized formats via Next.js built-in tools
    *   Caching static assets with long-lived headers on Netlify
    *   Static generation of public pages (Home, About) and server-rendered or incremental-static generation for protected pages to balance speed and freshness.

## 6. Conclusion and Overall Tech Stack Summary

By combining Next.js, TypeScript, Tailwind CSS, and Shadcn UI on the front end with Firebase, Clerk Auth, and Netlify Functions on the back end, we achieve a fast, secure, and highly interactive multi-page site. Replit, Git, Bolt, and Deepseek R1 keep our development process smooth and error-free. Every piece aligns with our goals:

*   Present polished, brand-compliant visuals
*   Showcase data-driven insights with interactive charts
*   Protect sensitive strategy content behind secure sign-in
*   Enable non-technical team members to update the blog easily
*   Offer a seamless, reliable user experience for ProLabs’ VPs of Sales and Product Management

This stack not only meets today’s requirements but also lays the groundwork for future growth—whether that’s adding new data sources, expanding to more internal tools, or scaling to a global audience.
