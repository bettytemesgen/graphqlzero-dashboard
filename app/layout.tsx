// app/layout.tsx
import { Manrope } from 'next/font/google';
import "./globals.css";
import ApolloProviderWrapper from '@/components/ApolloProviderWrapper';
const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['400', '600', '800'], // 600 = Semi Bold, 800 = Extra Bold
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
<ApolloProviderWrapper>
          {children}
        </ApolloProviderWrapper>      </body>
    </html>
  );
}