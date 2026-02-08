'use client'

import { AlertCircle, Package, Laptop, Printer, Wifi, HardDrive, Zap, FileText, User, Tag, Database, Server, Keyboard, Monitor, Droplet, Network, Cpu } from 'lucide-react'
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
  numeroInventario?: string
  tipoEquipo?: string
  marca?: string
  modelo?: string
  responsable?: string
  descripcion?: string
  [key: string]: string | undefined
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

interface NuevoEquipoFormProps {
  onSubmit: (formData: FormData) => void
  isLoading?: boolean
}

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

export function NuevoEquipoForm({ onSubmit, isLoading }: NuevoEquipoFormProps) {
  const [formData, setFormData] = useState<FormData>({
    numeroInventario: '',
    tipoEquipo: 'computo',
    marca: '',
    modelo: '',
    responsable: '',
    descripcion: '',
    ramGB: '',
    procesador: '',
    sistemaOperativo: '',
    capacidadAlmacenamiento: '',
    tipoAlmacenamiento: '',
    tipoImpresion: '',
    modeloToner: '',
    esAColor: false,
    numeroPuertos: '',
    tipoRed: '',
    esPoE: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validaciones generales
    if (!formData.numeroInventario.trim()) {
      newErrors.numeroInventario = 'El número de inventario es requerido'
    }
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
      {/* Card 1: Clasificación de Equipo */}
      <Card className="border-0 shadow-sm">
        <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="text-base font-semibold text-foreground sm:text-lg flex items-center gap-2">
            <Package className="h-5 w-5" />
            Clasificación de Equipo
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm mt-1">
            Selecciona el tipo de equipo que deseas registrar
          </p>
        </div>
        <CardContent className="p-4 sm:p-6">
          <RadioGroup value={formData.tipoEquipo} onValueChange={handleTypeChange}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <EquipoTypeOption
                value="computo"
                icon={<Laptop className="h-4 w-4" />}
                label="Cómputo"
                selected={formData.tipoEquipo === 'computo'}
              />
              <EquipoTypeOption
                value="impresora"
                icon={<Printer className="h-4 w-4" />}
                label="Impresora"
                selected={formData.tipoEquipo === 'impresora'}
              />
              <EquipoTypeOption
                value="redes"
                icon={<Wifi className="h-4 w-4" />}
                label="Redes"
                selected={formData.tipoEquipo === 'redes'}
              />
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Card 2: Datos Generales */}
      <Card className="border-0 shadow-sm">
        <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            Datos Generales
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm mt-1">
            Información básica del equipo
          </p>
        </div>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* No. Inventario */}
            <div className="space-y-2">
              <Label htmlFor="numeroInventario" className="flex items-center gap-2 text-sm font-medium">
                <Tag className="h-4 w-4 text-muted-foreground" />
                No. Inventario
                {errors.numeroInventario && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id="numeroInventario"
                name="numeroInventario"
                placeholder="Ej: ITO-2024-001"
                value={formData.numeroInventario}
                onChange={handleInputChange}
                className={`${getInputClassName('numeroInventario')} transition-colors`}
              />
              <ErrorMessage message={errors.numeroInventario} />
            </div>

            {/* Marca */}
            <div className="space-y-2">
              <Label htmlFor="marca" className="flex items-center gap-2 text-sm font-medium">
                <Package className="h-4 w-4 text-muted-foreground" />
                Marca
                {errors.marca && <span className="text-red-500">*</span>}
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
                {errors.modelo && <span className="text-red-500">*</span>}
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
                {errors.responsable && <span className="text-red-500">*</span>}
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

            {/* Descripción */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="descripcion" className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Descripción
                {errors.descripcion && <span className="text-red-500">*</span>}
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

      {/* Card 3: Especificaciones Técnicas (Dinámico) */}
      <Card className="border-0 shadow-sm">
        <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="text-base font-semibold text-foreground sm:text-lg flex items-center gap-2">
            {getTipoIcon()}
            Especificaciones Técnicas
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm mt-1">
            Detalles específicos del equipo seleccionado
          </p>
        </div>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <div>
            {formData.tipoEquipo === 'computo' && (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ramGB" className="flex items-center gap-2 text-sm font-medium">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    RAM (GB)
                    {errors.ramGB && <span className="text-red-500">*</span>}
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
                    {errors.procesador && <span className="text-red-500">*</span>}
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
                    {errors.sistemaOperativo && <span className="text-red-500">*</span>}
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
                    {errors.capacidadAlmacenamiento && <span className="text-red-500">*</span>}
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
                    {errors.tipoAlmacenamiento && <span className="text-red-500">*</span>}
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
                    {errors.tipoImpresion && <span className="text-red-500">*</span>}
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
                    {errors.modeloToner && <span className="text-red-500">*</span>}
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
                    {errors.numeroPuertos && <span className="text-red-500">*</span>}
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
                    {errors.tipoRed && <span className="text-red-500">*</span>}
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
    </form>
  )
}
