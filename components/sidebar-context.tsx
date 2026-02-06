"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface SidebarContextType {
  open: boolean
  isDesktop: boolean
  toggle: () => void
  close: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  const [isDesktop, setIsDesktop] = useState(true)

  // Detectar cambios de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
      // En móvil, cerrar el sidebar por defecto
      if (window.innerWidth < 1024) {
        setOpen(false)
      } else {
        setOpen(true)
      }
    }

    handleResize() // Llamar una vez al montar
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggle = () => setOpen((prev) => !prev)
  const close = () => setOpen(false)

  return (
    <SidebarContext.Provider value={{ open, isDesktop, toggle, close }}>
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
