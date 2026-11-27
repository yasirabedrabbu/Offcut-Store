import './globals.css';
import '../src/styles/editorial.css';
import { CartProvider } from '../lib/cart';
import Shell from '../components/Shell';

export const metadata = { title: 'Offcut', description: 'Limited run streetwear. No restocks.' };
export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@1&family=UnifrakturMaguntia&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <Shell>{children}</Shell>
        </CartProvider>
      </body>
    </html>
  );
}
