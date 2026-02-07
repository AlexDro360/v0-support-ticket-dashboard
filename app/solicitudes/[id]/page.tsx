'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, ArrowLeft, AlertCircle, FileText, User, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TicketStepper } from '@/components/ticket-stepper'
import { Separator } from '@/components/ui/separator'

// Mock ticket data
const mockTicket = {
  id: '1',
  folio: 'SOP-2026-001',
  titulo: 'Computadora no enciende - Oficina 101',
  fecha: '03/02/2026 10:30',
  estado: 'En Proceso' as const,
  prioridad: 'Alta' as const,
  nombreAfectado: 'María González Hernández',
  departamento: 'Subdirección Académica',
  correoContacto: 'maria.gonzalez@ito.edu.mx',
  telefonoContacto: '(123) 456-7890',
  areaSolicitante: 'Subdirección Académica',
  horarioDisponible: '08:00 - 10:00',
  equipo: 'INV-ITO-1024',
  tipoProblema: 'Hardware',
  descripcion: 'La computadora de la oficina 101 no enciende. Se probó con otros cables de poder pero no responde. No hay indicadores de luz en la torre.',
  asignadoA: 'Carlos López (Técnico)',
  diagnostico: 'Problema posible en fuente de poder o tarjeta madre. Requiere análisis más profundo.',
  materialesUsados: [
    { nombre: 'Fuente de poder 500W', cantidad: 1 },
    { nombre: 'Pasta térmica', cantidad: 1 },
  ],
  fotografias: [],
  tiempoTranscurrido: '2 horas 30 minutos',
  actualizacionesRecientes: [
    { fecha: '03/02 14:45', evento: 'Estado cambiado a En Proceso', usuario: 'Carlos López' },
    { fecha: '03/02 14:30', evento: 'Técnico asignado', usuario: 'Coordinador TI' },
    { fecha: '03/02 10:30', evento: 'Solicitud creada', usuario: 'María González' },
  ],
  expediente: [
    {
      fecha: '2026-02-06 10:30',
      quien: 'Juan Pérez',
      rol: 'Solicitante',
      accion: 'Creó la solicitud de soporte',
      estado: 'Pendiente',
      icono: 'documento',
      detalles: 'Tipo: Hardware, Prioridad: Alta',
    },
    {
      fecha: '2026-02-06 10:45',
      quien: 'Coordinador TI',
      rol: 'Administrador',
      accion: 'Revisó y canalizó la solicitud',
      estado: 'Asignada',
      icono: 'usuario',
      detalles: 'La solicitud fue validada y aprobada para procesamiento',
    },
    {
      fecha: '2026-02-06 11:00',
      quien: 'Carlos López',
      rol: 'Técnico',
      accion: 'Inició el procesamiento',
      estado: 'En Proceso',
      icono: 'reloj',
      detalles: 'Equipo asignado: INV-ITO-001, Diagnóstico inicial realizado',
    },
  ],
}

const priorityColors = {
  Alta: 'bg-red-100 text-red-800',
  Media: 'bg-amber-100 text-amber-800',
  Baja: 'bg-green-100 text-green-800',
}

const stateColors = {
  Pendiente: 'bg-slate-100 text-slate-800',
  Asignada: 'bg-blue-100 text-blue-800',
  'En Proceso': 'bg-amber-100 text-amber-800',
  Resuelto: 'bg-green-100 text-green-800',
  Cerrada: 'bg-slate-600 text-white',
  Pausa: 'bg-orange-100 text-orange-800',
  Rechazada: 'bg-red-100 text-red-800',
}

