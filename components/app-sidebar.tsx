"use client"

import React, { useState, useCallback } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  LayoutDashboard,
  Package,
  Monitor,
  Headset,
  FileText,
  BarChart3,
  Building2,
  Tags,
  Calendar,
  Users,
  BookOpen,
  ChevronDown,
  LogOut,
  Settings,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSidebar } from "@/components/sidebar-context"

interface NavSection {
  label: string
  items: NavItem[]
}

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  children?: { label: string; href: string; icon: React.ReactNode }[]
}

const navigation: NavSection[] = [
  {
    label: "General",
    items: [
      { label: "Inicio", href: "/", icon: <Home className="h-4 w-4" /> },
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
    ],
  },
  {
    label: "Inventarios",
    items: [
      {
        label: "Inventarios",
        href: "#",
        icon: <Package className="h-4 w-4" />,
        children: [
          {
            label: "Materiales",
            href: "/inventarios/materiales",
            icon: <Package className="h-4 w-4" />,
          },
          {
            label: "Equipos",
            href: "/inventarios/equipos",
            icon: <Monitor className="h-4 w-4" />,
          },
        ],
      },
    ],
  },
  {
    label: "Mesa de Ayuda",
    items: [
      {
        label: "Mesa de Ayuda",
        href: "#",
        icon: <Headset className="h-4 w-4" />,
        children: [
          {
            label: "Mis Solicitudes",
            href: "/mesa-ayuda/mis-solicitudes",
            icon: <FileText className="h-4 w-4" />,
          },
          {
            label: "Solicitudes",
            href: "/solicitudes",
            icon: <Headset className="h-4 w-4" />,
          },
          {
            label: "Reportes",
            href: "/mesa-ayuda/reportes",
            icon: <BarChart3 className="h-4 w-4" />,
          },
        ],
      },
    ],
  },
  {
    label: "Adicionales",
    items: [
      {
        label: "Adicionales",
        href: "#",
        icon: <Settings className="h-4 w-4" />,
        children: [
          {
            label: "Departamentos",
            href: "/adicionales/departamentos",
            icon: <Building2 className="h-4 w-4" />,
          },
          {
            label: "Etiquetas",
            href: "/adicionales/etiquetas",
            icon: <Tags className="h-4 w-4" />,
          },
          {
            label: "Periodo",
            href: "/adicionales/periodo",
            icon: <Calendar className="h-4 w-4" />,
          },
          {
            label: "Responsables Equipo",
            href: "/adicionales/responsables",
            icon: <Users className="h-4 w-4" />,
          },
          {
            label: "Catalogos",
            href: "/adicionales/catalogos",
            icon: <BookOpen className="h-4 w-4" />,
          },
        ],
      },
    ],
  },
]

function CollapsibleNavItem({
  item,
  pathname,
  openSection,
  setOpenSection,
  onClose,
}: {
  item: NavItem
  pathname: string
  openSection: string | null
  setOpenSection: (label: string | null) => void
  onClose: () => void
}) {
  const isChildActive = item.children?.some((c) => pathname === c.href)
  const isOpen = openSection === item.label

  const handleToggle = useCallback(() => {
    // Acordeón exclusivo: cerrar otras secciones
    setOpenSection(isOpen ? null : item.label)
  }, [isOpen, item.label, setOpenSection])

  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          "text-[hsl(var(--sidebar-muted-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]",
          isChildActive &&
            "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-foreground))]"
        )}
      >
        <span className="flex items-center gap-3">
          {item.icon}
          {item.label}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Animación suave de entrada/salida */}
      {isOpen && (
        <div className="ml-4 mt-1 space-y-1 border-l border-[hsl(var(--sidebar-border))] pl-3 animate-in fade-in-50 slide-in-from-top-2 duration-200">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === child.href
                  ? "bg-[hsl(var(--sidebar-accent))] font-medium text-[hsl(var(--sidebar-foreground))]"
                  : "text-[hsl(var(--sidebar-muted-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]"
              )}
            >
              {child.icon}
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const { open, isDesktop, close } = useSidebar()
  const [openSection, setOpenSection] = useState<string | null>(null)

  // Cerrar sheet en móvil después de hacer clic en enlace
  const handleLinkClick = useCallback(() => {
    if (!isDesktop) {
      close()
    }
  }, [isDesktop, close])

  return (
    <>
      {/* Mobile overlay - solo visible en móvil */}
      {open && !isDesktop && (
        <div
          className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))] transition-transform duration-300 ease-in-out",
          "lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header con logo y botón cerrar */}
        <div className="flex h-16 items-center justify-between border-b border-[hsl(var(--sidebar-border))] px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--sidebar-accent))]">
              <Headset className="h-4 w-4 text-[hsl(var(--sidebar-foreground))]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[hsl(var(--sidebar-foreground))]">
                Soporte Tecnico
              </p>
              <p className="text-xs text-[hsl(var(--sidebar-muted-foreground))]">
                Centro de Computo
              </p>
            </div>
          </div>

          {/* Botón cerrar - visible en móvil */}
          {!isDesktop && (
            <button
              onClick={close}
              className="rounded-md p-1 text-[hsl(var(--sidebar-muted-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))] transition-colors"
              aria-label="Cerrar sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-6">
            {navigation.map((section) => (
              <div key={section.label}>
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--sidebar-muted-foreground))]">
                  {section.label}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) =>
                    item.children ? (
                      <CollapsibleNavItem
                        key={item.label}
                        item={item}
                        pathname={pathname}
                        openSection={openSection}
                        setOpenSection={setOpenSection}
                        onClose={handleLinkClick}
                      />
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-foreground))]"
                            : "text-[hsl(var(--sidebar-muted-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]"
                        )}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile at Bottom */}
        <div className="border-t border-[hsl(var(--sidebar-border))] p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <Avatar className="h-9 w-9 border border-[hsl(var(--sidebar-border))]">
              <AvatarFallback className="bg-[hsl(var(--sidebar-accent))] text-sm font-semibold text-[hsl(var(--sidebar-foreground))]">
                JR
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-[hsl(var(--sidebar-foreground))]">
                Juan Rodriguez
              </p>
              <p className="truncate text-xs text-[hsl(var(--sidebar-muted-foreground))]">
                Administrador
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-md p-1.5 text-[hsl(var(--sidebar-muted-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))] transition-colors"
              aria-label="Cerrar sesion"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
