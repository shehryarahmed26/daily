import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Daily Vocabulary Builder",
  description: "Learn a new English word every day, powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900">
        {/* Navbar */}
        <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-violet-400 hover:text-violet-300 transition">
              Daily Vocab
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-slate-300 hover:text-violet-400 transition text-sm font-medium">
                Today
              </Link>
              <Link href="/archive" className="text-slate-300 hover:text-violet-400 transition text-sm font-medium">
                Archive
              </Link>
            </div>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center text-slate-500 text-sm">
            Built with AI — A new word every day
          </div>
        </footer>
      </body>
    </html>
  );
}
