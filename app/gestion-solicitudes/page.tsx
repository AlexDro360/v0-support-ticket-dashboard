'use client'

import { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { TicketDashboard } from '@/components/tickets/ticket-dashboard'
import { LayoutList, LayoutDashboard as LayoutKanban } from 'lucide-react'

export default function GestionSolicitudesPage() {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list')

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="text-foreground font-medium">Gestión de Solicitudes</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Header con Toggle de Vistas */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Gestión de Solicitudes
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tablero de control para administrar tickets de soporte técnico
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 border rounded-lg p-1 bg-muted/50 w-fit">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="gap-2"
          >
            <LayoutList className="h-4 w-4" />
            <span className="hidden sm:inline">Lista</span>
          </Button>
          <Button
            variant={viewMode === 'kanban' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('kanban')}
            className="gap-2"
          >
            <LayoutKanban className="h-4 w-4" />
            <span className="hidden sm:inline">Kanban</span>
          </Button>
        </div>
      </div>

      {/* Dashboard Component */}
      <TicketDashboard viewMode={viewMode} />
    </div>
  )
}
