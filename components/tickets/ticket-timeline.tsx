'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AlertCircle, CheckCircle2, Clock, User, FileText } from 'lucide-react'

interface TimelineEntry {
  id: string
  timestamp: string
  user: string
  role: string
  action: string
  estado: string
  justificacion?: string
  detalles?: string
  tipo: 'creacion' | 'asignacion' | 'proceso' | 'resolucion' | 'pausa' | 'rechazo' | 'cierre'
}

interface TicketTimelineProps {
  ticketId: string
  entries?: TimelineEntry[]
}

// Mock timeline data - This can be populated from props or API
const defaultMockTimeline: TimelineEntry[] = [
  {
    id: '1',
    timestamp: '2026-02-06 10:30',
    user: 'Juan Pérez',
    role: 'Solicitante',
    action: 'Creó la solicitud de soporte',
    estado: 'Pendiente',
    detalles: 'Tipo: Hardware, Prioridad: Alta',
    tipo: 'creacion',
  },
  {
    id: '2',
    timestamp: '2026-02-06 10:45',
    user: 'Coordinador TI',
    role: 'Administrador',
    action: 'Revisó y canalizó la solicitud',
    estado: 'Asignada',
    detalles: 'La solicitud fue validada y aprobada para procesamiento',
    tipo: 'asignacion',
  },
  {
    id: '3',
    timestamp: '2026-02-06 11:00',
    user: 'Carlos López',
    role: 'Técnico',
    action: 'Inició el procesamiento',
    estado: 'En Proceso',
    detalles: 'Equipo asignado: INV-ITO-001, Diagnóstico inicial realizado',
    tipo: 'proceso',
  },
]

const estadoColorMap = {
  Pendiente: 'bg-slate-100 text-slate-800',
  Asignada: 'bg-blue-100 text-blue-800',
  'En Proceso': 'bg-amber-100 text-amber-800',
  Resuelta: 'bg-green-100 text-green-800',
  Pausa: 'bg-orange-100 text-orange-800',
  Rechazada: 'bg-red-100 text-red-800',
  Cerrada: 'bg-slate-600 text-white',
}

const getIconForType = (tipo: TimelineEntry['tipo']) => {
  switch (tipo) {
    case 'creacion':
      return <FileText className="h-4 w-4" />
    case 'asignacion':
      return <User className="h-4 w-4" />
    case 'proceso':
      return <Clock className="h-4 w-4" />
    case 'resolucion':
      return <CheckCircle2 className="h-4 w-4" />
    case 'pausa':
      return <Clock className="h-4 w-4" />
    case 'rechazo':
      return <AlertCircle className="h-4 w-4" />
    case 'cierre':
      return <CheckCircle2 className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

const getBackgroundColor = (tipo: TimelineEntry['tipo']) => {
  switch (tipo) {
    case 'creacion':
      return 'bg-blue-100'
    case 'asignacion':
      return 'bg-blue-100'
    case 'proceso':
      return 'bg-amber-100'
    case 'resolucion':
      return 'bg-green-100'
    case 'pausa':
      return 'bg-orange-100'
    case 'rechazo':
      return 'bg-red-100'
    case 'cierre':
      return 'bg-slate-100'
    default:
      return 'bg-slate-100'
  }
}

const getTextColor = (tipo: TimelineEntry['tipo']) => {
  switch (tipo) {
    case 'creacion':
      return 'text-blue-600'
    case 'asignacion':
      return 'text-blue-600'
    case 'proceso':
      return 'text-amber-600'
    case 'resolucion':
      return 'text-green-600'
    case 'pausa':
      return 'text-orange-600'
    case 'rechazo':
      return 'text-red-600'
    case 'cierre':
      return 'text-slate-600'
    default:
      return 'text-slate-600'
  }
}

export function TicketTimeline({ ticketId, entries }: TicketTimelineProps) {
  const timelineEntries = entries || defaultMockTimeline

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Histórico de Cambios</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {timelineEntries.map((entry, index) => (
              <div key={entry.id} className="relative">
                {/* Timeline connector */}
                {index < timelineEntries.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-slate-200" />
                )}

                {/* Timeline item */}
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 relative z-10">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${getBackgroundColor(entry.tipo)}`}
                    >
                      <div className={getTextColor(entry.tipo)}>
                        {getIconForType(entry.tipo)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">
                          {entry.action}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="font-medium">{entry.user}</span>
                          {' • '}
                          <span>{entry.role}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry.timestamp}
                        </p>
                      </div>
                      <Badge
                        className={`flex-shrink-0 ${estadoColorMap[entry.estado as keyof typeof estadoColorMap]}`}
                      >
                        {entry.estado}
                      </Badge>
                    </div>

                    {/* Detalles adicionales */}
                    {entry.detalles && (
                      <p className="text-xs text-muted-foreground mt-2 bg-muted/50 p-2 rounded">
                        {entry.detalles}
                      </p>
                    )}

                    {/* Justificación si existe */}
                    {entry.justificacion && (
                      <div
                        className={`mt-3 p-3 rounded text-xs border ${
                          entry.tipo === 'pausa'
                            ? 'bg-orange-50 border-orange-200 text-orange-900'
                            : entry.tipo === 'rechazo'
                              ? 'bg-red-50 border-red-200 text-red-900'
                              : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <p className="font-semibold mb-1">
                          {entry.tipo === 'pausa'
                            ? 'Motivo de la Pausa:'
                            : entry.tipo === 'rechazo'
                              ? 'Justificación del Rechazo:'
                              : 'Nota:'}
                        </p>
                        <p>{entry.justificacion}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {timelineEntries.length === 0 && (
              <div className="flex items-center justify-center h-32 text-center">
                <p className="text-sm text-muted-foreground">
                  No hay cambios registrados aún
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

