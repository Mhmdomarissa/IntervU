import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IntervU - Technical Interview Preparation',
  description: 'Prepare for technical job interviews with AI-generated questions tailored to your role and experience level.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-primary-600">IntervU</h1>
                  <span className="ml-2 text-gray-500 text-sm">Technical Interview Prep</span>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                    Home
                  </a>
                  <a href="/practice" className="text-gray-700 hover:text-primary-600 transition-colors">
                    Practice
                  </a>
                  <a href="/progress" className="text-gray-700 hover:text-primary-600 transition-colors">
                    Progress
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  )
} 