'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, ArrowLeft } from 'lucide-react'
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
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/solicitudes" className="text-blue-600 hover:text-blue-700">
              Solicitudes
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="font-medium text-foreground">{ticket.folio}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleGoBack}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver
                </Button>
              </div>
              <h1 className="text-2xl font-bold text-foreground">{ticket.folio}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{ticket.departamento}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className={stateColors[ticket.estado as keyof typeof stateColors]}>
                  {ticket.estado}
                </Badge>
                <Badge className={priorityColors[ticket.prioridad as keyof typeof priorityColors]}>
                  Prioridad {ticket.prioridad}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Creado: {ticket.fecha}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Stepper - Full Width at Top (Hidden on Mobile) */}
        <div className="mb-6 hidden md:block">
          <TicketStepper currentState={ticket.estado as any} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-base">Información Rápida</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Técnico Asignado</p>
                  <p className="text-sm font-medium text-foreground mt-1">{ticket.asignadoA}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Tiempo Transcurrido</p>
                  <p className="text-sm font-medium text-foreground mt-1">{ticket.tiempoTranscurrido}</p>
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

            {/* Información Técnica */}
            {ticket.estado !== 'Pendiente' && (
              <Card>
                <CardHeader>
                  <CardTitle>Información Técnica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Asignado a</p>
                    <p className="text-sm font-medium text-foreground mt-1">{ticket.asignadoA}</p>
                  </div>
                  {ticket.diagnostico && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Diagnóstico</p>
                        <p className="text-sm text-foreground leading-relaxed">{ticket.diagnostico}</p>
                      </div>
                    </>
                  )}
                  {ticket.materialesUsados.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Materiales Utilizados</p>
                        <ul className="space-y-1">
                          {ticket.materialesUsados.map((material, idx) => (
                            <li key={idx} className="text-sm text-foreground">
                              • {material.nombre} (x{material.cantidad})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                  <Separator />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Tiempo Transcurrido</p>
                    <p className="text-sm font-medium text-foreground mt-1">{ticket.tiempoTranscurrido}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Timeline de Actualizaciones */}
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Cambios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ticket.actualizacionesRecientes.map((item, idx) => (
                    <div key={idx} className="flex gap-3 pb-3 last:pb-0">
                      <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-600">{item.fecha}</p>
                        <p className="text-sm text-foreground mt-0.5">{item.evento}</p>
                        <p className="text-xs text-muted-foreground">{item.usuario}</p>
                      </div>
                    </div>
                  ))}
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
