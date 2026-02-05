"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Plus } from "lucide-react"
import Link from "next/link"

interface TicketsToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  prioridad: string
  onPrioridadChange: (value: string) => void
  departamento: string
  onDepartamentoChange: (value: string) => void
  estado: string
  onEstadoChange: (value: string) => void
}

const departamentos = [
  "Centro de Cómputo",
  "Recursos Humanos",
  "Subdirección Académica",
  "Subdirección de Planeación",
  "Subdirección Administrativa",
  "Dirección",
  "Biblioteca",
  "Laboratorios",
]

export function TicketsToolbar({
  searchQuery,
  onSearchChange,
  prioridad,
  onPrioridadChange,
  departamento,
  onDepartamentoChange,
  estado,
  onEstadoChange,
}: TicketsToolbarProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Top row: Search + Nueva Solicitud */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por Folio o Nombre del Afectado..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Link href="/soporte/nueva-solicitud">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Solicitud
          </Button>
        </Link>
      </div>

      {/* Filter row */}
      <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4 sm:flex-row sm:items-center sm:flex-wrap">
        <span className="text-sm font-medium text-muted-foreground">Filtrar por:</span>

        <Select value={prioridad} onValueChange={onPrioridadChange}>
          <SelectTrigger className="w-full bg-card sm:w-[140px]">
            <SelectValue placeholder="Prioridad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las prioridades</SelectItem>
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Media">Media</SelectItem>
            <SelectItem value="Baja">Baja</SelectItem>
          </SelectContent>
        </Select>

        <Select value={departamento} onValueChange={onDepartamentoChange}>
          <SelectTrigger className="w-full bg-card sm:w-[200px]">
            <SelectValue placeholder="Departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los departamentos</SelectItem>
            {departamentos.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={estado} onValueChange={onEstadoChange}>
          <SelectTrigger className="w-full bg-card sm:w-[160px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="En Proceso">En Proceso</SelectItem>
            <SelectItem value="Resuelto">Resuelto</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
