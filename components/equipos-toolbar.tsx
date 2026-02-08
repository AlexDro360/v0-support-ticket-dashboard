'use client'

import { Search, Sliders } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const TIPOS_EQUIPO = ['Computadora', 'Impresora', 'Switch']
const DEPARTAMENTOS = [
  'Centro de Cómputo',
  'Dirección',
  'Subdirección Académica',
  'Subdirección Administrativa',
  'Recursos Humanos',
  'Biblioteca',
  'Laboratorios',
  'Subdirección de Planeación',
]

interface EquiposToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  tipoEquipo: string
  onTipoEquipoChange: (value: string) => void
  departamento: string
  onDepartamentoChange: (value: string) => void
}

export function EquiposToolbar({
  searchQuery,
  onSearchChange,
  tipoEquipo,
  onTipoEquipoChange,
  departamento,
  onDepartamentoChange,
}: EquiposToolbarProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por No. Inventario o Responsable..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter row - Full width */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
        {/* Filter label with icon */}
        <div className="flex items-center gap-2 shrink-0">
          <Sliders className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filtros:</span>
        </div>

        {/* Filter selects - Equal width and full width on mobile */}
        <Select value={tipoEquipo} onValueChange={onTipoEquipoChange}>
          <SelectTrigger className="w-full bg-card sm:flex-1">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los tipos</SelectItem>
            {TIPOS_EQUIPO.map((tipo) => (
              <SelectItem key={tipo} value={tipo}>
                {tipo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={departamento} onValueChange={onDepartamentoChange}>
          <SelectTrigger className="w-full bg-card sm:flex-1">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los departamentos</SelectItem>
            {DEPARTAMENTOS.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
