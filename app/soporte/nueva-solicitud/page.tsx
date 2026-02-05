'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { SupportTicketForm } from '@/components/support-ticket-form'

export default function NuevaSolicitud() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto w-full max-w-4xl px-2 py-4 sm:px-4 md:px-6 lg:px-8 lg:py-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Volver al panel</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Nueva Solicitud de Soporte Técnico
            </h1>
            <p className="text-sm text-muted-foreground">
              Reporte una falla técnica y describe el problema que necesita resolver
            </p>
          </div>
        </div>

        {/* Form */}
        <SupportTicketForm />
      </div>
    </div>
  )
}
