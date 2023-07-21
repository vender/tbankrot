import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Электронные торги по банкротству',
  description: 'Электронные торги по банкротству',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
