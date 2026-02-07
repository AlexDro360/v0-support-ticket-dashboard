'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronRight, Clock } from 'lucide-react'
import Link from 'next/link'

interface Ticket {
  id: string
  folio: string
  areaSolicitante: string
  estado: 'Pendiente' | 'Asignada' | 'En Proceso' | 'Resuelta' | 'Pausa' | 'Rechazada'
  prioridad: 'Alta' | 'Media' | 'Baja'
  tipoProblema: string
  tiempoEnEstado: number // en horas
  fechaCreacion: string
  solicitante: string
}

// Mock data
const mockTickets: Ticket[] = [
  {
    id: '1',
    folio: '#TK-2026-001',
    areaSolicitante: 'Dirección',
    estado: 'Pendiente',
    prioridad: 'Alta',
    tipoProblema: 'Hardware',
    tiempoEnEstado: 3,
    fechaCreacion: '2026-02-06',
    solicitante: 'Juan Pérez',
  },
  {
    id: '2',
    folio: '#TK-2026-002',
    areaSolicitante: 'Docencia',
    estado: 'Asignada',
    prioridad: 'Media',
    tipoProblema: 'Software',
    tiempoEnEstado: 5,
    fechaCreacion: '2026-02-05',
    solicitante: 'María García',
  },
  {
    id: '3',
    folio: '#TK-2026-003',
    areaSolicitante: 'Administración',
    estado: 'En Proceso',
    prioridad: 'Media',
    tipoProblema: 'Red',
    tiempoEnEstado: 2,
    fechaCreacion: '2026-02-04',
    solicitante: 'Carlos López',
  },
  {
    id: '4',
    folio: '#TK-2026-004',
    areaSolicitante: 'Biblioteca',
    estado: 'Resuelta',
    prioridad: 'Baja',
    tipoProblema: 'Software',
    tiempoEnEstado: 12,
    fechaCreacion: '2026-02-03',
    solicitante: 'Ana Martínez',
  },
]

const estadoBadgeConfig = {
  Pendiente: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300' },
  Asignada: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  'En Proceso': { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  Resuelta: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  Pausa: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
  Rechazada: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
}

const prioridadBadgeConfig = {
  Alta: { bg: 'bg-red-100', text: 'text-red-800' },
  Media: { bg: 'bg-amber-100', text: 'text-amber-800' },
  Baja: { bg: 'bg-blue-100', text: 'text-blue-800' },
}

export function TicketDashboard({ viewMode }: { viewMode: 'list' | 'kanban' }) {
  const [departmentFilter, setDepartmentFilter] = useState('todos')
  const [tipoProblemaFilter, setTipoProblemaFilter] = useState('todos')

  const filteredTickets = mockTickets.filter((ticket) => {
    const deptMatch =
      departmentFilter === 'todos' ||
      ticket.areaSolicitante
        .toLowerCase()
        .includes(departmentFilter.toLowerCase())
    const typeMatch =
      tipoProblemaFilter === 'todos' ||
      ticket.tipoProblema
        .toLowerCase()
        .includes(tipoProblemaFilter.toLowerCase())
    return deptMatch && typeMatch
  })

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Filtrar por departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los Departamentos</SelectItem>
            <SelectItem value="Dirección">Dirección</SelectItem>
            <SelectItem value="Docencia">Docencia</SelectItem>
            <SelectItem value="Administración">Administración</SelectItem>
            <SelectItem value="Biblioteca">Biblioteca</SelectItem>
          </SelectContent>
        </Select>

        <Select value={tipoProblemaFilter} onValueChange={setTipoProblemaFilter}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los Tipos</SelectItem>
            <SelectItem value="Hardware">Hardware</SelectItem>
            <SelectItem value="Software">Software</SelectItem>
            <SelectItem value="Red">Red</SelectItem>
            <SelectItem value="Telefonía">Telefonía</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vista Lista */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredTickets.map((ticket) => (
            <Link key={ticket.id} href={`/gestion-solicitudes/${ticket.id}`}>
              <Card className="cursor-pointer hover:shadow-md hover:border-slate-300 transition-all">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{ticket.folio}</h3>
                        <Badge
                          variant="outline"
                          className={`${estadoBadgeConfig[ticket.estado].bg} ${estadoBadgeConfig[ticket.estado].text} ${estadoBadgeConfig[ticket.estado].border} border`}
                        >
                          {ticket.estado}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={`${prioridadBadgeConfig[ticket.prioridad].bg} ${prioridadBadgeConfig[ticket.prioridad].text}`}
                        >
                          {ticket.prioridad}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {ticket.solicitante} • {ticket.areaSolicitante}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {ticket.tipoProblema}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {ticket.tiempoEnEstado}h
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {filteredTickets.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No se encontraron solicitudes</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Vista Kanban */}
      {viewMode === 'kanban' && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {['Pendiente', 'Asignada', 'En Proceso', 'Pausa', 'Resuelta', 'Rechazada'].map(
            (estado) => (
              <Card key={estado} className="bg-muted/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    {estado}
                    <Badge variant="secondary" className="ml-auto">
                      {filteredTickets.filter((t) => t.estado === estado).length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {filteredTickets
                    .filter((t) => t.estado === estado)
                    .map((ticket) => (
                      <Link
                        key={ticket.id}
                        href={`/gestion-solicitudes/${ticket.id}`}
                      >
                        <Card className="p-3 cursor-pointer hover:shadow-md transition-shadow bg-white">
                          <p className="text-xs font-semibold text-foreground">
                            {ticket.folio}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {ticket.solicitante}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline" className="text-xs">
                              {ticket.prioridad}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {ticket.tiempoEnEstado}h
                            </span>
                          </div>
                        </Card>
                      </Link>
                    ))}
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  )
}
