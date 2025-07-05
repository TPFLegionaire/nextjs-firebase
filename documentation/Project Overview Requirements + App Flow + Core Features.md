# Project Requirements Document

## 1. Project Overview

ProLabs needs a secure, multi-page website to showcase a deep competitive analysis of Riedel Communications and highlight concrete product and sales opportunities for ProLabs’ VP of Sales and VP of Product Management. This site will present structured, data-driven insights—market share charts, product comparisons, opportunity matrices—and professional visual storytelling that aligns with ProLabs’ tech-industry branding. It solves the problem of turning a long, text-heavy research document into a concise, interactive, and actionable presentation.

The primary goal is to help ProLabs leadership quickly spot where Riedel excels, where they’re vulnerable, and where ProLabs can outshine or collaborate. Success means the VPs can log in, navigate to key sections (Executive Summary, Product Portfolios, Opportunity Matrix, Recommendations), and immediately extract strategic next steps. Secondary goals include a lightweight CMS for blog updates and a clean contact form to capture inquiries.

## 2. In-Scope vs. Out-of-Scope

### In-Scope (Version 1.0)

*   **Pages & Navigation**

    *   Home, About, Services (deep Riedel vs. ProLabs analysis), Blog, Contact
    *   Sticky header with clear links; footer with quick links and social icons

*   **Branding & Design**

    *   Follow ProLabs’ official style guide (colors, fonts from style.prolabs.com)
    *   Modern, clean layout built with Tailwind CSS

*   **Interactive Data Visualizations**

    *   Charts and infographics powered by static JSON files
    *   Hover and scroll animations to drill into market share, revenue, product lines

*   **Authentication & Access Control**

    *   Clerk Auth integration restricting “Services” deep dives & opportunity matrix to internal users
    *   Role-based access (VPs can view/export sensitive reports)

*   **Blog CMS**

    *   Lightweight blog with Markdown/WYSIWYG editor for authenticated authors
    *   Inline article expansion and basic media uploads

*   **Contact Form**

    *   Fields: Name, Email, Subject, Message
    *   Submissions emailed via Netlify Function to <manuel.boissiere@producthelpdesk.net>
    *   Authenticated users see extra “Schedule a Strategy Session” option

*   **Deployment & Hosting**

    *   Code hosted in Replit, deployed on Netlify with CI/CD
    *   Environment vars managed in Netlify dashboard

### Out-of-Scope (Planned for Later Phases)

*   Third-party analytics (e.g., Google Analytics, heatmaps)
*   SEO optimization beyond basic metadata
*   Multilingual support or regional versions
*   Real-time data fetching or dynamic API endpoints
*   Mobile app or desktop application
*   Deep accessibility (WCAG) certification—only basic keyboard & alt-text compliance

## 3. User Flow

When a visitor lands on the **Home** page, they see a full-width hero banner summarizing the Riedel analysis from ProLabs’ perspective. A sticky header lets them jump to About, Services, Blog, or Contact. Non-authenticated users can scroll through teaser visuals—muted charts and opportunity snapshots—with a persistent “Sign In” prompt inviting them to unlock the full analysis.

After signing in via Clerk Auth, the user is redirected back to their original page. On the **Services** page, they access detailed interactive charts (market share, product breakdowns) loaded from static JSON. The **Opportunity Matrix** dynamically compares ProLabs vs. Riedel across product lines, with filters to highlight direct competition, gaps, and partnership potential. In the **Blog**, authenticated authors click “Add Post,” write in a rich-text editor, and publish immediately. The **Contact** page lets any visitor send a message, but signed-in users can also book a strategy session directly into a VP calendar.

## 4. Core Features

*   **Multi-Page Site & Navigation**

    *   Home, About, Services, Blog, Contact, Footer with quick links
    *   Sticky header and jump-link menu for fast section access

*   **Branding Compliance**

    *   Colors, typography, and logo assets from ProLabs style portal
    *   Consistent tech-professional aesthetic via Tailwind CSS

