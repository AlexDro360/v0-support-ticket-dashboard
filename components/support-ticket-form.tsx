'use client'

import { Calendar } from "@/components/ui/calendar"
import { AlertCircle, Monitor } from 'lucide-react'
import Link from "next/link"
import React from "react"
import { useState } from 'react'
import { Loader2, User, Mail, Briefcase, Clock, FileText, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

const AREAS = [
  'Dirección',
  'Administración',
  'Docencia',
  'Investigación',
  'Coordinación Académica',
  'Coordinación de Posgrado',
  'Extensión',
  'Otro'
]

const TIPOS_PROBLEMA = [
  'Software',
  'Hardware',
  'Red',
  'Telefonía',
  'Impresoras',
  'Acceso',
  'Otro'
]

const HORARIOS = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '12:00 - 14:00',
  '14:00 - 16:00',
  '16:00 - 18:00'
]

const PERIODOS = [
  'Enero - Junio 2026',
  'Julio - Diciembre 2025',
  'Enero - Junio 2025'
]

const JEFES_DPTO = [
  'Ing. Carlos Mendoza',
  'Ing. María García',
  'Ing. Jorge López',
  'Ing. Patricia Rodríguez'
]

const COORDINADORES = [
  'Lic. Ana Martínez',
  'Lic. Roberto Sánchez',
  'Lic. Sofía Jiménez',
  'Lic. Fernando Díaz'
]

const EQUIPOS = [
  { id: 'INV-ITO-001', nombre: 'Computadora Dell - Oficina 101' },
  { id: 'INV-ITO-002', nombre: 'Computadora HP - Oficina 102' },
  { id: 'INV-ITO-003', nombre: 'Laptop Lenovo - Sala de Maestros' },
  { id: 'INV-ITO-004', nombre: 'Impresora Canon - Rectoría' },
  { id: 'INV-ITO-005', nombre: 'Scanner Xerox - Biblioteca' }
]

export function SupportTicketForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    nombreAfectado: '',
    correoContacto: '',
    areaSolicitante: '',
    horarioDisponible: '',
    tipoProblema: '',
    descripcion: '',
    prioridad: '',
    periodo: '',
    equipo: '',
    jefeDpto: '',
    coordinador: '',
    fecha: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files) {
      setUploadedFiles(prev => [...prev, ...Array.from(files)])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files) {
      setUploadedFiles(prev => [...prev, ...Array.from(files)])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Datos del formulario:', { ...formData, archivos: uploadedFiles })
    
    setIsLoading(false)
    alert('Solicitud enviada correctamente')
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'Alta':
        return 'bg-red-100 text-red-800 border border-red-300'
      case 'Media':
        return 'bg-amber-100 text-amber-800 border border-amber-300'
      case 'Baja':
        return 'bg-blue-100 text-blue-800 border border-blue-300'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sección A: Información del Solicitante */}
      <div>
        <div className="mb-4 flex items-start gap-3">
          <div className="rounded-full bg-muted p-2">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground sm:text-lg">Información del Solicitante</h3>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Proporciona tus datos de contacto para la gestión de la solicitud
            </p>
          </div>
        </div>
        <div className="space-y-4 border-t pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Nombre Afectado */}
            <div className="space-y-2">
              <Label htmlFor="nombreAfectado" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nombre Afectado
              </Label>
              <Input
                id="nombreAfectado"
                name="nombreAfectado"
                placeholder="Tu nombre completo"
                value={formData.nombreAfectado}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Correo Contacto */}
            <div className="space-y-2">
              <Label htmlFor="correoContacto" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Correo de Contacto
              </Label>
              <Input
                id="correoContacto"
                name="correoContacto"
                type="email"
                placeholder="tu.correo@ito.edu.mx"
                value={formData.correoContacto}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Área Solicitante */}
            <div className="space-y-2">
              <Label htmlFor="areaSolicitante" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Área Solicitante
              </Label>
              <Select value={formData.areaSolicitante} onValueChange={(value) => handleSelectChange('areaSolicitante', value)}>
                <SelectTrigger id="areaSolicitante">
                  <SelectValue placeholder="Selecciona tu área" />
                </SelectTrigger>
                <SelectContent>
                  {AREAS.map(area => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Horario Disponible */}
            <div className="space-y-2">
              <Label htmlFor="horarioDisponible" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Horario Disponible
              </Label>
              <Select value={formData.horarioDisponible} onValueChange={(value) => handleSelectChange('horarioDisponible', value)}>
                <SelectTrigger id="horarioDisponible">
                  <SelectValue placeholder="Selecciona un horario" />
                </SelectTrigger>
                <SelectContent>
                  {HORARIOS.map(horario => (
                    <SelectItem key={horario} value={horario}>
                      {horario}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Sección B: Detalle del Problema */}
      <div>
        <div className="mb-4 flex items-start gap-3">
          <div className="rounded-full bg-muted p-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground sm:text-lg">Detalle del Problema</h3>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Describe el tipo de problema
            </p>
          </div>
        </div>
        <div className="space-y-4 border-t pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Tipo de Problema */}
            <div className="space-y-2">
              <Label htmlFor="tipoProblema" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Tipo de Problema
              </Label>
              <Select value={formData.tipoProblema} onValueChange={(value) => handleSelectChange('tipoProblema', value)}>
                <SelectTrigger id="tipoProblema">
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS_PROBLEMA.map(tipo => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcion" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Descripción del Problema
              </Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                placeholder="Describe en detalle el problema que estás experimentando..."
                value={formData.descripcion}
                onChange={handleInputChange}
                required
                rows={5}
                className="resize-none"
              />
            </div>

            {/* Upload Fotografía */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Fotografía o Evidencia
              </Label>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-8 text-center transition-colors hover:border-muted-foreground/50"
              >
                <input
                  type="file"
                  id="fotografia"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="fotografia" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      Arrastra archivos aquí o haz clic para seleccionar
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </label>
              </div>

              {/* Archivos subidos */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-foreground">Archivos seleccionados:</p>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border bg-card p-3">
                        <span className="text-sm text-foreground">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-3 md:justify-end">
        <Link href="/">
          <Button variant="outline">
            Cancelar
          </Button>
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
        </Button>
      </div>
    </form>
  )
}
