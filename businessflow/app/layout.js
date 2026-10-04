import './globals.css'

export const metadata = {
  title: 'BusinessFlow — Bookings, customers and growth',
  description: 'Online booking and lightweight CRM for local service businesses.'
}

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>
}
