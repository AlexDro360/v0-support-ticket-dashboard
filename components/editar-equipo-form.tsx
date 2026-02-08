'use client'

import { AlertCircle, Package, Laptop, Printer, Wifi, HardDrive, FileText, User, Tag, Database, Server, Keyboard, Monitor, Droplet, Network, Cpu, Lock } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type TipoEquipo = 'computo' | 'impresora' | 'redes'

export interface FormData {
  numeroInventario: string
  tipoEquipo: TipoEquipo
  marca: string
  modelo: string
  responsable: string
  descripcion: string
  estado: 'Activo' | 'Baja'
  // Cómputo
  ramGB?: string
  procesador?: string
  sistemaOperativo?: string
  capacidadAlmacenamiento?: string
  tipoAlmacenamiento?: string
  // Impresora
  tipoImpresion?: string
  modeloToner?: string
  esAColor?: boolean
  // Redes
  numeroPuertos?: string
  tipoRed?: string
  esPoE?: boolean
}

interface FormErrors {
  [key: string]: string | undefined
}

interface EditarEquipoFormProps {
  onSubmit: (formData: FormData) => void
  initialData: Partial<FormData>
  isLoading?: boolean
}

const MARCAS = ['Dell', 'HP', 'Lenovo', 'ASUS', 'Canon', 'Xerox', 'Cisco', 'TP-Link']
const MODELOS = {
  Dell: ['OptiPlex 3080', 'OptiPlex 7090', 'Inspiron 15'],
  HP: ['ProDesk 400', 'LaserJet M501', 'DeskJet 3755'],
  Lenovo: ['ThinkCentre M90', 'ThinkPad E15'],
  ASUS: ['VivoPC', 'Chromebox'],
  Canon: ['imageCLASS MF445dw', 'imageCLASS MF643Cdw'],
  Xerox: ['VersaLink C405', 'VersaLink B405'],
  Cisco: ['Catalyst 2960X', 'Catalyst 3560X'],
  'TP-Link': ['TL-SG2428', 'TL-SG3428'],
}

const RESPONSABLES = [
  'Juan Pérez',
  'María García',
  'Carlos López',
  'Ana Martínez',
  'Roberto Sánchez',
]

const PROCESADORES = ['Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7']
const SISTEMAS_OPERATIVOS = ['Windows 10', 'Windows 11', 'Ubuntu 20.04', 'Ubuntu 22.04', 'macOS']
const TIPOS_ALMACENAMIENTO = ['HDD', 'SSD', 'NVMe SSD']
const TIPOS_IMPRESION = ['Láser', 'Inyección', 'Térmica']
const TIPOS_RED = ['Ethernet', 'Fibra', 'Wireless']

// Componente para mostrar errores
function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="text-xs text-red-500 flex items-center gap-1">
      <AlertCircle className="h-3 w-3" />
      {message}
    </p>
  )
}

// Componente para el selector de tipo de equipo
interface EquipoTypeOptionProps {
  value: TipoEquipo
  icon: React.ReactNode
  label: string
  selected: boolean
}

