# Frontend Guideline Document

This document outlines the frontend architecture, design principles, and technologies for the Riedel multi-page website. It’s written in everyday language to ensure everyone—from designers to non-technical stakeholders—can understand how the site is built and why.

## 1. Frontend Architecture

**Frameworks & Libraries**
- **Next.js** (with TypeScript): Server-side rendering (SSR) for fast load times and good SEO, plus file-based routing for simplicity.  
- **Tailwind CSS**: Utility-first styling to speed up design, enforce consistency, and avoid large custom CSS files.  
- **Shadcn UI**: Accessible, pre-built components that integrate smoothly with Tailwind.  
- **Chart.js** (or D3.js): For interactive, static data charts and infographics.  
- **Clerk Auth**: User authentication out of the box, with React components and hooks.  
- **Netlify Functions** & **Firebase**: Backend logic (contact form, calendar API) and blog content storage.  

**Scalability & Maintainability**
- **Modular Pages**: Next.js pages folder separates each route into its own file.  
- **Component-Based**: UI broken down into reusable components (buttons, cards, modals).  
- **Utility-First CSS**: Tailwind classes mean no large monolithic stylesheets.  
- **Type Safety**: TypeScript prevents many bugs during development.  

**Performance**
- **SSR & Static Generation**: Next.js pre-renders pages when possible.  
- **Code Splitting**: Automatic per-page bundling to reduce initial load.  
- **Asset Optimization**: Image optimization with Next.js Image component, and minified CSS/JS in production.  

## 2. Design Principles

**Usability**
- Clear, intuitive navigation—maximum three clicks to any content.  
- Prominent call-to-action buttons on home and services pages.  

**Accessibility**
- Semantic HTML elements (`<nav>`, `<header>`, `<main>`, `<footer>`).  
- Keyboard-navigable components, focus outlines on interactive elements.  
- Sufficient color contrast for text and backgrounds.  

**Responsiveness**
- Mobile-first breakpoints in Tailwind.  
- Flexible grid and flex layouts adapt from phones to large screens.  

**Application**
- Buttons always use the same padding, border-radius, and hover styles.  
- Form fields use consistent labels, error messages, and spacing.  

## 3. Styling and Theming

**Styling Approach**
- **Tailwind CSS**: Define design tokens (colors, spacing) in `tailwind.config.js`.  
- **Component Classes**: Use @apply in small component CSS files for repeated patterns.  

**Theming**
- Light theme only (per ProLabs branding).  
- All colors and font sizes stored in Tailwind theme so any change propagates.  

**Visual Style**
- Modern flat design with subtle glassmorphism on hero banners or info cards.  
- Minimal shadows and smooth transitions for hover states.  

**Color Palette**
- **Primary**: #0052CC  (ProLabs Blue)  
- **Secondary**: #00B8D9 (Accent Teal)  
- **Accent**: #FF4081  
- **Background**: #F4F5F7 (Light Gray)  
- **Surface**: #FFFFFF (White)  
- **Text Primary**: #172B4D  
- **Text Secondary**: #42526E  

**Font**
- **Inter** (Google Font): Neutral, highly readable for body and headings.  
- Fallbacks: `system-ui`, `sans-serif`.  

## 4. Component Structure

**Organization**
- `/components`: Shared UI pieces (Button, Card, Navbar, Footer).  
- `/layouts`: Page wrappers (MainLayout, AuthLayout).  
- `/pages`: Each route corresponds to a file or folder.  

**Reusability**
- Each component receives props to customize text, icons, and styles.  
- No hard-coded colors or spacing—always reference Tailwind tokens.  

**Benefits**
- Easier to maintain and test small pieces.  
- Faster onboarding for new developers—they can find and update one component.  

## 5. State Management

**Approach**
- **Local Component State**: React `useState` and `useEffect` for UI states (modals, form fields).  
- **Global State**: React Context (for theme or user info) combined with Clerk’s hooks (`useUser()`).  

**Data Fetching**
- Next.js built-in `getStaticProps` or `getServerSideProps` for page data.  
- Client-side: React Query or SWR (optional) for fetching user-specific or dynamic data.  

**Why This Works**
- Avoids heavy libraries for a small site.  
- Keeps most state close to where it’s used.  

## 6. Routing and Navigation

