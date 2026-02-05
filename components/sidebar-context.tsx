"use client"

import React, { createContext, useContext, useState } from "react"

interface SidebarContextType {
  open: boolean
  toggle: () => void
  close: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)

  const toggle = () => setOpen((prev) => !prev)
  const close = () => setOpen(false)

  return (
    <SidebarContext.Provider value={{ open, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within SidebarProvider")
  }
  return context
}
