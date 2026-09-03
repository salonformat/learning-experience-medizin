import type { Metadata } from 'next';
import { Della_Respira, Josefin_Sans } from 'next/font/google';
import './globals.css';

const josefin = Josefin_Sans({
  variable: '--font-josefin',
  subsets: ['latin'],
});

const dellaRespira = Della_Respira({
  variable: '--font-della-respira',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'What if I get it wrong? | Salon Format',
  description:
    'The first ten minutes of a first-aid course - an interactive learning experience by Salon Format.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.variable} ${dellaRespira.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
