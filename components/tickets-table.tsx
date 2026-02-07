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
import Link from "next/link"

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

interface TicketsTableProps {
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

export function TicketsTable({ tickets }: TicketsTableProps) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-xs font-semibold text-foreground sm:text-sm">Folio</TableHead>
              <TableHead className="hidden text-xs font-semibold text-foreground sm:table-cell sm:text-sm">Fecha</TableHead>
              <TableHead className="text-xs font-semibold text-foreground sm:text-sm">Nombre Afectado</TableHead>
              <TableHead className="hidden text-xs font-semibold text-foreground md:table-cell md:text-sm">Departamento</TableHead>
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
                  className="transition-colors hover:bg-muted/50 cursor-pointer"
                  onClick={() => {
                    window.location.href = `/solicitudes/${ticket.id}`
                  }}
                >
                  <TableCell className="text-xs font-medium text-primary sm:text-sm">{ticket.folio}</TableCell>
                  <TableCell className="hidden text-xs text-muted-foreground sm:table-cell sm:text-sm">{ticket.fecha}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{ticket.nombreAfectado}</TableCell>
                  <TableCell className="hidden text-xs text-muted-foreground md:table-cell md:text-sm">{ticket.departamento}</TableCell>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <Link href={`/solicitudes/${ticket.id}`}>
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalles
                          </DropdownMenuItem>
                        </Link>
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
