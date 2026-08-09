import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dream Deco - Enterprise 3D Interior Design Platform',
  description: 'Next.js 15 App Router & React 19 Enterprise Interior Design Workspace for Dream Deco.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