**Routing**
- **Next.js File System Routing**: `/pages/home.tsx` → `/home`, `/pages/services/index.tsx` → `/services`.  
- Dynamic routes if needed (e.g., `/blog/[slug].tsx`).  

**Navigation Structure**
- **Header**: Links to Home, About, Services, Blog, Contact.  
- **Footer**: Quick links + social icons.  
- **Protected Routes**: Services page and any CMS pages wrapped in an AuthLayout that checks `Clerk` status.  

## 7. Performance Optimization

**Lazy Loading**
- Dynamic imports for heavy components (e.g., charts): `const Chart = dynamic(() => import('../components/Chart'))`.  

**Code Splitting**
- Next.js automatic chunking by page.  

**Asset Optimization**
- Next/Image for responsive image sizes and WebP conversion.  
- Minify CSS/JS in production build.  

**Caching**
- HTTP caching headers on static assets via Netlify.  

## 8. Testing and Quality Assurance

**Unit Tests**
- **Jest** + **React Testing Library** for core components and utility functions.  

**Integration Tests**
- Testing flows: login, data fetch, chart render, contact form validation.  

**End-to-End Tests**
- **Cypress**: Critical user journeys—login, view services, submit contact form.  

**Linting & Formatting**
- **ESLint** (with Next.js and TypeScript plugins) to catch code errors.  
- **Prettier** for consistent formatting.  

**Accessibility Checks**
- **axe-core** or **Lighthouse** audits for color contrast and ARIA roles.  

## 9. Conclusion and Overall Frontend Summary

This frontend setup combines Next.js, Tailwind CSS, and TypeScript to deliver a fast, maintainable, and accessible website for ProLabs. We follow clear design principles—usability, accessibility, responsiveness—and keep our code modular through component-based architecture. Authentication, data visualization, and CMS features integrate seamlessly with Clerk Auth, Chart.js, Firebase, and Netlify Functions. With rigorous testing, performance optimizations, and adherence to ProLabs’ branding, this guideline ensures the site is professional, reliable, and easy to evolve.

Feel free to refer back to this document at any time. It’s your roadmap to understanding and building upon the Riedel site’s frontend.


-------------------------------------------------------------------------------------------------------------------------



# Backend Structure Document

This document outlines the backend setup for the Riedel project. It explains the architecture, database, APIs, hosting, infrastructure, security, and monitoring in clear, everyday language.

## 1. Backend Architecture

Overall, we’re using a serverless approach with Firebase Cloud Functions to handle requests and business logic. This means we don’t manage our own servers—instead, Google Cloud spins up the compute power we need on demand.

Key aspects:

• Design Patterns and Frameworks

*   **Modular structure**: We separate code into controllers (handle HTTP requests), services (business rules), and repositories (data access).
*   **Firebase SDK**: Provides built-in methods for authentication, database operations, and email triggers.
*   **Clerk Auth integration**: Handles user sign-up, sign-in, and session management.

• Scalability

*   Cloud Functions auto-scale: New instances spin up when traffic increases, then scale down when traffic drops.
*   Firestore database scales horizontally, handling large volumes of reads/writes.

• Maintainability

*   Clear folder structure: `controllers/`, `services/`, `repositories/`, `utils/`.
*   Shared utility modules for common tasks (e.g., email sending, input validation).

• Performance

*   Functions run close to Google’s network edge.
*   Firestore indexes commonly queried fields for fast lookups.
*   Static assets and CDN caching (via Netlify) speed up page loads.

## 2. Database Management

We use **Firebase Firestore**, a NoSQL document database, to store all application data.

• Data Types

*   Documents: Individual JSON-like records.
*   Collections: Groups of related documents.

• Data Structure and Access

*   Organize data into logical collections (users, blogPosts, servicesData, contactSubmissions).
*   Real-time listeners for live updates (if ever needed).
*   Batched writes and transactions ensure data integrity.

• Data Management Practices

*   Use Firestore Security Rules to restrict access based on user roles.
*   Keep data lean—only store what’s needed.
*   Archive older blog posts periodically to optimize performance.

## 3. Database Schema (NoSQL)

Below is a human-readable view of our Firestore setup:

• **Collection: users** – Document ID: auto-generated or the Clerk user ID – Fields: * `email` (string) * `fullName` (string) * `role` (string: “admin” or “viewer”)

• **Collection: blogPosts** – Document ID: slug or auto ID – Fields: * `title` (string) * `content` (string) * `authorId` (reference to users) * `publishedAt` (timestamp) * `tags` (array of strings)

