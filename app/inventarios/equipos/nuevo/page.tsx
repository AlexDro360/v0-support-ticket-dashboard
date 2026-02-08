'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { NuevoEquipoForm } from '@/components/nuevo-equipo-form'
import type { FormData } from '@/components/nuevo-equipo-form'

export default function NuevoEquipoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true)
    
    try {
      console.log('[v0] Submitting equipment data:', formData)
      
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('[v0] Equipment registered successfully')
      
      // Redirect al listado de equipos
      router.push('/inventarios/equipos')
    } catch (error) {
      console.error('[v0] Error al registrar equipo:', error)
      alert('Error al registrar el equipo. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
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
              Registro de Nuevo Equipo
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Completa el formulario para registrar un nuevo equipo de TI
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <NuevoEquipoForm onSubmit={handleFormSubmit} isLoading={isLoading} />

          {/* Action Buttons - Inside a wrapper div for proper spacing */}
          <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-end">
            <Link href="/inventarios/equipos">
              <Button 
                variant="outline" 
                className="w-full md:w-auto bg-transparent"
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </Link>
            <Button 
              disabled={isLoading}
              className="w-full md:w-auto"
              onClick={() => {
                // Aquí el formulario manejará la validación y envío
                // Este botón ya no es necesario ya que el form tiene submit
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar Equipo'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
