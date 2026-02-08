'use client'

import { Package, Laptop, Printer, Wifi, Calendar, MapPin, User, HardDrive, Cpu, Monitor, Database } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface EquipoData {
  id: string
  numeroInventario: string
  tipoEquipo: 'computo' | 'impresora' | 'redes'
  marca: string
  modelo: string
  responsable: string
  descripcion: string
  estado: string
  fechaAdquisicion: string
  ubicacion: string
  ramGB?: string
  procesador?: string
  sistemaOperativo?: string
  capacidadAlmacenamiento?: string
  tipoAlmacenamiento?: string
  tipoImpresion?: string
  modeloToner?: string
  numeroPuertos?: string
  tipoRed?: string
  numeroSerie: string
  garantiaHasta: string
}

interface FichaTecnicaEquipoProps {
  equipo: EquipoData
}

// Componente para badges de estado
function EstadoBadge({ estado }: { estado: string }) {
  const estadoConfig: Record<string, { class: string }> = {
    Activo: { class: 'bg-green-100 text-green-800' },
    Inactivo: { class: 'bg-gray-100 text-gray-800' },
    Mantenimiento: { class: 'bg-blue-100 text-blue-800' },
    Baja: { class: 'bg-red-100 text-red-800' },
  }

  const config = estadoConfig[estado] || estadoConfig.Inactivo

  return (
    <Badge variant="secondary" className={config.class}>
      {estado}
    </Badge>
  )
}

// Componente para badge de tipo de equipo
function TipoEquipoBadge({ tipo }: { tipo: string }) {
  const tipoConfig: Record<string, { label: string; icon: React.ReactNode }> = {
    computo: { label: 'Cómputo', icon: <Laptop className="h-3 w-3" /> },
    impresora: { label: 'Impresora', icon: <Printer className="h-3 w-3" /> },
    redes: { label: 'Redes', icon: <Wifi className="h-3 w-3" /> },
  }

  const config = tipoConfig[tipo] || tipoConfig.computo

  return (
    <Badge variant="outline" className="gap-1">
      {config.icon}
      {config.label}
    </Badge>
  )
}

// Componente para campos de detalle
function CampoDetalle({ 
  icono, 
  label, 
  valor 
}: { 
  icono: React.ReactNode
  label: string
  valor: string | undefined 
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        {icono}
        {label}
      </p>
      <p className="font-medium text-foreground text-sm">{valor || '-'}</p>
    </div>
  )
}

