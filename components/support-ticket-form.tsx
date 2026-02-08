'use client'

import { AlertCircle, Loader2, User, Mail, Briefcase, Clock, FileText, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const TIPOS_PROBLEMA = [
  'Software',
  'Hardware',
  'Red',
  'Telefonía',
  'Impresoras',
  'Acceso',
  'Otro'
]

interface FormData {
  nombreSolicitante: string
  correoContacto: string
  areaSolicitante: string
  horarioDisponible: string
  tipoProblema: string
  descripcion: string
}

interface FormErrors {
  nombreSolicitante?: string
  correoContacto?: string
  areaSolicitante?: string
  horarioDisponible?: string
  tipoProblema?: string
  descripcion?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function SupportTicketForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    nombreSolicitante: '',
    correoContacto: '',
    areaSolicitante: '',
    horarioDisponible: '',
    tipoProblema: '',
    descripcion: '',
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.nombreSolicitante.trim()) {
      newErrors.nombreSolicitante = 'El nombre es requerido'
    }

    if (!formData.correoContacto.trim()) {
      newErrors.correoContacto = 'El correo es requerido'
    } else if (!EMAIL_REGEX.test(formData.correoContacto)) {
      newErrors.correoContacto = 'Correo inválido'
    }

    if (!formData.areaSolicitante.trim()) {
      newErrors.areaSolicitante = 'El área es requerida'
    }

    if (!formData.horarioDisponible.trim()) {
      newErrors.horarioDisponible = 'El horario es requerido'
    }

    if (!formData.tipoProblema.trim()) {
      newErrors.tipoProblema = 'Selecciona un tipo de problema'
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files) {
      const newFiles = Array.from(files).filter(
        file => file.size <= MAX_FILE_SIZE
      )
      setUploadedFiles(prev => [...prev, ...newFiles])
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
      const newFiles = Array.from(files).filter(
        file => file.size <= MAX_FILE_SIZE
      )
      setUploadedFiles(prev => [...prev, ...newFiles])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Reset form
      setFormData({
        nombreSolicitante: '',
        correoContacto: '',
        areaSolicitante: '',
        horarioDisponible: '',
        tipoProblema: '',
        descripcion: '',
      })
      setUploadedFiles([])

      alert('Solicitud enviada correctamente')
    } catch (error) {
      console.error('Error al enviar solicitud:', error)
      alert('Error al enviar la solicitud. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const getInputClassName = (fieldName: keyof FormErrors): string => {
    return errors[fieldName] ? 'border-red-500 focus:ring-red-500' : ''
  }

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null
    return (
      <p className="text-xs text-red-500 flex items-center gap-1">
        <AlertCircle className="h-3 w-3" />
        {message}
      </p>
    )
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Formulario de Solicitud</CardTitle>
        <CardDescription>
          Completa todos los campos para enviar tu solicitud de soporte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sección: Información del Solicitante */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Información del Solicitante
              </h3>
              <p className="text-sm text-muted-foreground">
                Proporciona tus datos de contacto para la gestión de la solicitud
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {/* Nombre Solicitante */}
              <div className="space-y-2">
                <Label
                  htmlFor="nombreSolicitante"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  Nombre Completo
                  {errors.nombreSolicitante && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id="nombreSolicitante"
                  name="nombreSolicitante"
                  placeholder="Tu nombre completo"
                  value={formData.nombreSolicitante}
                  onChange={handleInputChange}
                  className={`${getInputClassName('nombreSolicitante')} transition-colors`}
                />
                <ErrorMessage message={errors.nombreSolicitante} />
              </div>

              {/* Correo Contacto */}
              <div className="space-y-2">
                <Label
                  htmlFor="correoContacto"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Correo de Contacto
                  {errors.correoContacto && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id="correoContacto"
                  name="correoContacto"
                  type="email"
                  placeholder="tu.correo@ito.edu.mx"
                  value={formData.correoContacto}
                  onChange={handleInputChange}
                  className={`${getInputClassName('correoContacto')} transition-colors`}
                />
                <ErrorMessage message={errors.correoContacto} />
              </div>

              {/* Área Solicitante */}
              <div className="space-y-2">
                <Label
                  htmlFor="areaSolicitante"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  Área Solicitante
                  {errors.areaSolicitante && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id="areaSolicitante"
                  name="areaSolicitante"
                  placeholder="Ej: Dirección, Docencia"
                  value={formData.areaSolicitante}
                  onChange={handleInputChange}
                  className={`${getInputClassName('areaSolicitante')} transition-colors`}
                />
                <ErrorMessage message={errors.areaSolicitante} />
              </div>

              {/* Horario Disponible */}
              <div className="space-y-2">
                <Label
                  htmlFor="horarioDisponible"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Horario Disponible
                  {errors.horarioDisponible && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id="horarioDisponible"
                  name="horarioDisponible"
                  placeholder="Ej: 08:00 - 10:00"
                  value={formData.horarioDisponible}
                  onChange={handleInputChange}
                  className={`${getInputClassName('horarioDisponible')} transition-colors`}
                />
                <ErrorMessage message={errors.horarioDisponible} />
              </div>
            </div>
          </div>

          {/* Divisor visual */}
          <div className="border-t pt-8" />

          {/* Sección: Detalle del Problema */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Detalle del Problema
              </h3>
              <p className="text-sm text-muted-foreground">
                Describe el tipo de problema y proporciona evidencia visual
              </p>
            </div>

            <div className="space-y-6">
              {/* Tipo de Problema */}
              <div className="space-y-2">
                <Label
                  htmlFor="tipoProblema"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Tipo de Problema
                  {errors.tipoProblema && <span className="text-red-500">*</span>}
                </Label>
                <Select
                  value={formData.tipoProblema}
                  onValueChange={(value) =>
                    handleSelectChange('tipoProblema', value)
                  }
                >
                  <SelectTrigger
                    id="tipoProblema"
                    className={`${getInputClassName('tipoProblema')} transition-colors`}
                  >
                    <SelectValue placeholder="Selecciona el tipo de problema" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_PROBLEMA.map(tipo => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage message={errors.tipoProblema} />
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <Label
                  htmlFor="descripcion"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Descripción del Problema
                  {errors.descripcion && <span className="text-red-500">*</span>}
                </Label>
                <Textarea
                  id="descripcion"
                  name="descripcion"
                  placeholder="Describe en detalle qué está sucediendo, cuándo comenzó el problema, y qué has intentado..."
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows={5}
                  className={`${getInputClassName('descripcion')} resize-none transition-colors`}
                />
                <ErrorMessage message={errors.descripcion} />
              </div>

              {/* Upload Fotografía */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  Fotografía o Evidencia
                  <span className="text-xs font-normal text-muted-foreground">
                    (Opcional)
                  </span>
                </Label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-8 text-center transition-all hover:border-muted-foreground/50 hover:bg-muted/50 cursor-pointer"
                >
                  <input
                    type="file"
                    id="fotografia"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="fotografia" className="cursor-pointer block">
                    <div className="flex flex-col items-center gap-3">
                      <div className="rounded-full bg-muted p-3">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        Arrastra archivos aquí o haz clic para seleccionar
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, GIF hasta 10MB
                      </p>
                    </div>
                  </label>
                </div>

                {/* Archivos subidos */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      {uploadedFiles.length} archivo
                      {uploadedFiles.length > 1 ? 's' : ''} seleccionado
                      {uploadedFiles.length > 1 ? 's' : ''}:
                    </p>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between rounded-lg border bg-card p-3 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm text-foreground truncate">
                              {file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0"
                            aria-label={`Eliminar archivo ${file.name}`}
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

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-end pt-4 border-t">
            <Link href="/">
              <Button variant="outline" className="w-full md:w-auto bg-transparent">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Solicitud'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
