"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, UserPlus, CheckCircle } from "lucide-react"

export interface Ticket {
  id: string
  folio: string
  fecha: string
  nombreAfectado: string
  departamento: string
  equipo: string
  prioridad: "Alta" | "Media" | "Baja"
  estado: "Pendiente" | "En Proceso" | "Resuelto"
}

interface TicketsResponsiveViewProps {
  tickets: Ticket[]
}

const prioridadStyles: Record<string, string> = {
  Alta: "bg-red-100 text-red-700 hover:bg-red-100",
  Media: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  Baja: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
}

const estadoStyles: Record<string, string> = {
  Pendiente: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  "En Proceso": "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Resuelto: "bg-green-100 text-green-700 hover:bg-green-100",
}

function ActionMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="cursor-pointer">
          <Eye className="mr-2 h-4 w-4" />
          Ver Detalles
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <UserPlus className="mr-2 h-4 w-4" />
          Asignar Técnico
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-green-600 focus:text-green-600">
          <CheckCircle className="mr-2 h-4 w-4" />
          Cerrar Solicitud
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function TicketsResponsiveView({ tickets }: TicketsResponsiveViewProps) {
  return (
    <>
      {/* Desktop View - Table */}
      <div className="hidden md:block rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="text-xs font-semibold text-foreground sm:text-sm">Folio</TableHead>
                <TableHead className="text-xs font-semibold text-foreground sm:text-sm">Fecha</TableHead>
                <TableHead className="text-xs font-semibold text-foreground sm:text-sm">Nombre Afectado</TableHead>
                <TableHead className="text-xs font-semibold text-foreground sm:text-sm">Departamento</TableHead>
                <TableHead className="text-xs font-semibold text-foreground sm:text-sm">Prioridad</TableHead>
                <TableHead className="text-xs font-semibold text-foreground sm:text-sm">Estado</TableHead>
                <TableHead className="text-xs font-semibold text-foreground text-right sm:text-sm">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-xs text-muted-foreground sm:text-sm">
                    No se encontraron solicitudes.
                  </TableCell>
                </TableRow>
              ) : (
                tickets.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    className="transition-colors hover:bg-muted/50"
                  >
                    <TableCell className="text-xs font-medium text-primary sm:text-sm">{ticket.folio}</TableCell>
                    <TableCell className="text-xs text-muted-foreground sm:text-sm">{ticket.fecha}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{ticket.nombreAfectado}</TableCell>
                    <TableCell className="text-xs text-muted-foreground sm:text-sm">{ticket.departamento}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`${prioridadStyles[ticket.prioridad]} text-xs sm:text-sm`}>
                        {ticket.prioridad}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`${estadoStyles[ticket.estado]} text-xs sm:text-sm`}>
                        {ticket.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <ActionMenu />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="block md:hidden space-y-3">
        {tickets.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border bg-card text-center">
            <p className="text-sm text-muted-foreground">No se encontraron solicitudes.</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
            >
              {/* Top Row: Name + Date */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-semibold text-foreground text-sm flex-1">
                  {ticket.nombreAfectado}
                </h3>
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  {ticket.fecha}
                </p>
              </div>

              {/* Middle Row: Department + Folio */}
              <div className="mb-3">
                <p className="text-xs text-muted-foreground">
                  {ticket.departamento} - {ticket.folio}
                </p>
              </div>

              {/* Bottom Row: Badges + Actions */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  <Badge variant="secondary" className={`${prioridadStyles[ticket.prioridad]} text-xs`}>
                    {ticket.prioridad}
                  </Badge>
                  <Badge variant="secondary" className={`${estadoStyles[ticket.estado]} text-xs`}>
                    {ticket.estado}
                  </Badge>
                </div>
                <ActionMenu />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