*   **Interactive Charts & Infographics**

    *   Static JSON powering D3.js or Chart.js visuals
    *   Scroll-activated animations and hover-tooltips for data drill-down

*   **Authentication & Authorization**

    *   Clerk Auth for login/sign-up
    *   Role-based access: VPs and authorized staff unlock premium content

*   **Opportunity Matrix Module**

    *   Dynamic grid mapping ProLabs products vs. Riedel offerings
    *   Indicators for direct competition, differentiation, gaps, partnerships

*   **Blog CMS**

    *   Markdown/WYSIWYG editor in a modal for quick post creation
    *   Inline article expansion, edit icons for authenticated authors

*   **Contact Form & Netlify Functions**

    *   Real-time validation, toast feedback, email routing
    *   Extra “Schedule Session” button for signed-in users

*   **Responsive Design**

    *   Mobile-friendly breakpoints, accessible markup, and keyboard navigation

## 5. Tech Stack & Tools

*   **Frontend**

    *   Next.js (React framework with SSR & routing)
    *   TypeScript for type safety
    *   Tailwind CSS + Shadcn UI for design system

*   **Backend & Storage**

    *   Firebase Firestore for blog content storage
    *   Netlify Functions for Contact form email routing

*   **Authentication**

    *   Clerk Auth for user management and role-based access

*   **Hosting & CI/CD**

    *   Netlify (build, deploy)
    *   Git repo hosted in Replit; Bolt for project scaffolding

*   **AI/Dev Tools**

    *   Deepseek R1 for reasoning checks against requirements
    *   Bolt for code generation best practices

*   **Utilities**

    *   Custom hooks (e.g., use-toast, use-mobile)
    *   JSON files in `/public/data/` for charts

## 6. Non-Functional Requirements

*   **Performance**

    *   Time to interactive <2s on average desktop connections
    *   Code-splitting, image compression, caching headers

*   **Security**

    *   All data over HTTPS, secure environment variables in Netlify
    *   Clerk tokens & Firebase keys never exposed in client code

*   **Usability & Accessibility**

    *   Keyboard-navigable menus, meaningful alt text, color contrast meeting WCAG AA where feasible

*   **Reliability**

    *   99.9% uptime for Netlify-hosted site
    *   Automated Netlify deploy previews for PRs

## 7. Constraints & Assumptions

*   **Static Data Source**

    *   All charts and infographics read from manually maintained JSON files
    *   No external API calls for data in v1

*   **Branding Assets Available**

    *   Style guide, logos, fonts hosted at <https://style.prolabs.com/>

*   **Hosting Environment**

    *   Netlify chosen for ease of CI/CD and Functions
    *   Assume Netlify supports necessary Node versions

*   **Browser Support**

    *   Modern evergreen browsers (Chrome, Edge, Safari, Firefox)

*   **Authentication Service**

    *   Clerk Auth service is available and properly configured before development

## 8. Known Issues & Potential Pitfalls

*   **Large JSON Datasets**

    *   Very large static files may slow initial load. Mitigate by code-splitting chart modules and lazy-loading data only when a chart enters viewport.

*   **Authentication Redirect Loops**

    *   Improper handling of Clerk callbacks can trap users. Always capture `redirectTo` parameter and restore post-login.

*   **Mobile Chart Legibility**

    *   Complex infographics may be hard to read on small screens. Provide simplified views or accordion expansions for mobile breakpoints.

*   **CMS Content Consistency**

    *   Without strict validation, blog posts may break layout. Enforce content schema (e.g., title, date, body) in Firestore rules or frontend checks.

*   **Deployment Secret Management**

    *   Missing or misconfigured environment variables in Netlify will break auth or email flows. Document required vars in README and Netlify dashboard.

This document is your single source of truth for building ProLabs’ Riedel analysis site. All subsequent architecture diagrams, frontend guidelines, and implementation plans should align directly with these requirements.


----------------------------------------------------------------------------------------------