// Componente para sección de especificaciones de cómputo
function EspecificacionesComputo({ equipo }: { equipo: EquipoData }) {
  return (
    <Card className="border-0 shadow-sm">
      <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-base font-semibold text-foreground sm:text-lg flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          Especificaciones Técnicas - Cómputo
        </h2>
      </div>
      <CardContent className="p-4 sm:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <CampoDetalle
            icono={<Cpu className="h-4 w-4 text-muted-foreground" />}
            label="Procesador"
            valor={equipo.procesador}
          />
          <CampoDetalle
            icono={<Database className="h-4 w-4 text-muted-foreground" />}
            label="RAM"
            valor={equipo.ramGB ? `${equipo.ramGB} GB` : undefined}
          />
          <CampoDetalle
            icono={<Monitor className="h-4 w-4 text-muted-foreground" />}
            label="Sistema Operativo"
            valor={equipo.sistemaOperativo}
          />
          <CampoDetalle
            icono={<HardDrive className="h-4 w-4 text-muted-foreground" />}
            label="Almacenamiento"
            valor={equipo.capacidadAlmacenamiento}
          />
          <CampoDetalle
            icono={<Database className="h-4 w-4 text-muted-foreground" />}
            label="Tipo de Almacenamiento"
            valor={equipo.tipoAlmacenamiento}
          />
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para especificaciones de impresora
function EspecificacionesImpresora({ equipo }: { equipo: EquipoData }) {
  return (
    <Card className="border-0 shadow-sm">
      <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-base font-semibold text-foreground sm:text-lg flex items-center gap-2">
          <Printer className="h-5 w-5" />
          Especificaciones Técnicas - Impresora
        </h2>
      </div>
      <CardContent className="p-4 sm:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <CampoDetalle
            icono={<Printer className="h-4 w-4 text-muted-foreground" />}
            label="Tipo de Impresión"
            valor={equipo.tipoImpresion}
          />
          <CampoDetalle
            icono={<Database className="h-4 w-4 text-muted-foreground" />}
            label="Modelo de Tóner"
            valor={equipo.modeloToner}
          />
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para especificaciones de redes
function EspecificacionesRedes({ equipo }: { equipo: EquipoData }) {
  return (
    <Card className="border-0 shadow-sm">
      <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-base font-semibold text-foreground sm:text-lg flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          Especificaciones Técnicas - Redes
        </h2>
      </div>
      <CardContent className="p-4 sm:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <CampoDetalle
            icono={<Wifi className="h-4 w-4 text-muted-foreground" />}
            label="Número de Puertos"
            valor={equipo.numeroPuertos}
          />
          <CampoDetalle
            icono={<Wifi className="h-4 w-4 text-muted-foreground" />}
            label="Tipo de Red"
            valor={equipo.tipoRed}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export function FichaTecnicaEquipo({ equipo }: FichaTecnicaEquipoProps) {
  const formatearFecha = (fecha: string) => {
    try {
      return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return fecha
    }
  }

  return (
    <div className="space-y-6">
      {/* Card 1: Información General */}
      <Card className="border-0 shadow-sm">
        <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="text-base font-semibold text-foreground sm:text-lg flex items-center gap-2">
            <Package className="h-5 w-5" />
            Información General
          </h2>
        </div>
        <CardContent className="p-4 sm:p-6">
          <div className="grid gap-6">
            {/* Primera fila */}
            <div className="grid gap-4 md:grid-cols-2">
              <CampoDetalle
                icono={<Database className="h-4 w-4 text-muted-foreground" />}
                label="Número de Inventario"
                valor={equipo.numeroInventario}
              />
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  Tipo de Equipo
                </p>
                <TipoEquipoBadge tipo={equipo.tipoEquipo} />
              </div>
            </div>

            {/* Segunda fila */}
            <div className="grid gap-4 md:grid-cols-3">
              <CampoDetalle
                icono={<Package className="h-4 w-4 text-muted-foreground" />}
                label="Marca"
                valor={equipo.marca}
              />
              <CampoDetalle
                icono={<Monitor className="h-4 w-4 text-muted-foreground" />}
                label="Modelo"
                valor={equipo.modelo}
              />
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  Estado
                </div>
                <div>
                  <EstadoBadge estado={equipo.estado} />
                </div>
              </div>
            </div>
            </div>

            {/* Tercera fila */}
            <div className="grid gap-4 md:grid-cols-2">
              <CampoDetalle
                icono={<User className="h-4 w-4 text-muted-foreground" />}
                label="Responsable"
                valor={equipo.responsable}
              />
              <CampoDetalle
                icono={<MapPin className="h-4 w-4 text-muted-foreground" />}
                label="Ubicación"
                valor={equipo.ubicacion}
              />
            </div>

            {/* Descripción */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Descripción</p>
              <p className="text-sm text-foreground leading-relaxed bg-muted/50 p-3 rounded-md">
                {equipo.descripcion}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Información de Adquisición */}
      <Card className="border-0 shadow-sm">
        <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="text-base font-semibold text-foreground sm:text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Información de Adquisición
          </h2>
        </div>
        <CardContent className="p-4 sm:p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <CampoDetalle
              icono={<Calendar className="h-4 w-4 text-muted-foreground" />}
              label="Fecha de Adquisición"
              valor={formatearFecha(equipo.fechaAdquisicion)}
            />
            <CampoDetalle
              icono={<Calendar className="h-4 w-4 text-muted-foreground" />}
              label="Garantía Hasta"
              valor={formatearFecha(equipo.garantiaHasta)}
            />
            <CampoDetalle
              icono={<Database className="h-4 w-4 text-muted-foreground" />}
              label="Número de Serie"
              valor={equipo.numeroSerie}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Especificaciones Técnicas (Dinámico según tipo) */}
      {equipo.tipoEquipo === 'computo' && <EspecificacionesComputo equipo={equipo} />}
      {equipo.tipoEquipo === 'impresora' && <EspecificacionesImpresora equipo={equipo} />}
      {equipo.tipoEquipo === 'redes' && <EspecificacionesRedes equipo={equipo} />}
    </div>
  )
}