function EquipoTypeOption({ value, icon, label, selected }: EquipoTypeOptionProps) {
  return (
    <label 
      htmlFor={value}
      className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-all ${
        selected ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
      }`}
    >
      <RadioGroupItem value={value} id={value} />
      <div className="flex-1 flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
    </label>
  )
}

export function EditarEquipoForm({ onSubmit, initialData, isLoading }: EditarEquipoFormProps) {
  const [formData, setFormData] = useState<FormData>({
    numeroInventario: initialData.numeroInventario || '',
    tipoEquipo: (initialData.tipoEquipo as TipoEquipo) || 'computo',
    marca: initialData.marca || '',
    modelo: initialData.modelo || '',
    responsable: initialData.responsable || '',
    descripcion: initialData.descripcion || '',
    estado: (initialData.estado as 'Activo' | 'Baja') || 'Activo',
    ramGB: initialData.ramGB || '',
    procesador: initialData.procesador || '',
    sistemaOperativo: initialData.sistemaOperativo || '',
    capacidadAlmacenamiento: initialData.capacidadAlmacenamiento || '',
    tipoAlmacenamiento: initialData.tipoAlmacenamiento || '',
    tipoImpresion: initialData.tipoImpresion || '',
    modeloToner: initialData.modeloToner || '',
    esAColor: initialData.esAColor || false,
    numeroPuertos: initialData.numeroPuertos || '',
    tipoRed: initialData.tipoRed || '',
    esPoE: initialData.esPoE || false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validaciones generales
    if (!formData.marca.trim()) {
      newErrors.marca = 'La marca es requerida'
    }
    if (!formData.modelo.trim()) {
      newErrors.modelo = 'El modelo es requerido'
    }
    if (!formData.responsable.trim()) {
      newErrors.responsable = 'El responsable es requerido'
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida'
    }

    // Validaciones específicas por tipo
    if (formData.tipoEquipo === 'computo') {
      if (!formData.ramGB?.trim()) newErrors.ramGB = 'La RAM es requerida'
      if (!formData.procesador?.trim()) newErrors.procesador = 'El procesador es requerido'
      if (!formData.sistemaOperativo?.trim()) newErrors.sistemaOperativo = 'El SO es requerido'
      if (!formData.capacidadAlmacenamiento?.trim()) newErrors.capacidadAlmacenamiento = 'La capacidad es requerida'
      if (!formData.tipoAlmacenamiento?.trim()) newErrors.tipoAlmacenamiento = 'El tipo es requerido'
    } else if (formData.tipoEquipo === 'impresora') {
      if (!formData.tipoImpresion?.trim()) newErrors.tipoImpresion = 'El tipo es requerido'
      if (!formData.modeloToner?.trim()) newErrors.modeloToner = 'El modelo de tóner es requerido'
    } else if (formData.tipoEquipo === 'redes') {
      if (!formData.numeroPuertos?.trim()) newErrors.numeroPuertos = 'El número de puertos es requerido'
      if (!formData.tipoRed?.trim()) newErrors.tipoRed = 'El tipo de red es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const handleTypeChange = (value: TipoEquipo) => {
    setFormData(prev => ({ ...prev, tipoEquipo: value }))
    setErrors({})
    setTouched({})
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const getInputClassName = (fieldName: string): string => {
    return errors[fieldName] ? 'border-red-500 focus:ring-red-500' : ''
  }

  const getTipoIcon = () => {
    const icons = {
      computo: <Laptop className="h-5 w-5" />,
      impresora: <Printer className="h-5 w-5" />,
      redes: <Wifi className="h-5 w-5" />
    }
    return icons[formData.tipoEquipo]
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Card 1: Identificación y Tipo */}
      <Card className="border-0 shadow-sm">
        <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="text-base font-semibold text-foreground sm:text-lg flex items-center gap-2">
            <Package className="h-5 w-5" />
            Identificación del Equipo
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm mt-1">
            Información básica e identificación del equipo
          </p>
        </div>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* No. Inventario - Read Only */}
            <div className="space-y-2">
              <Label htmlFor="numeroInventario" className="flex items-center gap-2 text-sm font-medium">
                <Tag className="h-4 w-4 text-muted-foreground" />
                No. Inventario
              </Label>
              <div className="relative">
                <Input
                  id="numeroInventario"
                  value={formData.numeroInventario}
                  disabled={true}
                  className="bg-muted text-muted-foreground cursor-not-allowed"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Este campo no se puede modificar</p>
            </div>

            {/* Tipo de Equipo */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tipo de Equipo</Label>
              <RadioGroup value={formData.tipoEquipo} onValueChange={handleTypeChange}>
                <div className="flex gap-2 flex-wrap">
                  <label htmlFor="computo" className={`flex items-center space-x-2 p-2 border rounded px-3 cursor-pointer transition-all ${
                    formData.tipoEquipo === 'computo' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}>
                    <RadioGroupItem value="computo" id="computo" />
                    <Laptop className="h-4 w-4" />
                    <span className="text-sm">Cómputo</span>
                  </label>
                  <label htmlFor="impresora" className={`flex items-center space-x-2 p-2 border rounded px-3 cursor-pointer transition-all ${
                    formData.tipoEquipo === 'impresora' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}>
                    <RadioGroupItem value="impresora" id="impresora" />
                    <Printer className="h-4 w-4" />
                    <span className="text-sm">Impresora</span>
                  </label>
                  <label htmlFor="redes" className={`flex items-center space-x-2 p-2 border rounded px-3 cursor-pointer transition-all ${
                    formData.tipoEquipo === 'redes' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}>
                    <RadioGroupItem value="redes" id="redes" />
                    <Wifi className="h-4 w-4" />
                    <span className="text-sm">Redes</span>
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Datos Generales */}
      <Card className="border-0 shadow-sm">
        <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            Datos Generales
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm mt-1">
            Información general del equipo
          </p>
        </div>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* Marca */}
            <div className="space-y-2">
              <Label htmlFor="marca" className="flex items-center gap-2 text-sm font-medium">
                <Package className="h-4 w-4 text-muted-foreground" />
                Marca
              </Label>
              <Select value={formData.marca} onValueChange={(value) => handleSelectChange('marca', value)}>
                <SelectTrigger id="marca" className={`${getInputClassName('marca')} transition-colors`}>
                  <SelectValue placeholder="Selecciona una marca" />
                </SelectTrigger>
                <SelectContent>
                  {MARCAS.map((marca) => (
                    <SelectItem key={marca} value={marca}>
                      {marca}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.marca} />
            </div>

            {/* Modelo */}
            <div className="space-y-2">
              <Label htmlFor="modelo" className="flex items-center gap-2 text-sm font-medium">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                Modelo
              </Label>
              <Select value={formData.modelo} onValueChange={(value) => handleSelectChange('modelo', value)}>
                <SelectTrigger id="modelo" className={`${getInputClassName('modelo')} transition-colors`}>
                  <SelectValue placeholder="Selecciona un modelo" />
                </SelectTrigger>
                <SelectContent>
                  {formData.marca && MODELOS[formData.marca as keyof typeof MODELOS]?.map((modelo) => (
                    <SelectItem key={modelo} value={modelo}>
                      {modelo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.modelo} />
            </div>

            {/* Responsable */}
            <div className="space-y-2">
              <Label htmlFor="responsable" className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4 text-muted-foreground" />
                Responsable
              </Label>
              <Select value={formData.responsable} onValueChange={(value) => handleSelectChange('responsable', value)}>
                <SelectTrigger id="responsable" className={`${getInputClassName('responsable')} transition-colors`}>
                  <SelectValue placeholder="Selecciona un responsable" />
                </SelectTrigger>
                <SelectContent>
                  {RESPONSABLES.map((resp) => (
                    <SelectItem key={resp} value={resp}>
                      {resp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.responsable} />
            </div>

            {/* Estado del Equipo */}
            <div className="space-y-2">
              <Label htmlFor="estado" className="flex items-center gap-2 text-sm font-medium">
                <Database className="h-4 w-4 text-muted-foreground" />
                Estado del Equipo
              </Label>
              <Select value={formData.estado} onValueChange={(value) => handleSelectChange('estado', value)}>
                <SelectTrigger id="estado" className={`${getInputClassName('estado')} transition-colors`}>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Baja">Baja</SelectItem>
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.estado} />
            </div>

            {/* Descripción */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="descripcion" className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Descripción/Observaciones
              </Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                placeholder="Describe el equipo y cualquier detalle adicional..."
                value={formData.descripcion}
                onChange={handleInputChange}
                rows={4}
                className={`${getInputClassName('descripcion')} resize-none transition-colors`}
              />
              <ErrorMessage message={errors.descripcion} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Especificaciones Técnicas */}
      <Card className="border-0 shadow-sm">
        <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="text-base font-semibold text-foreground sm:text-lg flex items-center gap-2">
            {getTipoIcon()}
            Especificaciones Técnicas
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm mt-1">
            Detalles técnicos específicos del equipo
          </p>
        </div>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <div>
            {/* Cómputo */}
            {formData.tipoEquipo === 'computo' && (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ramGB" className="flex items-center gap-2 text-sm font-medium">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    RAM (GB)
                  </Label>
                  <Input
                    id="ramGB"
                    name="ramGB"
                    placeholder="Ej: 16"
                    value={formData.ramGB || ''}
                    onChange={handleInputChange}
                    className={`${getInputClassName('ramGB')} transition-colors`}
                  />
                  <ErrorMessage message={errors.ramGB} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="procesador" className="flex items-center gap-2 text-sm font-medium">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    Procesador
                  </Label>
                  <Select value={formData.procesador || ''} onValueChange={(value) => handleSelectChange('procesador', value)}>
                    <SelectTrigger id="procesador" className={`${getInputClassName('procesador')} transition-colors`}>
                      <SelectValue placeholder="Selecciona un procesador" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROCESADORES.map((proc) => (
                        <SelectItem key={proc} value={proc}>
                          {proc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage message={errors.procesador} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sistemaOperativo" className="flex items-center gap-2 text-sm font-medium">
                    <Keyboard className="h-4 w-4 text-muted-foreground" />
                    Sistema Operativo
                  </Label>
                  <Select value={formData.sistemaOperativo || ''} onValueChange={(value) => handleSelectChange('sistemaOperativo', value)}>
                    <SelectTrigger id="sistemaOperativo" className={`${getInputClassName('sistemaOperativo')} transition-colors`}>
                      <SelectValue placeholder="Selecciona un SO" />
                    </SelectTrigger>
                    <SelectContent>
                      {SISTEMAS_OPERATIVOS.map((so) => (
                        <SelectItem key={so} value={so}>
                          {so}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage message={errors.sistemaOperativo} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacidadAlmacenamiento" className="flex items-center gap-2 text-sm font-medium">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    Capacidad Almacenamiento (GB)
                  </Label>
                  <Input
                    id="capacidadAlmacenamiento"
                    name="capacidadAlmacenamiento"
                    placeholder="Ej: 512"
                    value={formData.capacidadAlmacenamiento || ''}
                    onChange={handleInputChange}
                    className={`${getInputClassName('capacidadAlmacenamiento')} transition-colors`}
                  />
                  <ErrorMessage message={errors.capacidadAlmacenamiento} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoAlmacenamiento" className="flex items-center gap-2 text-sm font-medium">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    Tipo Almacenamiento
                  </Label>
                  <Select value={formData.tipoAlmacenamiento || ''} onValueChange={(value) => handleSelectChange('tipoAlmacenamiento', value)}>
                    <SelectTrigger id="tipoAlmacenamiento" className={`${getInputClassName('tipoAlmacenamiento')} transition-colors`}>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS_ALMACENAMIENTO.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage message={errors.tipoAlmacenamiento} />
                </div>
              </div>
            )}

            {/* Impresora */}
            {formData.tipoEquipo === 'impresora' && (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tipoImpresion" className="flex items-center gap-2 text-sm font-medium">
                    <Printer className="h-4 w-4 text-muted-foreground" />
                    Tipo de Impresión
                  </Label>
                  <Select value={formData.tipoImpresion || ''} onValueChange={(value) => handleSelectChange('tipoImpresion', value)}>
                    <SelectTrigger id="tipoImpresion" className={`${getInputClassName('tipoImpresion')} transition-colors`}>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS_IMPRESION.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage message={errors.tipoImpresion} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modeloToner" className="flex items-center gap-2 text-sm font-medium">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    Modelo de Tóner
                  </Label>
                  <Input
                    id="modeloToner"
                    name="modeloToner"
                    placeholder="Ej: CF226A"
                    value={formData.modeloToner || ''}
                    onChange={handleInputChange}
                    className={`${getInputClassName('modeloToner')} transition-colors`}
                  />
                  <ErrorMessage message={errors.modeloToner} />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      id="esAColor"
                      checked={formData.esAColor || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, esAColor: e.target.checked }))}
                      className="rounded cursor-pointer"
                    />
                    <Label htmlFor="esAColor" className="cursor-pointer flex items-center gap-2">
                      <Droplet className="h-4 w-4 text-muted-foreground" />
                      ¿Es a Color?
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Redes */}
            {formData.tipoEquipo === 'redes' && (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="numeroPuertos" className="flex items-center gap-2 text-sm font-medium">
                    <Network className="h-4 w-4 text-muted-foreground" />
                    Número de Puertos
                  </Label>
                  <Input
                    id="numeroPuertos"
                    name="numeroPuertos"
                    placeholder="Ej: 24"
                    value={formData.numeroPuertos || ''}
                    onChange={handleInputChange}
                    className={`${getInputClassName('numeroPuertos')} transition-colors`}
                  />
                  <ErrorMessage message={errors.numeroPuertos} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoRed" className="flex items-center gap-2 text-sm font-medium">
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                    Tipo de Red
                  </Label>
                  <Select value={formData.tipoRed || ''} onValueChange={(value) => handleSelectChange('tipoRed', value)}>
                    <SelectTrigger id="tipoRed" className={`${getInputClassName('tipoRed')} transition-colors`}>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS_RED.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage message={errors.tipoRed} />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      id="esPoE"
                      checked={formData.esPoE || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, esPoE: e.target.checked }))}
                      className="rounded cursor-pointer"
                    />
                    <Label htmlFor="esPoE" className="cursor-pointer flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      ¿Tiene PoE (Power over Ethernet)?
                    </Label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Guardando...
          </>
        ) : (
          'Guardar Cambios'
        )}
      </Button>
    </form>
  )
}

// Importación faltante
import { Loader2 } from 'lucide-react'
