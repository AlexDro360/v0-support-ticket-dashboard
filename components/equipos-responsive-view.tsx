'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Monitor, Printer, Wifi, MoreVertical, Eye, Edit2, Trash2, Power } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { ConfirmarBajaEquipoDialog } from '@/components/confirmar-baja-equipo-dialog'

export interface Equipo {
  id: string
  numeroInventario: string
  tipoEquipo: string
  marca: string
  modelo: string
  ubicacion: string
  responsable: string
  departamento: string
  estado: 'Activo' | 'Baja'
}

interface EquiposResponsiveViewProps {
  equipos: Equipo[]
}

function getEquipoIcon(tipoEquipo: string) {
  switch (tipoEquipo.toLowerCase()) {
    case 'computadora':
      return <Monitor className="h-4 w-4" />
    case 'impresora':
      return <Printer className="h-4 w-4" />
    case 'switch':
    case 'router':
    case 'redes':
      return <Wifi className="h-4 w-4" />
    default:
      return <Monitor className="h-4 w-4" />
  }
}

export function EquiposResponsiveView({ equipos }: EquiposResponsiveViewProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipo | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleBajaClick = (equipo: Equipo) => {
    setEquipoSeleccionado(equipo)
    setDialogOpen(true)
  }

  const handleConfirmarBaja = async () => {
    setIsLoading(true)
    try {
      console.log('[v0] Confirming baja for equipment:', equipoSeleccionado?.id)
      // Simular envío de la baja
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('[v0] Baja completada exitosamente')
      setDialogOpen(false)
      // Aquí irá la lógica para actualizar la tabla
    } catch (error) {
      console.error('[v0] Error al dar de baja:', error)
    } finally {
      setIsLoading(false)
    }
  }
  if (equipos.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-muted-foreground/25 bg-muted/30 p-8 text-center">
        <p className="text-sm text-muted-foreground">No hay equipos que mostrar</p>
      </div>
    )
  }

  return (
    <>
      <ConfirmarBajaEquipoDialog
        open={dialogOpen}
        equipo={equipoSeleccionado}
        isLoading={isLoading}
        onConfirm={handleConfirmarBaja}
        onOpenChange={setDialogOpen}
      />

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader className="bg-muted/50 hover:bg-muted/50">
            <TableRow>
              <TableHead className="text-xs font-semibold text-foreground sm:text-sm">No. Inventario</TableHead>
              <TableHead className="text-xs font-semibold text-foreground sm:text-sm">Tipo de Equipo</TableHead>
              <TableHead className="text-xs font-semibold text-foreground sm:text-sm">Detalle del Equipo</TableHead>
              <TableHead className="text-xs font-semibold text-foreground sm:text-sm">Responsable</TableHead>
              <TableHead className="text-xs font-semibold text-foreground sm:text-sm">Estado</TableHead>
              <TableHead className="text-xs font-semibold text-foreground text-right sm:text-sm">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipos.map((equipo) => (
              <TableRow key={equipo.id} className="hover:bg-muted/50">
                <TableCell className="text-xs font-medium text-primary sm:text-sm">
                  {equipo.numeroInventario}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getEquipoIcon(equipo.tipoEquipo)}
                    <span className="text-sm">{equipo.tipoEquipo}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="font-medium">{equipo.marca} - {equipo.modelo}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="font-medium">{equipo.responsable}</p>
                    <p className="text-xs text-muted-foreground">{equipo.departamento}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        equipo.estado === 'Activo' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-sm">{equipo.estado}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Ficha Técnica
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/inventarios/equipos/${equipo.id}`} className="cursor-pointer">
                          <Edit2 className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleBajaClick(equipo)}>
                        <Power className="h-4 w-4 mr-2" />
                        Baja
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {equipos.map((equipo) => (
          <Card key={equipo.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="secondary" className="font-mono text-xs">
                    {equipo.numeroInventario}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Ficha Técnica
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/inventarios/equipos/${equipo.id}`} className="cursor-pointer">
                          <Edit2 className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleBajaClick(equipo)}>
                        <Power className="h-4 w-4 mr-2" />
                        Baja
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Tipo y Detalle */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getEquipoIcon(equipo.tipoEquipo)}
                    <span className="text-sm font-medium">{equipo.tipoEquipo}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {equipo.marca} - {equipo.modelo}
                  </p>
                </div>

                {/* Responsable */}
                <div className="space-y-1 border-t pt-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Responsable
                  </p>
                  <p className="text-sm font-medium">{equipo.responsable}</p>
                  <p className="text-xs text-muted-foreground">{equipo.departamento}</p>
                </div>

                {/* Estado */}
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      equipo.estado === 'Activo' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-sm">{equipo.estado}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
