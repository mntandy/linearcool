import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LinearCool',
  description: 'A graphic theorem prover for a fragment of propositional linear logic',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="centered columns">
        <h1><a href="/">LinearCool</a></h1>
        <h2>A theorem prover for propositional multiplicative linear logic</h2>
        </div>
        <div className="centered columns">
        {children}
        </div>
      </body>
    </html>
  )
}