• **Collection: servicesData** – Document ID: service name (e.g., “ProLabsOpportunityMatrix”) – Fields: * `chartData` (array of objects) * `lastUpdated` (timestamp)

• **Collection: contactSubmissions** – Document ID: auto-generated – Fields: * `name` (string) * `email` (string) * `subject` (string) * `message` (string) * `submittedAt` (timestamp)

## 4. API Design and Endpoints

We expose a set of RESTful endpoints via Firebase Cloud Functions. Clerk handles the heavy lifting for authentication.

• **Authentication (handled by Clerk)**

*   Sign-up, sign-in, session management.
*   Frontend uses Clerk SDK; backend verifies JWT tokens on each request.

• **Endpoints**

1.  **GET /api/blogPosts**

    *   Purpose: List all published blog posts.
    *   Auth: Optional (public).

2.  **GET /api/blogPosts/:id**

    *   Purpose: Retrieve a single post by ID.
    *   Auth: Optional.

3.  **POST /api/blogPosts**

    *   Purpose: Create a new blog post.
    *   Auth: Admin only.

4.  **PUT /api/blogPosts/:id**

    *   Purpose: Update an existing post.
    *   Auth: Admin only.

5.  **DELETE /api/blogPosts/:id**

    *   Purpose: Remove a post.
    *   Auth: Admin only.

6.  **GET /api/servicesData**

    *   Purpose: Fetch the static data for charts (e.g., Opportunity Matrix).
    *   Auth: Required.

7.  **POST /api/contact**

    *   Purpose: Receive contact form submissions.
    *   Auth: None (public).
    *   Action: Store in Firestore + send notification email to <manuel.boissiere@producthelpdesk.net>

## 5. Hosting Solutions

We split hosting between Netlify (frontend) and Firebase (backend).

• **Netlify**

*   Hosts the Next.js static build.
*   Built-in global CDN speeds up asset delivery.
*   Continuous deployment from your Git repo.

• **Firebase**

*   Hosts Cloud Functions and Firestore.
*   Backed by Google’s reliable, globally distributed infrastructure.

Benefits:

*   No server management.
*   Pay-as-you-go: only pay for function invocations and database storage.
*   High availability and low latency.

## 6. Infrastructure Components

• **Load Balancing**

*   Google’s HTTPS load balancer automatically distributes traffic to Cloud Functions.

• **Caching Mechanisms**

*   Netlify CDN caches static assets (HTML, JS, CSS, images).
*   HTTP caching headers for API responses (where appropriate).

• **Content Delivery Network (CDN)**

*   Netlify’s built-in CDN for frontend.
*   Firestore leverages Google’s edge network for fast reads.

## 7. Security Measures

• **Authentication & Authorization**

*   Clerk Auth issues JWT tokens.
*   Cloud Functions verify tokens on every protected endpoint.
*   Firestore Security Rules enforce data-level access control.

• **Data Encryption**

*   HTTPS everywhere protects data in transit.
*   Firestore encrypts data at rest by default.

• **Input Validation & Sanitization**

*   All user input (contact forms, blog content) is validated server-side.

• **Email Security**

*   Use trusted email service (SMTP or SendGrid) with TLS for notifications.

## 8. Monitoring and Maintenance

• **Monitoring Tools**

*   **Firebase console**: Real-time view of function invocations and errors.
*   **Google Cloud Logging**: Detailed logs for each function execution.
*   **Alerts**: Set up error and usage alerts via Google Cloud Monitoring.

• **Maintenance Strategies**

*   Regular dependency updates using automated tools (Dependabot or Renovate).
*   Periodic review of Firestore indexes and performance.
*   Backup Firestore data using scheduled exports.

## 9. Conclusion and Overall Backend Summary

We’ve built a fully serverless backend on Firebase combined with Netlify’s powerful CDN for the frontend. Key strengths:

• **Scalability**: Auto-scaling Cloud Functions and a distributed NoSQL database. • **Maintainability**: Clear code structure and modular services. • **Performance**: CDN caching, indexed queries, edge-proxied functions. • **Security**: Strong auth with Clerk, Firestore rules, data encryption.

This setup allows the ProLabs team to focus on content and design, while the infrastructure scales and adapts automatically to user demand. If you have questions or need further details, feel free to reach out!
