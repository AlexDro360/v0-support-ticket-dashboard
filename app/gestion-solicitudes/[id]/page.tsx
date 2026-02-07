'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TicketStepper } from '@/components/tickets/ticket-stepper'
import { TicketTimeline } from '@/components/tickets/ticket-timeline'
import { TicketActions } from '@/components/tickets/ticket-actions'
import { ChevronLeft } from 'lucide-react'

interface TicketDetail {
  id: string
  folio: string
  estado: 'Pendiente' | 'Asignada' | 'En Proceso' | 'Resuelta' | 'Cerrada' | 'Pausa' | 'Rechazada'
  prioridad: 'Alta' | 'Media' | 'Baja'
  solicitante: string
  correoSolicitante: string
  areaSolicitante: string
  tipoProblema: string
  descripcion: string
  fechaCreacion: string
  asignadoA?: string
  diagnostico?: string
  materialesUsados?: Array<{ nombre: string; cantidad: number }>
}

// Mock data
const mockTicket: TicketDetail = {
  id: '1',
  folio: '#TK-2026-001',
  estado: 'Pendiente',
  prioridad: 'Alta',
  solicitante: 'Juan Pérez',
  correoSolicitante: 'juan.perez@ito.edu.mx',
  areaSolicitante: 'Dirección',
  tipoProblema: 'Hardware',
  descripcion: 'La computadora de la oficina no enciende correctamente. Muestra un código de error en la pantalla.',
  fechaCreacion: '2026-02-06 10:30',
  asignadoA: undefined,
  diagnostico: undefined,
  materialesUsados: [],
}

export default function TicketDetailPage() {
  const params = useParams()
  const ticketId = params.id as string
  const [ticket, setTicket] = useState<TicketDetail>(mockTicket)

  const updateTicketState = (newState: TicketDetail['estado']) => {
    setTicket((prev) => ({ ...prev, estado: newState }))
  }

  const prioridadConfig = {
    Alta: 'bg-red-100 text-red-800',
    Media: 'bg-amber-100 text-amber-800',
    Baja: 'bg-blue-100 text-blue-800',
  }

  const estadoConfig = {
    Pendiente: 'bg-slate-100 text-slate-800',
    Asignada: 'bg-blue-100 text-blue-800',
    'En Proceso': 'bg-amber-100 text-amber-800',
    Resuelta: 'bg-green-100 text-green-800',
    Cerrada: 'bg-slate-600 text-white',
    Pausa: 'bg-orange-100 text-orange-800',
    Rechazada: 'bg-red-100 text-red-800',
  }

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
            <BreadcrumbLink href="/gestion-solicitudes">Gestión de Solicitudes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="text-foreground font-medium">{ticket.folio}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/gestion-solicitudes">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {ticket.folio}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Creado el {ticket.fechaCreacion}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className={prioridadConfig[ticket.prioridad]}>
            {ticket.prioridad}
          </Badge>
          <Badge className={estadoConfig[ticket.estado]}>
            {ticket.estado}
          </Badge>
        </div>
      </div>

      {/* Stepper */}
      <Card>
        <CardContent className="pt-6">
          <TicketStepper currentState={ticket.estado} />
        </CardContent>
      </Card>

      {/* Main Content - 2 Columns */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Operativo (60%) */}
        <div className="md:col-span-2 space-y-6">
          {/* Información General */}
          <Card>
            <CardHeader>
              <CardTitle>Información de la Solicitud</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Solicitante</p>
                  <p className="text-sm text-foreground mt-1">{ticket.solicitante}</p>
                  <p className="text-xs text-muted-foreground">{ticket.correoSolicitante}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Área</p>
                  <p className="text-sm text-foreground mt-1">{ticket.areaSolicitante}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Tipo de Problema</p>
                  <p className="text-sm text-foreground mt-1">{ticket.tipoProblema}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Estado Actual</p>
                  <Badge className={`mt-1 ${estadoConfig[ticket.estado]}`}>
                    {ticket.estado}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Descripción</p>
                <p className="text-sm text-foreground mt-2">{ticket.descripcion}</p>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Panel by Role/State */}
          <TicketActions ticket={ticket} onStateChange={updateTicketState} />
        </div>

        {/* Right Column - Histórico (40%) */}
        <div className="md:col-span-1">
          <TicketTimeline ticketId={ticket.id} />
        </div>
      </div>
    </div>
  )
}
