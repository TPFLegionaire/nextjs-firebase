# Implementation plan

## Phase 1: Environment Setup

1.  **Prevalidation**: Check if current working directory is a Git repo; if not, run `git init` in the project root (Project Requirement Document: Overview).

2.  Install Node.js v20.2.1 using the official installer (Tech Stack Document: Core Tools).

    *   Validation: Run `node -v` and confirm output is `v20.2.1`.

3.  Install Yarn v1.22.19 globally by running `npm install -g yarn@1.22.19` (Tech Stack Document: Core Tools).

    *   Validation: Run `yarn -v` and confirm output is `1.22.19`.

4.  Create a Next.js 14 project with TypeScript by running:

`npx create-next-app@14 riedel --typescript `(Tech Stack Document: Frontend)

*   Validation: Confirm `/riedel` contains `next.config.js` and `tsconfig.json`.

1.  Change into the project directory:

`cd riedel `(Prevalidation)

1.  Install Tailwind CSS v3.3.2 and generate config files:

`npx tailwindcss@3.3.2 init -p `(Tech Stack Document: Frontend)

*   Validation: Ensure `tailwind.config.js` and `postcss.config.js` exist.

1.  Install Shadcn UI v1.0.0:

`npm install @shadcn/ui@1.0.0 `(Tech Stack Document: Frontend)

1.  Install Clerk Next.js SDK v4.11.2:

`npm install @clerk/nextjs@4.11.2 `(Tech Stack Document: Authentication)

1.  Install Firebase client v9.22.0 and Admin SDK v11.11.0:

`npm install firebase@9.22.0 firebase-admin@11.11.0 `(Tech Stack Document: Backend & Storage)

1.  Install Chart.js v4.4.0 and react-chartjs-2 v5.2.0:

`npm install chart.js@4.4.0 react-chartjs-2@5.2.0 `(Project Requirement Document: Data Visualization)

1.  Install Netlify CLI v12.21.0 globally:

`npm install -g netlify-cli@12.21.0 `(Tech Stack Document: Deployment)

*   Validation: Run `netlify --version`.

## Phase 2: Frontend Development

1.  Configure Tailwind in `tailwind.config.js` by adding:

`module.exports = { content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], theme: { extend: {} }, plugins: [], } `(Tech Stack Document: Frontend)

*   Validation: Run `npx tailwindcss -i ./styles/globals.css -o ./public/output.css --watch` and ensure no errors.

1.  In `styles/globals.css`, add:

`@tailwind base; @tailwind components; @tailwind utilities; `(Tech Stack Document: Frontend)

1.  In `app/layout.tsx`, import global CSS and wrap `<html>` in `<ClerkProvider>` with your Clerk frontend API key:

`import "../styles/globals.css"; import { ClerkProvider } from "@clerk/nextjs"; export default function RootLayout({ children }) { return ( <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}> {children} </ClerkProvider> ); } `(App Flow Summary: Authentication Flow)

1.  Create `components/Header.tsx` using Shadcn UI with links to `/`, `/about`, `/services`, `/blog`, `/contact` (Core Pages/Sections: Footer).

    *   Validation: Render `<Header />` in `app/layout.tsx` and verify links.

2.  Create `components/Footer.tsx` with ProLabs brand quick links and social icons (Core Pages/Sections: Footer).

    *   Validation: Render `<Footer />` in `app/layout.tsx`.

3.  Create `app/page.tsx` (Home page) including a hero banner, intro text, and “Sign In” CTA using Shadcn UI (Core Pages/Sections: Home).

    *   Validation: Visit `/` at `npm run dev` and confirm layout.

4.  Create `app/about/page.tsx` (About page) with static sections for history, mission, and team (Core Pages/Sections: About).

    *   Validation: Navigate to `/about` and verify content.

5.  Add `data/opportunity.json` to `/data` with static Riedel vs. ProLabs analysis (Project Requirement Document: Data Visualization).

6.  Create `components/OpportunityMatrix.tsx` that reads `/data/opportunity.json` and renders an interactive chart via `react-chartjs-2` (Project Requirement Document: Data Visualization).

    *   Validation: Import and render `<OpportunityMatrix />` in `app/services/page.tsx` and verify chart.

7.  Create `app/services/page.tsx`. Guard with Clerk’s `<SignedIn>`/`<SignedOut>` and redirect to Clerk sign-in when signed out (App Flow Summary: Authentication Flow).

    *   Validation: Access `/services` anonymously and confirm redirect.

8.  Create `app/blog/page.tsx` to list posts by fetching from Firestore client SDK in a `useEffect` hook (Core Pages/Sections: Blog).

    *   Validation: Add a post in Firestore console and confirm it appears.

9.  Create dynamic route `app/blog/[id]/page.tsx` to display individual posts using Firestore Admin SDK for server-side fetch (Core Pages/Sections: Blog).

    *   Validation: Visit `/blog/<id>` and confirm content.

10. Create `app/contact/page.tsx` contact form with fields (name, email, subject, message) and client-side validation (Core Pages/Sections: Contact).

    *   Validation: Submit empty form and observe validation errors.

11. In `app/contact/page.tsx`, if user is signed in, show a “Schedule Strategy Session” button next to the submit (App Flow Summary: Contact Page Flow).

## Phase 3: Backend Development

