'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, ArrowLeft, AlertCircle, FileText, User, Clock } from 'lucide-react'
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
      fecha: '05/02/2026 14:45',
      quien: 'Carlos López',
      estadoAnterior: 'Asignada',
      estadoNuevo: 'En Proceso',
      justificacion: null,
    },
    {
      fecha: '04/02/2026 10:20',
      quien: 'Coordinador TI',
      estadoAnterior: 'Pendiente',
      estadoNuevo: 'Asignada',
      justificacion: null,
    },
    {
      fecha: '03/02/2026 10:30',
      quien: 'María González',
      estadoAnterior: null,
      estadoNuevo: 'Pendiente',
      justificacion: null,
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
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-base">Histórico de Cambios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ticket.expediente.map((evento, idx) => {
                      const isExceptional = evento.estadoNuevo === 'Pausa' || evento.estadoNuevo === 'Rechazada'
                      const isLastItem = idx === ticket.expediente.length - 1

                      return (
                        <div key={idx} className="relative">
                          {/* Timeline connector line */}
                          {!isLastItem && (
                            <div className="absolute left-4 top-10 h-6 w-0.5 bg-slate-200" />
                          )}

                          {/* Timeline item */}
                          <div className="flex gap-3">
                            {/* Timeline dot */}
                            <div className={`flex-shrink-0 mt-1 h-2 w-2 rounded-full ${
                              isExceptional
                                ? 'bg-red-500'
                                : 'bg-blue-500'
                            }`} />

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-600">{evento.fecha}</p>
                              
                              <div className="mt-1 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  {evento.estadoAnterior && (
                                    <span className="text-sm font-medium text-foreground">
                                      {evento.estadoAnterior} →
                                    </span>
                                  )}
                                  <Badge variant="secondary" className={`${
                                    evento.estadoNuevo === 'Pausa' && 'bg-orange-100 text-orange-800'
                                  } ${
                                    evento.estadoNuevo === 'Rechazada' && 'bg-red-100 text-red-800'
                                  }`}>
                                    {evento.estadoNuevo}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">Por: {evento.quien}</p>
                              </div>

                              {/* Justification block for Pausa or Rechazada */}
                              {isExceptional && evento.justificacion && (
                                <div className={`mt-3 p-3 rounded-lg border-l-4 flex gap-2 ${
                                  evento.estadoNuevo === 'Pausa'
                                    ? 'bg-orange-50 border-orange-400'
                                    : 'bg-red-50 border-red-400'
                                }`}>
                                  <AlertCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                                    evento.estadoNuevo === 'Pausa'
                                      ? 'text-orange-600'
                                      : 'text-red-600'
                                  }`} />
                                  <p className={`text-xs ${
                                    evento.estadoNuevo === 'Pausa'
                                      ? 'text-orange-900'
                                      : 'text-red-900'
                                  }`}>
                                    {evento.justificacion}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
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
    </div>
  )
}

export default TicketDetailPage
