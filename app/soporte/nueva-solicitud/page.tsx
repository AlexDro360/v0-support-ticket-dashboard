"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  Mail,
  Briefcase,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
  Monitor,
  ArrowLeft,
  Loader2,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/file-upload"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function NuevaSolicitudPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // Datos de ejemplo
  const areas = [
    "Dirección General",
    "Coordinación Académica",
    "Coordinación Administrativa",
    "Biblioteca",
    "Laboratorio",
    "Aula Virtual",
  ]

  const problemTypes = ["Software", "Hardware", "Red", "Telefonía"]
  const priorities = ["Baja", "Media", "Alta"]
  const periods = ["Enero-Junio 2026", "Julio-Diciembre 2025"]
  const jefes = ["Ing. Juan García", "Ing. María López", "Ing. Carlos Rodríguez"]
  const coordinadores = [
    "Coord. Ana Martínez",
    "Coord. Luis Flores",
    "Coord. Sandra Ruiz",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    // Aquí iría la lógica para enviar a la API
    alert("Solicitud enviada correctamente")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800"
      case "Media":
        return "bg-amber-100 text-amber-800"
      case "Baja":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Volver al panel</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Nueva Solicitud de Soporte
            </h1>
            <p className="text-sm text-muted-foreground">
              Reporte una falla técnica para que nuestro equipo la atienda lo antes
              posible.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sección A: Información del Solicitante */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" />
                Información del Solicitante
              </CardTitle>
              <CardDescription>
                Proporciona tus datos de contacto y tu área de trabajo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nombre del Afectado *
                  </Label>
                  <Input
                    id="nombre"
                    placeholder="Ej: Juan Pérez García"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correo" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Correo Electrónico *
                  </Label>
                  <Input
                    id="correo"
                    type="email"
                    placeholder="usuario@tecnm.mx"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Área Solicitante *
                  </Label>
                  <Select>
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Selecciona un área" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horario" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Horario Disponible *
                  </Label>
                  <Input
                    id="horario"
                    placeholder="Ej: 09:00 - 17:00"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sección B: Detalle del Problema */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5 text-primary" />
                Detalle del Problema
              </CardTitle>
              <CardDescription>
                Describe el problema técnico y su gravedad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="tipoProblema"
                    className="flex items-center gap-2"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Tipo de Problema *
                  </Label>
                  <Select>
                    <SelectTrigger id="tipoProblema">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {problemTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prioridad" className="flex items-center gap-2">
                    Prioridad *
                  </Label>
                  <Select>
                    <SelectTrigger id="prioridad">
                      <SelectValue placeholder="Selecciona prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                priority === "Alta"
                                  ? "bg-red-500"
                                  : priority === "Media"
                                    ? "bg-amber-500"
                                    : "bg-blue-500"
                              }`}
                            />
                            {priority}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Descripción del Problema *
                </Label>
                <Textarea
                  id="descripcion"
                  placeholder="Describe detalladamente el problema que experimentas..."
                  rows={5}
                  required
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fotografia" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Fotografía o Evidencia
                </Label>
                <FileUpload
                  onFileSelect={setUploadedFile}
                  accept="image/*"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sección C: Contexto Institucional y Equipo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Monitor className="h-5 w-5 text-primary" />
                Contexto Institucional y Equipo
              </CardTitle>
              <CardDescription>
                Información sobre el período, equipo y responsables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="periodo" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Período *
                  </Label>
                  <Select>
                    <SelectTrigger id="periodo">
                      <SelectValue placeholder="Selecciona período" />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map((period) => (
                        <SelectItem key={period} value={period}>
                          {period}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equipo" className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    No. de Inventario del Equipo *
                  </Label>
                  <Input
                    id="equipo"
                    placeholder="Ej: INV-ITO-1024"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jefe" className="flex items-center gap-2">
                    Jefe de Departamento
                  </Label>
                  <Select>
                    <SelectTrigger id="jefe">
                      <SelectValue placeholder="Selecciona jefe" />
                    </SelectTrigger>
                    <SelectContent>
                      {jefes.map((jefe) => (
                        <SelectItem key={jefe} value={jefe}>
                          {jefe}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coordinador" className="flex items-center gap-2">
                    Coordinador
                  </Label>
                  <Select>
                    <SelectTrigger id="coordinador">
                      <SelectValue placeholder="Selecciona coordinador" />
                    </SelectTrigger>
                    <SelectContent>
                      {coordinadores.map((coord) => (
                        <SelectItem key={coord} value={coord}>
                          {coord}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fecha" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Fecha de Reporte *
                  </Label>
                  <Input
                    id="fecha"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acciones */}
          <div className="flex gap-3 sm:justify-end">
            <Link href="/">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Solicitud"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
