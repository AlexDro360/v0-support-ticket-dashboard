'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EditarEquipoForm } from '@/components/editar-equipo-form'
import type { FormData } from '@/components/editar-equipo-form'

export default function EditarEquipoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Datos de ejemplo - simulando que se cargan del servidor
  const equipoData = {
    id: params.id,
    numeroInventario: 'ITO-2024-HP01',
    tipoEquipo: 'computo',
    marca: 'HP',
    modelo: 'ProDesk 400',
    responsable: 'Juan Pérez',
    descripcion: 'Equipo de escritorio ubicado en el Centro de Cómputo, utilizado para tareas administrativas y de soporte técnico.',
    estado: 'Activo',
    ramGB: '16',
    procesador: 'Intel Core i7',
    sistemaOperativo: 'Windows 11 Pro',
    capacidadAlmacenamiento: '512 GB SSD',
  }

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true)
    
    try {
      console.log('[v0] Submitting equipment update:', formData)
      
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('[v0] Equipment updated successfully')
      
      // Redirect al listado de equipos
      router.push('/inventarios/equipos')
    } catch (error) {
      console.error('[v0] Error al actualizar equipo:', error)
      alert('Error al actualizar el equipo. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar este equipo? Esta acción no se puede deshacer.')) {
      return
    }

    setIsDeleting(true)
    
    try {
      console.log('[v0] Deleting equipment:', params.id)
      
      // Simular eliminación
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('[v0] Equipment deleted successfully')
      
      // Redirect al listado
      router.push('/inventarios/equipos')
    } catch (error) {
      console.error('[v0] Error al eliminar equipo:', error)
      alert('Error al eliminar el equipo. Intenta nuevamente.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="mx-auto w-full max-w-7xl px-2 py-4 sm:px-4 md:px-6 lg:px-8 lg:py-8">
        {/* Back Button and Title */}
        <div className="mb-6 flex items-center gap-3">
          <Link href="/inventarios/equipos">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Volver al listado de equipos</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              Editando Equipo: {equipoData.numeroInventario}
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Modifica los detalles del equipo registrado
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <EditarEquipoForm onSubmit={handleFormSubmit} initialData={equipoData} isLoading={isLoading} />

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Primary Actions */}
            <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-end">
              <Link href="/inventarios/equipos">
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto bg-transparent"
                  disabled={isLoading || isDeleting}
                >
                  Cancelar
                </Button>
              </Link>
              <Button 
                disabled={isLoading || isDeleting}
                className="w-full md:w-auto"
                onClick={() => {
                  // El formulario manejará la validación y envío
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Guardar Cambios'
                )}
              </Button>
            </div>

            {/* Danger Zone */}
            <div className="border-t pt-4">
              <div className="space-y-3">
                <p className="text-sm font-medium text-destructive">Zona de Peligro</p>
                <Button 
                  variant="destructive" 
                  className="w-full md:w-auto gap-2"
                  disabled={isLoading || isDeleting}
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Eliminando...
                    </>
                  ) : (
                    'Eliminar Equipo'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
