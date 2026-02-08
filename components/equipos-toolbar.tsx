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
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por No. Inventario o Responsable..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {/* Tipo de Equipo Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Tipo de Equipo
          </label>
          <Select value={tipoEquipo} onValueChange={onTipoEquipoChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {TIPOS_EQUIPO.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Departamento Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Departamento
          </label>
          <Select value={departamento} onValueChange={onDepartamentoChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {DEPARTAMENTOS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Acciones
          </label>
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground"
            onClick={() => {}}
          >
            <Sliders className="h-4 w-4 mr-2" />
            Más filtros
          </Button>
        </div>
      </div>
    </div>
  )
}
