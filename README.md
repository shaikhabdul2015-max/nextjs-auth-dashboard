# NextJS Auth Dashboard

A production-ready foundation featuring modular UI components, robust Supabase authentication, and an interactive real-time analytics dashboard built with Next.js.

## Features
- **Clean Architecture:** Modern setup with Tailwind CSS, TypeScript, and clean routing.
- **Authentication & Login:** Pre-built login and dashboard pages integrated with Supabase.
- **Analytics Dashboard:** Real-time metrics tracking and intuitive UI indicators.
- **Supabase Integration:** Built-in client setup for live data handling.

## Tech Stack
- Next.js
- Supabase (Backend & Auth)
- Tailwind CSS
- TypeScript

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd nextjs-auth-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Supabase keys:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