const TicketDetailPage = ({ params }: { params: { id: string } }) => {
  const [ticket] = useState(mockTicket)
  const router = useRouter()

  const handleGoBack = () => {
    router.push('/solicitudes')
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-2 py-4 sm:px-4 md:px-6 lg:px-8 lg:py-8">
        {/* Back Button and Title Section */}
        <div className="mb-6 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Volver al listado</span>
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              Detalles de la Solicitud
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Visualiza el estado y detalles de tu solicitud de soporte técnico
            </p>
          </div>
        </div>

        {/* Main Content */}
        {/* Ticket Info and Badges Card - First */}
        <Card className="w-full border mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">{ticket.folio}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{ticket.departamento}</p>
              </div>

              {/* Status and Priority Badges - Vertical Column */}
              <div className="flex flex-col gap-2">
                <Badge className={stateColors[ticket.estado as keyof typeof stateColors]}>
                  {ticket.estado}
                </Badge>
                <Badge className={priorityColors[ticket.prioridad as keyof typeof priorityColors]}>
                  Prioridad {ticket.prioridad}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stepper - Full Width at Top (Hidden on Mobile) - Second */}
        <div className="mb-6 hidden md:block">
          <TicketStepper currentState={ticket.estado as any} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Histórico de Cambios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 grid-cols-[auto_1fr] sm:gap-6">
                  {/* Timeline and Icons Column */}
                  <div className="flex flex-col items-center">
                    {ticket.expediente.map((evento, idx) => {
                      const isLastItem = idx === ticket.expediente.length - 1

                      // Get icon based on type
                      const getIcon = () => {
                        if (evento.icono === 'documento') {
                          return <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                        } else if (evento.icono === 'usuario') {
                          return <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                        } else if (evento.icono === 'reloj') {
                          return <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
                        }
                      }

                      // Get icon background color
                      const getIconBgColor = () => {
                        if (evento.icono === 'documento') {
                          return 'bg-blue-100'
                        } else if (evento.icono === 'usuario') {
                          return 'bg-blue-100'
                        } else if (evento.icono === 'reloj') {
                          return 'bg-amber-100'
                        }
                      }

                      return (
                        <React.Fragment key={idx}>
                          {/* Icon circle */}
                          <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full ${getIconBgColor()} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            {getIcon()}
                          </div>

                          {/* Timeline line - connects to next icon */}
                          {!isLastItem && (
                            <div className="w-px bg-slate-200 flex-1 min-h-12 sm:min-h-16" />
                          )}
                        </React.Fragment>
                      )
                    })}
                  </div>

                  {/* Information Column */}
                  <div className="space-y-4 sm:space-y-6 sm:pl-4">
                    {ticket.expediente.map((evento, idx) => (
                      <div key={idx} className="pt-0.5">
                        <h3 className="text-xs font-semibold text-foreground uppercase leading-tight break-words mb-2">
                          {evento.estado}
                        </h3>

                        <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 break-words">
                          <span className="font-medium text-foreground">{evento.quien}</span>
                          <span className="mx-1">•</span>
                          <span>{evento.rol}</span>
                        </p>

                        <p className="text-xs sm:text-sm text-muted-foreground break-words">
                          {evento.fecha}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Información del Solicitante */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Solicitante</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Nombre</p>
                    <p className="text-sm font-medium text-foreground mt-1">{ticket.nombreAfectado}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Departamento</p>
                    <p className="text-sm font-medium text-foreground mt-1">{ticket.departamento}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Correo</p>
                    <p className="text-sm font-medium text-blue-600 mt-1">{ticket.correoContacto}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detalles del Problema */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles del Problema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Tipo de Problema</p>
                  <p className="text-sm font-medium text-foreground mt-1">{ticket.tipoProblema}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Descripción</p>
                  <p className="text-sm text-foreground leading-relaxed">{ticket.descripcion}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Fotografía o Evidencia</p>
                  {ticket.fotografias && ticket.fotografias.length > 0 ? (
                    <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
                      {ticket.fotografias.map((foto, idx) => (
                        <div key={idx} className="rounded-lg border overflow-hidden bg-slate-50">
                          <img
                            src={foto || "/placeholder.svg"}
                            alt={`Evidencia ${idx + 1}`}
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                      <p className="text-sm text-muted-foreground">No hay fotografías adjuntas</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TicketDetailPage
