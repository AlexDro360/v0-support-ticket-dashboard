'use client'

import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { NuevoEquipoForm } from '@/components/nuevo-equipo-form'

export default function NuevoEquipoPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsLoading(true)
    
    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Equipo registrado correctamente')
    } catch (error) {
      console.error('Error al registrar equipo:', error)
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
        <NuevoEquipoForm />

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-end mt-6">
          <Link href="/inventarios/equipos">
            <Button variant="outline" className="w-full md:w-auto bg-transparent">
              Cancelar
            </Button>
          </Link>
          <Button 
            disabled={isLoading}
            className="w-full md:w-auto"
            onClick={() => handleSubmit({} as React.FormEvent)}
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
  )
}
