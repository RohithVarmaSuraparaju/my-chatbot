// src/app/layout.tsx
export const metadata = {
  title: "Simple Chatbot",
  description: "LLM-backed chatbot on Next.js + Vercel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