Create a project called Website (Multi-Page), description: I want to build a multi-page website aimed at showcasing a research paper providing company information, and offering a clear view of opportunities for my sales and product management VP. The goal is to present clear, structured information with an engaging design that reflects professionalism.

Project Name
Riedel 

use the data in the uploaded document 

Target Audience
VP of sales and vp of product management 
ou are Manus, an AI specializing in visual communication and web/slide design, tasked with transforming a detailed competitive analysis of Riedel Communications into an engaging and actionable presentation for the VPs of Sales and Product Management at ProLabs (www.prolabs.com).
Goal: To clearly identify product opportunities for ProLabs by highlighting areas where Riedel excels, where they might have vulnerabilities, and where ProLabs can offer competitive or superior solutions. The presentation should be visually stunning, highly informative, and geared towards identifying concrete product development and sales strategies.
Audience: VP of Sales and VP of Product Management at ProLabs. Assume they are highly knowledgeable in the fiber optics and networking industry but require a concise, visually impactful, and strategic overview.
Input Data: The provided comprehensive research document on Riedel Communications (OCR text provided separately).
Output Requirements (Choose one, prioritize website for interactivity):
Interactive Website (Preferred): A single-page, scrollable, and visually rich website.
Design Aesthetic: Modern, clean, professional, and visually appealing, using ProLabs' branding guidelines (colors, fonts - assume a professional tech aesthetic if no specific guidelines are provided).
Interactivity: Incorporate subtle animations, hover effects, and clear navigation (e.g., sticky header with jump links).
Data Visualization: Utilize interactive charts, graphs, and infographics to represent quantitative data (e.g., market share, revenue, product comparisons).
Key Sections:
Executive Summary (ProLabs' Perspective): A high-level overview of Riedel's market position, key strengths, and immediate opportunities for ProLabs.
Riedel's Core Business & Strengths: Visually represent Riedel's main product lines (MediorNet, Artist, Bolero, MuoN, FusioN) and their market dominance in specific niches (e.g., live events, broadcast, intercoms). Highlight their strategic acquisitions (Embrionix) and their focus on IP integration and software-defined solutions.avworx.africa
+5
Riedel's Optical Product Portfolio Deep Dive:
SFP/SFP+ Transceivers: Categorize and visualize Riedel's SFP offerings (12G-SDI, 3G-SDI, CWDM, Ethernet SFPs), emphasizing their focus on specialized video SFPs and in-house designs. Compare their approach to commodity optics.
Fiber Cabling (PURE, TAC): Illustrate their ruggedized fiber solutions, highlighting their use cases and unique features (e.g., bend-insensitive, water-peak).
WDM/CWDM Multiplexers & Edge Devices: Explain their role in Riedel's ecosystem and how they enable efficient fiber usage.
Go-to-Market Strategy & Sales Channels: Visualize their sales approach (bundled solutions, authorized resellers, OEM channels) and key customer segments (sports, broadcast, entertainment, integrators).hdtvsupply.com
+7
Competitive Landscape (Riedel's View): Summarize Riedel's perceived competitors (Lawo, Nevion, Ross Video, Apantac, Evertz) and how Riedel differentiates itself (SFP-based processing, integration, reliability).
ProLabs' Opportunity Matrix (Core Section): This is crucial. Create a dynamic matrix or interactive comparison tool that maps ProLabs' existing product categories (Transceivers, DACs & AOCs, Media Converters, Mux/Demux, Patch Cables, A/V Cables & Misc) against Riedel's offerings. For each intersection, identify:prolabs.com
Direct Competition: Where ProLabs has a similar product.
Competitive Advantage for ProLabs: How ProLabs can differentiate (e.g., cost-effectiveness, broader compatibility, specific features, lead times, customer support, global reach).mouser.com
+2
Product Gap/Opportunity: Where Riedel has a strong offering that ProLabs could develop or enhance.
Strategic Partnership Potential: If any, where ProLabs could collaborate rather than compete directly.
Actionable Recommendations for ProLabs: Based on the opportunity matrix, provide clear, concise recommendations for:
Product Development: Specific product features or new products ProLabs should consider.
Sales & Marketing: How to position ProLabs against Riedel, target specific customer segments, and leverage ProLabs' strengths.
R&D Focus: Areas for future research and development.
ProLabs' Strengths & Differentiators: A dedicated section highlighting ProLabs' core strengths (e.g., "Global Leaders in Compatible Connectivity," stringent testing, lifetime warranty, broad compatibility, global reach, customer support).mouser.com
+2
Call to Action: Encourage discussion and strategic planning.
Interactive Slide Deck (Alternative): A visually rich and concise slide deck (e.g., PowerPoint or Google Slides format, optimized for presentation).
Design Aesthetic: Professional, clean, and visually appealing, using ProLabs' branding.
Content per Slide: Each slide should convey a single key message with supporting visuals and minimal text.
Key Sections: Mirror the website sections above, adapting for a slide-based format (e.g., more emphasis on impactful visuals and less on long-form text).
Key Considerations for AI Generation:
Data Extraction & Synthesis: Accurately extract and synthesize key information from the provided document, focusing on product specifications, market positioning, competitive strategies, and financial indicators relevant to product opportunities.
Visual Storytelling: Translate complex technical and market data into intuitive and compelling visual narratives.
ProLabs' Lens: Frame all analysis and recommendations from ProLabs' perspective, emphasizing how they can gain a competitive edge.
Actionability: Ensure all insights lead to clear, practical recommendations for the VPs.
Tone: Professional, strategic, and confident.
Citations: Include clear citations for all factual information drawn from the provided document.
Core Pages/Sections


1. Home Page – Hero banner, brief company introduction, main call-to-action
2. About – Company history, mission, team members
3. Services – Overview of services offered, key benefits, pricing or case studies
4. Blog/News (optional) – Company updates, industry insights, thought leadership content
5. Contact – Contact form, location map, social media links
6. Footer – Quick links

Tech Stack:
• Frontend:
• Backend & Storage (if the site needs user data, forms, or other dynamic content):


Design Preferences
A clean, modern layout with consistent branding, easy navigation, and strong visual hierarchy (e.g., large hero image, clear typography, and intuitive menu)., refer to the following documentation:

# Unified Project Documentation

## Project Requirements Document

### 1. Project Overview

We are building a professional, multi-page website to present a detailed competitive analysis of Riedel Communications for the VPs of Sales and Product Management at ProLabs. The site will showcase Riedel’s market strengths, product lines, and go-to-market strategies, and it will highlight concrete opportunities where ProLabs can compete or partner. By combining interactive charts, clear infographics, and a clean design that follows ProLabs’ branding, we aim to deliver an engaging, data-driven experience.

The key objectives are to provide a concise executive summary, deep dives into Riedel’s optical portfolio and core business areas, and an interactive opportunity matrix that aligns ProLabs’ products against Riedel’s offerings. Success will be measured by how easily the VPs can explore insights, identify actionable recommendations, and plan product or sales strategies. The site should load quickly, guide users logically through the content, and restrict sensitive sections to internal personnel.

### 2. In-Scope vs. Out-of-Scope

**In-Scope:**

*   Multi-page public site: Home, About, Services, Blog, Contact, Footer.
*   Executive Summary and Riedel deep-dive pages with interactive data visualizations driven by static JSON files.
*   Opportunity Matrix page comparing ProLabs vs. Riedel products, with interactive hover and filter features.
*   Authentication via Clerk for internal pages that show detailed opportunity analyses and recommendations.
*   Simple CMS for blog posts accessible to authenticated users, using Firebase for storage.
*   Contact form on Contact page sending submissions to <manuel.boissiere@producthelpdesk.net> via a Netlify function.
*   Modern, tech-professional design based on ProLabs’ branding portal (style.prolabs.com).
*   Deployment on Netlify with continuous deployment from the main repository.

**Out-of-Scope:**

*   Real-time API data fetching or live market updates.
*   Advanced analytics tracking or user behavior heatmaps.
*   Mobile app or native iOS/Android versions.
*   Multilingual support or SEO strategy beyond basic on-page titles.
*   Deep security audits or formal WCAG compliance audits.
*   Integration with external CRM or marketing automation platforms.
*   Interactive slide deck alternative (this version focuses on the website).

### 3. User Flow

A visitor lands on the Home page and immediately sees a large hero banner with a concise executive summary of Riedel’s market position. The sticky header shows navigation links (Home, About, Services, Blog, Contact) and a “Sign In” button. Public users can scroll through summaries and data highlights, but when they try to access detailed analyses or the Opportunity Matrix, they are redirected to a login screen. After signing in, users return to the page they requested, now unlocked with full visualizations and in-depth recommendations.

Authenticated users have access to the Opportunity Matrix and recommendation pages where they can hover or click data points for more insight. They can also visit the Blog page to create or edit posts via a simple WYSIWYG editor. The Contact page always remains available with a form to reach out. Signing out is as easy as clicking a profile icon in the header, which ends the session and redirects back to the public Home page.

### 4. Core Features

*   **Navigation & Layout:** A consistent header, footer, and page structure across all sections for quick access to major pages.
*   **Authentication & Access Control:** Clerk integration to restrict deep-dive pages and blog authoring to internal ProLabs personnel.
*   **Interactive Data Visualization:** Charts and infographics driven by static JSON files, with hover tooltips and scroll-triggered animations.
*   **Opportunity Matrix Module:** Dynamic comparison grid mapping ProLabs’ products against Riedel’s portfolio, with indicators for direct competition, gaps, and partnership potential.
*   **Blog CMS:** Lightweight blog editor for qualified team members to publish and edit articles, storing posts in Firebase.
*   **Contact Form:** Validated form sending submissions to a designated email via Netlify Functions.
*   **Branding & Styling:** Use of ProLabs’ official colors, fonts, and iconography for a clean, modern look.
*   **Deployment Pipeline:** Netlify continuous deployment with environment-protected keys for auth and database.

### 5. Tech Stack & Tools

*   **Frontend Framework:** Next.js with TypeScript for routing, server-side rendering, and type safety.
*   **Styling:** Tailwind CSS and Shadcn UI for rapid, consistent, and accessible component styling.
*   **Authentication:** Clerk for signup, login, session management, and role-based access.
*   **Data Storage & CMS:** Firebase Firestore for blog post storage; static JSON files in the project for charts.
*   **Hosting & Deployment:** Netlify for static asset hosting, serverless functions, and CI/CD.
*   **Development Tools:** Replit for collaborative coding; Bolt for project scaffolding; Deepseek R1 for reasoning-based code suggestions.

### 6. Non-Functional Requirements

*   **Performance:** Pages should load within 2 seconds on average broadband connections. Lazy loading and code splitting must be used to optimize bundle size.
*   **Security:** All protected routes must require Clerk authentication. Environment secrets stored securely in Netlify.
*   **Reliability:** 99.9% uptime expectation via Netlify’s SLA.
*   **Maintainability:** Clear project structure following the Next.js + Firebase starter kit, with documented components and utilities.

### 7. Constraints & Assumptions

*   Static JSON files will be manually updated when data changes—no automated feeds.
*   Users have modern browsers that support ES6 and CSS Grid/Flexbox.
*   ProLabs provides branding assets via their style portal; default to a professional tech palette if not.
*   No external analytics or SEO guidelines, so only basic meta tags will be added.
*   Authentication is only required for in-depth content; public summaries remain open.

### 8. Known Issues & Potential Pitfalls

*   Large static data files may slow build times; mitigate by splitting files and lazy-loading charts.
*   Complexity in Clerk role management; keep user roles simple (e.g., `viewer`, `editor`).
*   Inconsistent CMS content formatting; enforce markdown linting and editor guidelines.
*   Auth redirects causing awkward UX loops; test all public→private transitions thoroughly.
*   Dependence on Netlify functions—ensure fallback error messages if the function is down.

## App Flow Document

### Onboarding and Sign-In/Sign-Up

When a user first arrives and tries to access any detailed or internal page, they are automatically redirected to the Clerk sign-in page. New internal users can create an account via email and password. They receive a confirmation link by email, and once verified, they are redirected back to the page they requested. Password recovery is handled by Clerk’s built-in flow: the user clicks “Forgot password,” enters their email, and follows the link sent to reset. Signing out is available from a profile icon in the sticky header, which logs the user out and returns them to the Home page.

### Main Dashboard or Home Page

On the Home page, every visitor sees a full-width hero banner with ProLabs’ tagline and a brief overview of the Riedel analysis. Below that, summary sections highlight market position, product strengths, and immediate opportunities. The sticky header includes links to About, Services, Blog, and Contact, plus a “Sign In” button that changes to a profile icon when the user is logged in. Page jump links let users quickly navigate to key sections of the Home page.

### Detailed Feature Flows and Page Transitions

From the header, clicking About takes the user to ProLabs’ company history page, featuring a timeline and team bios. The Services link leads to a collection of interactive charts comparing ProLabs’ services to Riedel’s offerings, all powered by static JSON files. Authenticated users see full-color visuals, while unauthenticated visitors see a muted overlay prompting them to sign in. The Opportunity Matrix page is only visible after sign-in and presents a dynamic grid that the user can filter by product category. In the Blog section, logged-in authors see an “Add Post” button opening a modal editor; any visitor can expand published posts inline. Clicking Contact slides in the contact form from the right.

### Settings and Account Management

After signing in, the user clicks the profile icon in the header to access a simple account menu. They can view basic profile info, change password through Clerk’s hosted page, or sign out. There is no separate profile editing page—settings are minimal. Once they finish, they click “Back to Site” to return to any previously viewed page without losing their place.

### Error States and Alternate Paths

If the user submits invalid data in the contact form, inline validation messages appear near each field, and the submit button remains disabled until corrected. If the Netlify function fails, a banner message explains the error and invites the user to retry. Attempting to view a restricted page while unauthenticated triggers a redirect to sign-in, and after successful login, the user is routed back. Loss of internet connectivity displays a full-screen notice and a “Retry” button that attempts to reload the page.

### Conclusion and Overall App Journey

From sign-in to the main goal of exploring in-depth Riedel vs. ProLabs analyses, the user moves seamlessly through a clear navigation hierarchy. Public visitors get a high-level view; internal VPs or team members sign in to unlock actionable insights, interactive matrices, and strategic recommendations. The flow ensures data is presented in bite-sized modules, progressively revealing more detail as the user digs deeper.

## Tech Stack Document

### Frontend Technologies

*   Next.js with TypeScript for server-side rendering, fast routing, and compile-time type checking.
*   Tailwind CSS paired with Shadcn UI components to ensure consistent styling and accessible UI patterns.
*   React Query (via TanStack) for any client-side data caching and state synchronization.
*   Static JSON files for chart data, loaded dynamically to power interactive infographics.

### Backend Technologies

*   Firebase Firestore for lightweight CMS storage of blog posts and user-generated content.
*   Netlify Functions (serverless) to handle contact form submissions and email forwarding.
*   Clerk Auth for user authentication, session management, and simple role-based access.
*   TypeScript utility libraries in `utils/` for data parsing, chart configuration, and API wrappers.

### Infrastructure and Deployment

*   Netlify for static site hosting, continuous deployment, and environment variable management.
*   GitHub (or Replit) for version control with protected branches and pull request workflows.
*   Bolt CLI for initial project scaffolding and best-practice configuration.
*   Automated build optimizations: code splitting, image compression, and HTTP caching policies.

### Third-Party Integrations

*   Clerk (clerk.com) for secure sign-in/sign-up and user management.
*   Firebase SDK to read/write blog data and store media assets.
*   Shadcn UI library for prebuilt, themeable components that match Tailwind.

### Security and Performance Considerations

*   All protected routes check Clerk session on the server and client.
*   Environment secrets (Clerk API keys, Firebase credentials) stored in Netlify settings.
*   Lazy loading of charts and code splitting to reduce initial bundle size.
*   HTTPS enforced sitewide via Netlify TLS certificates.

### Conclusion and Overall Tech Stack Summary

This stack balances developer productivity with performance and security. Next.js and TypeScript establish a solid foundation, Tailwind and Shadcn UI speed up styling, and Clerk plus Firebase cover authentication and lightweight CMS needs. Netlify ties it all together with an easy deployment pipeline. Together, these technologies deliver a fast, maintainable site that aligns perfectly with ProLabs’ objectives.

## Frontend Guidelines Document

### Frontend Architecture

We use a component-based structure in Next.js. Pages live in the `app/` folder, each automatically routed. Shared UI elements (buttons, cards, charts) go in `components/ui/` under the Shadcn pattern. Providers for Clerk and data fetching wrap the entire app in `components/providers/`. This keeps code organized, maintainable, and easy to scale as new features are added.

### Design Principles

*   **Usability:** Clear labels, consistent spacing, and predictable interactions.
*   **Accessibility:** Semantic HTML, ARIA attributes in custom components, and high color contrast.
*   **Responsiveness:** Mobile-first design using Tailwind’s responsive utilities for layouts that adapt across screen sizes.
*   **Clarity:** One key message per section, simple navigation, and minimal text on data-heavy pages.

### Styling and Theming

We follow the BEM-inspired utility approach of Tailwind CSS, with a custom theme in `tailwind.config.ts` pulling in ProLabs’ colors and fonts. Glassmorphism is avoided in favor of flat, modern cards and accent shadows. The primary palette uses ProLabs’ blues and grays; secondary colors highlight data points in charts. Fonts come from ProLabs’ style portal, loaded via a `<link>` in `layout.tsx`.

### Component Structure

*   **Atoms:** Smallest UI building blocks like `Button`, `Input`, `Tooltip` in `components/ui/atom/`.
*   **Molecules:** Composite elements like `NavLink`, `ChartCard`, `ContactForm` in `components/ui/molecule/`.
*   **Organisms:** Page sections like `HeroBanner`, `Timeline`, `OpportunityMatrix` in `components/ui/organism/`.
*   **Pages:** Each route under `app/` imports organisms and molecules, passing data via props.

This hierarchy ensures maximum reusability and clear separation of concerns.

### State Management

Local UI state (like open/closed modals) uses React’s `useState` and `useReducer` hooks. Global state for user session comes from Clerk’s React context. Caching of any client-side data (like reading static JSON) uses React Query for consistency and caching out of the box.

### Routing and Navigation

Next.js App Router handles page-based routing. The sticky header’s `NavLink` components use `next/link` for client-side navigation. Protected routes wrap page components in an auth check that redirects unauthenticated users to `/sign-in`.

### Performance Optimization

*   **Code Splitting:** Dynamic imports for heavy components like charts.
*   **Lazy Loading:** Images and chart libraries only load when they scroll into view.
*   **Asset Optimization:** Automatic image compression via Next.js Image component and SVG icons where possible.
*   **Caching:** Leverage Netlify’s CDN for static assets and set long cache lifetimes for JSON data.

### Testing and Quality Assurance

*   **Unit Tests:** Jest for key utility functions and small components.
*   **Integration Tests:** React Testing Library for component interaction, especially forms and modals.
*   **End-to-End Tests:** Cypress to simulate sign-in flows, page navigation, and form submissions.
*   **Linting:** ESLint and Prettier to enforce code style and catch errors early.

### Conclusion and Overall Frontend Summary

These guidelines ensure a scalable, maintainable front end that feels cohesive and performant. By standardizing component structure, styling, and data handling, we create a reliable experience for both developers and end users, aligning perfectly with ProLabs’ goals for speed, clarity, and professional polish.

## Implementation Plan

1.  **Project Setup**

    *   Use Bolt to scaffold a Next.js + TypeScript + Tailwind CSS starter.
    *   Connect the repo to Netlify for continuous deployment.

2.  **Authentication Layer**

    *   Configure Clerk in `components/providers/` and protect private routes.

3.  **Global Styles & Theme**

    *   Import ProLabs’ color palette and fonts into `tailwind.config.ts`.

4.  **Layout & Navigation**

    *   Build `Header`, `Footer`, and global `layout.tsx` with sticky header and jump links.

5.  **Home & About Pages**

    *   Create `HeroBanner`, `Timeline`, and team sections using Shadcn UI components.

6.  **Services & Data Viz**

    *   Load static JSON files and implement charts (e.g., Chart.js or Recharts) with scroll-triggered animations.

7.  **Opportunity Matrix Module**

    *   Develop a dynamic grid component allowing filters and tooltips, using React state and hooks.

8.  **Blog CMS**

    *   Set up Firebase Firestore, build an editor modal, and fetch/display posts on the Blog page.

9.  **Contact Form**

    *   Build the form component with validation hooks and wire up a Netlify Function to email submissions.

10. **Error Handling & Offline**

*   Add error boundaries, form validation feedback, and offline detection for retry prompts.

1.  **Testing & QA**

*   Write unit, integration, and end-to-end tests; fix issues uncovered.

1.  **Performance Tuning & Deployment**

*   Optimize images, enable code splitting, and deploy to Netlify. Verify environment variables and run final smoke tests.

1.  **Handover & Documentation**

*   Finalize README, add inline code comments, and deliver this unified documentation to the team.

This plan will guide the team from project kickoff through deployment, ensuring a smooth, step-by-step path to a polished, production-ready site for ProLabs.


--------------------------------------------------------------------------------------------------------------

flowchart TD
Start[Start] --> HomePage[Home Page]
HomePage --> AuthHome{Authenticated?}
AuthHome -->|No| HomePublic[Preview Teasers]
AuthHome -->|Yes| HomePrivate[Full Interactive Home]
HomePublic --> NavMenu[Navigation Menu]
HomePrivate --> NavMenu
NavMenu --> AboutPage[About Page]
NavMenu --> ServicesPage[Services Page]
NavMenu --> BlogPage[Blog Page]
NavMenu --> ContactPage[Contact Page]
NavMenu --> SettingsPage[Account Settings]
AboutPage --> AuthAbout{Authenticated?}
AuthAbout -->|No| AboutPublic[Public About View]
AuthAbout -->|Yes| AboutPrivate[Full About Content]
ServicesPage --> AuthServices{Authenticated?}
AuthServices -->|No| ServicesPrompt[Sign In Prompt]
AuthServices -->|Yes| ServicesPrivate[Full Services Content]
ServicesPrivate --> MarketShare[Market Share Charts]
ServicesPrivate --> PortfolioDeep[Portfolio Deep Dive]
ServicesPrivate --> OpportunityMatrix[Opportunity Matrix]
BlogPage --> AuthBlog{Author Authenticated?}
AuthBlog -->|No| BlogReader[Read Posts Only]
AuthBlog -->|Yes| BlogAuthor[Full Blog Editor]
BlogAuthor --> AddPost[Add New Post]
BlogAuthor --> EditPost[Edit Existing Post]
ContactPage --> ContactForm[Contact Form]
ContactForm --> SubmitForm[Submit Form]
SubmitForm --> EmailSent[Email Sent Confirmation]
ContactPage --> AuthContact{Authenticated?}
AuthContact -->|Yes| ScheduleSession[Schedule Strategy Session]
SettingsPage --> UpdateProfile[Update Profile]
SettingsPage --> ChangePassword[Change Password]



------------------------------------------------------------------------------------------------