1.  Create `lib/firebase.ts` to initialize Firebase client and Admin SDK using env vars (`NEXT_PUBLIC_FIREBASE_API_KEY`, `FIREBASE_PRIVATE_KEY`, etc.) (Tech Stack Document: Backend & Storage).

    *   Validation: Import in a REPL and confirm no errors.

2.  Document Firestore schema: collection `posts` with fields `id:string`, `title:string`, `content:string`, `authorId:string`, `createdAt:Timestamp` (Tech Stack Document: Backend & Storage).

3.  Create server actions in `app/blog/actions.ts` exporting `createPost`, `updatePost`, `deletePost` using the Admin SDK and ensuring `auth().userId === authorId` (App Flow Summary: Blog Page Flow).

    *   Validation: Add Jest tests in `__tests__/blog.actions.test.ts` covering each action.

4.  Create Netlify Function at `netlify/functions/contact.js` to receive form data and send email via Nodemailer configured with `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` env vars (Tech Stack Document: Backend & Storage).

    *   Validation: Run `netlify dev` and POST to `/.netlify/functions/contact`, expect 200 response.

5.  Add a `.env.local` with placeholders for `NEXT_PUBLIC_CLERK_FRONTEND_API`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_FIREBASE_API_KEY`, `FIREBASE_PRIVATE_KEY`, `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` (Prevalidation).

    *   Validation: Run `npm run dev` and confirm env vars load.

## Phase 4: Integration

1.  In `app/services/page.tsx`, import and render `<OpportunityMatrix />` passing parsed JSON data from `/data/opportunity.json` (Phase 2, Step 20) (App Flow Summary: Services Page Flow).

    *   Validation: Verify interactive chart functions.

2.  In `app/contact/page.tsx`, connect form submission to the Netlify function at `/.netlify/functions/contact` (Phase 2, Step 24) (App Flow Summary: Contact Page Flow).

    *   Validation: Submit form and confirm function returns success.

3.  Create `components/ProtectedRoute.tsx` using Clerk’s `auth()` to guard `/services` and `/blog/new` (Core Pages/Sections: Services, Blog).

    *   Validation: Attempt unauthorized access; expect redirect.

4.  Create `app/blog/new/page.tsx` and `app/blog/[id]/edit/page.tsx`, protect them by verifying `ClerkUser.publicMetadata.role === "author"` (App Flow Summary: Blog Page Flow).

    *   Validation: Log in as non-author; expect 403 UI.

5.  Test site navigation: click header links for Home, About, Services, Blog, Contact, and confirm correct pages load (Phase 2: Steps 16–18) (App Flow Summary: Navigation).

6.  Add a global error boundary in `app/error.tsx` to catch exceptions and render a friendly fallback (Project Requirement Document: Error Handling).

    *   Validation: Throw an error in a test component and confirm fallback UI.

## Phase 5: Deployment

1.  Create `netlify.toml` with:

`[build] command = "npm run build" publish = ".next" [[plugins]] package = "@netlify/plugin-nextjs" `(Tech Stack Document: Deployment)

1.  Connect the GitHub repo to Netlify and configure environment variables matching `.env.local` in the Netlify dashboard (Tech Stack Document: Deployment).

    *   Validation: Trigger a deploy; confirm build passes.

2.  Add a `.replit` file:

`run = "npm run dev" language = "nodejs" `(Tech Stack Document: IDE Setup)

1.  Create CI config at `.github/workflows/ci.yml` to run `npm install`, `npm run lint`, `npm run build`, `npm run test` on push to `main` (Project Requirement Document: Pre-Launch Checklist).

    *   Validation: Push a change; verify CI status.

2.  Perform an accessibility audit:

`npx axe-cli http://localhost:3000 `Address any `critical` violations (Project Requirement Document: Accessibility).

1.  Test responsive design at standard breakpoints in Chrome DevTools (Project Requirement Document: Responsiveness).

    *   Validation: Capture screenshots for mobile/tablet/desktop.

2.  Write end-to-end Playwright tests in `/e2e` covering sign-in, blog CRUD, and contact form flows (Project Requirement Document: Q&A: Pre-Launch Checklist).

    *   Validation: Run `npx playwright test` successfully.

3.  Run Lighthouse against the production URL; ensure performance ≥ 90 and save report to `/reports/lighthouse.html` (Project Requirement Document: Performance).

4.  Verify Firestore and Netlify Functions only accept requests from your domain (Project Requirement Document: Security).

    *   Validation: Perform a cross-origin request and expect it to fail.

5.  Document setup and usage in `README.md`, including all environment variables, build, and deploy steps (Project Requirement Document: Documentation).

    *   Validation: Clone repo fresh; follow `README.md`; confirm `npm run dev` works.

6.  Tag the initial release as `v1.0.0` in GitHub and create a release note summarizing features/setup (Project Requirement Document: Versioning).

7.  Share deployed site URL and repository with ProLabs stakeholders for review (Project Requirement Document: Stakeholder Review).

    *   Validation: Collect feedback and log issues in GitHub.

8.  Close out tasks in your project management tool and mark this phase complete (Project Requirement Document: Project Closure).

9.  Prepare a demo script and slide deck showcasing each feature, focusing on the VP of Sales and Product Management personas (Project Requirement Document: Overview).
