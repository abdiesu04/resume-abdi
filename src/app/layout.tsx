import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Chat from '@/components/Chat';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ABDI ESAYAS | Secure Technical Portfolio',
  description: 'Full Stack Developer specialized in building secure, scalable applications with military-grade precision.',
  keywords: ['Full Stack Developer', 'Software Engineer', 'Go', 'Python', 'JavaScript', 'Next.js'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-background-darker font-sans antialiased flex flex-col ${inter.variable} ${jetbrainsMono.variable}`}>
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1E2D4A',
                color: '#fff',
                border: '1px solid #374151',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
          <Chat />
        </div>
      </body>
    </html>
  );
} 