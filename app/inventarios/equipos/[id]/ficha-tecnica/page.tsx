'use client'

import Link from 'next/link'
import { ArrowLeft, Download, Print } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FichaTecnicaEquipo } from '@/components/ficha-tecnica-equipo'

export default function FichaTecnicaPage({ params }: { params: { id: string } }) {
  // Datos de ejemplo - en producción estos vendrían de una API
  const equipoData = {
    id: params.id,
    numeroInventario: 'ITO-2024-HP01',
    tipoEquipo: 'computo' as const,
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

  const handleImprimir = () => {
    window.print()
  }

  const handleDescargar = () => {
    console.log('[v0] Iniciando descarga de ficha técnica para equipo:', params.id)
    // TODO: Implementar lógica para generar y descargar PDF
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="mx-auto w-full max-w-7xl px-2 py-4 sm:px-4 md:px-6 lg:px-8 lg:py-8">
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
              Número de Inventario: <span className="font-mono font-medium">{equipoData.numeroInventario}</span>
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={handleImprimir}
            className="gap-2"
          >
            <Print className="h-4 w-4" />
            Imprimir
          </Button>
          <Button
            variant="outline"
            onClick={handleDescargar}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Descargar PDF
          </Button>
          <Link href={`/inventarios/equipos/${params.id}`}>
            <Button className="w-full sm:w-auto">
              Editar Equipo
            </Button>
          </Link>
        </div>

        {/* Contenido principal */}
        <FichaTecnicaEquipo equipo={equipoData} />
      </div>
    </div>
  )
}
