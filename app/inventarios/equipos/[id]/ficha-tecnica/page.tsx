'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Power, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FichaTecnicaEquipo } from '@/components/ficha-tecnica-equipo'
import { ConfirmarBajaEquipoDialog } from '@/components/confirmar-baja-equipo-dialog'
import { ConfirmarEliminarEquipoDialog } from '@/components/confirmar-eliminar-equipo-dialog'

// Tipo para los datos del equipo
interface EquipoFichaTecnica {
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

// Función para cargar datos del equipo (actualmente retorna datos de ejemplo)
async function obtenerEquipo(id: string): Promise<EquipoFichaTecnica> {
  // TODO: Reemplazar con llamada a API real
  console.log('[v0] Loading equipment data for id:', id)
  
  // Datos de ejemplo - en producción estos vendrían de una API
  return {
    id,
    numeroInventario: 'ITO-2024-HP01',
    tipoEquipo: 'computo',
    marca: 'HP',
    modelo: 'ProDesk 400',
    responsable: 'Juan Pérez',
    descripcion: 'Equipo de escritorio ubicado en el Centro de Cómputo, utilizado para tareas administrativas y de soporte técnico.',
    estado: 'Activo',
    fechaAdquisicion: '2024-01-15',
    ubicacion: 'Centro de Cómputo - Oficina 102',
    ramGB: '16',
    procesador: 'Intel Core i7',
    sistemaOperativo: 'Windows 11 Pro',
    capacidadAlmacenamiento: '512 GB SSD',
    tipoAlmacenamiento: 'SSD',
    numeroSerie: 'CN-0FPKRK-63600-87K-A00-A00',
    garantiaHasta: '2025-01-15',
  }
}

// Componente para encabezado y acciones
function EncabezadoFicha({ 
  numeroInventario, 
  id,
  equipo
}: { 
  numeroInventario: string
  id: string
  equipo: EquipoFichaTecnica
}) {
  const [bajaDialogOpen, setBajaDialogOpen] = React.useState(false)
  const [eliminarDialogOpen, setEliminarDialogOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleConfirmarBaja = async () => {
    setIsLoading(true)
    try {
      console.log('[v0] Confirming baja for equipment:', id)
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('[v0] Baja completada exitosamente')
      setBajaDialogOpen(false)
    } catch (error) {
      console.error('[v0] Error al dar de baja:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmarEliminar = async () => {
    setIsLoading(true)
    try {
      console.log('[v0] Deleting equipment:', id)
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('[v0] Equipo eliminado exitosamente')
      setEliminarDialogOpen(false)
    } catch (error) {
      console.error('[v0] Error al eliminar:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ConfirmarBajaEquipoDialog
        open={bajaDialogOpen}
        equipo={equipo}
        isLoading={isLoading}
        onConfirm={handleConfirmarBaja}
        onOpenChange={setBajaDialogOpen}
      />
      <ConfirmarEliminarEquipoDialog
        open={eliminarDialogOpen}
        equipo={equipo}
        isLoading={isLoading}
        onConfirm={handleConfirmarEliminar}
        onOpenChange={setEliminarDialogOpen}
      />

      {/* Encabezado con botón atrás y título */}
      <div className="mb-6 flex items-center gap-3">
        <Link href="/inventarios/equipos">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Volver al listado de equipos</span>
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
            Ficha Técnica del Equipo
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Número de Inventario: <span className="font-mono font-medium">{numeroInventario}</span>
          </p>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Link href={`/inventarios/equipos/${id}`}>
          <Button className="w-full sm:w-auto">
            Editar Equipo
          </Button>
        </Link>
        <Button
          variant="outline"
          onClick={() => setBajaDialogOpen(true)}
          className="gap-2"
        >
          <Power className="h-4 w-4" />
          Dar de Baja
        </Button>
        <Button
          variant="destructive"
          onClick={() => setEliminarDialogOpen(true)}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </Button>
      </div>
    </>
  )
}

export default function FichaTecnicaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="mx-auto w-full max-w-7xl px-2 py-4 sm:px-4 md:px-6 lg:px-8 lg:py-8">
        <ContenidoFicha id={id} />
      </div>
    </div>
  )
}

// Componente para el contenido dinámico que requiere carga de datos
function ContenidoFicha({ id }: { id: string }) {
  const [equipo, setEquipo] = React.useState<EquipoFichaTecnica | null>(null)
  const [cargando, setCargando] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await obtenerEquipo(id)
        setEquipo(datos)
      } catch (err) {
        console.error('[v0] Error loading equipment:', err)
        setError('No se pudo cargar la información del equipo')
      } finally {
        setCargando(false)
      }
    }

    cargarDatos()
  }, [id])

  if (cargando) {
    return <div className="text-center py-8">Cargando ficha técnica...</div>
  }

  if (error || !equipo) {
    return <div className="text-center py-8 text-red-600">{error || 'Error al cargar el equipo'}</div>
  }

  return (
    <>
      <EncabezadoFicha numeroInventario={equipo.numeroInventario} id={id} equipo={equipo} />
      <FichaTecnicaEquipo equipo={equipo} />
    </>
  )
}
