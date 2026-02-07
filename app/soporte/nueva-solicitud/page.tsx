'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SupportTicketForm } from '@/components/support-ticket-form'

export default function NuevaSolicitud() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-2 py-4 sm:px-4 md:px-6 lg:px-8 lg:py-8">
        {/* Back Button */}
        <div className="mb-6 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Volver al listado</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              Nueva Solicitud de Soporte Técnico
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Completa el formulario para reportar un problema técnico
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="rounded-lg border bg-card shadow-sm md:rounded-xl">
          <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
            <h2 className="text-base font-semibold text-foreground sm:text-lg">
              Formulario de Solicitud
            </h2>
          </div>

          <div className="space-y-6 p-4 sm:p-6">
            <SupportTicketForm />
          </div>
        </div>
      </div>
    </div>
  )
}
