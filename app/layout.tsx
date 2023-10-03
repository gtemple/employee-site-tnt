import Navigation from "@/components/Navigation"
import './globals.css'

export const metadata = {
  title: 'TNT',
  description: 'Your travels made easy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
