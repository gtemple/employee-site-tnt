import Navigation from "@/components/Navigation"
import { spartan300, spartan400  } from "./styles/fonts"
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
      <body className={spartan300.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
