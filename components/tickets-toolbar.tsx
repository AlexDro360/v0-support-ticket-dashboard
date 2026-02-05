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
import { Search, Plus, SlidersHorizontal } from "lucide-react"

interface TicketsToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  prioridad: string
  onPrioridadChange: (value: string) => void
  departamento: string
  onDepartamentoChange: (value: string) => void
  estado: string
  onEstadoChange: (value: string) => void
  filtersOpen: boolean
  onToggleFilters: () => void
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
  filtersOpen,
  onToggleFilters,
}: TicketsToolbarProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Top row: Search + Filtros button + Nueva Solicitud */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por Folio o Nombre del Afectado..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onToggleFilters}
            className={filtersOpen ? "border-primary text-primary" : ""}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtros
          </Button>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Solicitud
          </Button>
        </div>
      </div>

      {/* Collapsible filter row */}
      {filtersOpen && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-muted/30 p-4 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <span className="text-sm font-medium text-muted-foreground">Filtrar por:</span>

          <Select value={prioridad} onValueChange={onPrioridadChange}>
            <SelectTrigger className="w-[140px] bg-card">
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
            <SelectTrigger className="w-[200px] bg-card">
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
            <SelectTrigger className="w-[160px] bg-card">
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
      )}
    </div>
  )
}
