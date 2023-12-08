import Navigation from "@/app/components/Navigation"
import ModeratorNavigation from "./components/ModeratorNavigation"
import { spartan300, spartan400, heebo800  } from "./styles/fonts"
import './styles/globals.css'

export const dynamic = 'force-dynamic'

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
      <body className={`${spartan300.className} page-layout`}>
          <Navigation />
          <ModeratorNavigation />
          <div className='right-panel'>
            {children}
          </div>
      </body>
    </html>
  )
}
