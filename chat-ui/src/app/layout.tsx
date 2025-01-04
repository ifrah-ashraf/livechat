import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { CheckNavbar } from '@/components/layout/CheckNavbar';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'livechat - Real-time Chat Platform',
  description: 'Connect and chat with friends in real-time',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CheckNavbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

