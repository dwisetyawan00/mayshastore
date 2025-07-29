'use client'
import { SessionProvider } from "next-auth/react"

export default function SessionProviderLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
