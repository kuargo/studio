import type {Metadata} from 'next';
import './globals.css';
import '@/lib/firebase-error-suppressor'; // Import the suppressor to run it globally
import { Providers } from '@/components/app/providers';

export const metadata: Metadata = {
  title: 'Connect Hub 2.0: Gospel Remix',
  description: 'A modern social and spiritual platform for churches.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
