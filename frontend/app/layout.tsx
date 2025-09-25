import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TrendCraft Studio - Social Content Creator',
  description: 'Create viral content with AI-powered trend analysis and content generation',
  keywords: ['social media', 'content creation', 'trends', 'AI', 'viral content'],
  authors: [{ name: 'TrendCraft Studio Team' }],
  creator: 'TrendCraft Studio',
  publisher: 'TrendCraft Studio',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trendcraft-studio.com',
    title: 'TrendCraft Studio - Social Content Creator',
    description: 'Create viral content with AI-powered trend analysis and content generation',
    siteName: 'TrendCraft Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrendCraft Studio - Social Content Creator',
    description: 'Create viral content with AI-powered trend analysis and content generation',
    creator: '@trendcraft',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}