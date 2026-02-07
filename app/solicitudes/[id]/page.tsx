'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  FileText,
  User,
  Clock,
  XCircle,
  Pause,
  CheckCircle2,
  Play,
  UserPlus,
  Ban,
  ClipboardCheck,
  Lock,
  Route,
  Wrench,
  Cpu,
  Network,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TicketStepper } from '@/components/ticket-stepper'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

// --- Types ---

type TicketState = 'Pendiente' | 'Asignado' | 'En Proceso' | 'Resuelta' | 'Cerrada' | 'Pausa' | 'Rechazada'

interface ExpedienteEntry {
  fecha: string
  quien: string
  rol: string
  accion: string
  estado: string
  icono: 'documento' | 'usuario' | 'reloj' | 'check' | 'pause' | 'rejected' | 'lock' | 'route'
  detalles: string
}

interface Tecnico {
  id: string
  nombre: string
  especialidad: string
  disponible: boolean
  cargaActual: number
}

// --- Mock Data ---

const mockTecnicos: Tecnico[] = [
  { id: '1', nombre: 'Carlos Lopez', especialidad: 'Hardware', disponible: true, cargaActual: 2 },
  { id: '2', nombre: 'Ana Martinez', especialidad: 'Software', disponible: true, cargaActual: 1 },
  { id: '3', nombre: 'Roberto Sanchez', especialidad: 'Redes', disponible: false, cargaActual: 5 },
  { id: '4', nombre: 'Laura Torres', especialidad: 'Hardware', disponible: true, cargaActual: 3 },
  { id: '5', nombre: 'Miguel Herrera', especialidad: 'Software', disponible: false, cargaActual: 4 },
]

const coordinaciones = [
  { id: 'redes', nombre: 'Coordinacion de Redes', icono: Network },
  { id: 'mantenimiento', nombre: 'Coordinacion de Mantenimiento', icono: Wrench },
  { id: 'software', nombre: 'Coordinacion de Software', icono: Cpu },
]

const initialExpediente: ExpedienteEntry[] = [
  {
    fecha: '2026-02-06 10:30',
    quien: 'Maria Gonzalez',
    rol: 'Solicitante',
    accion: 'Creo la solicitud de soporte',
    estado: 'Pendiente',
    icono: 'documento',
    detalles: 'Tipo: Hardware, Prioridad: Alta',
  },
]

const priorityColors = {
  Alta: 'bg-red-100 text-red-800',
  Media: 'bg-amber-100 text-amber-800',
  Baja: 'bg-green-100 text-green-800',
}

const stateColors: Record<TicketState, string> = {
  Pendiente: 'bg-slate-100 text-slate-800',
  Asignado: 'bg-blue-100 text-blue-800',
  'En Proceso': 'bg-amber-100 text-amber-800',
  Resuelta: 'bg-green-100 text-green-800',
  Cerrada: 'bg-slate-600 text-white',
  Pausa: 'bg-orange-100 text-orange-800',
  Rechazada: 'bg-red-100 text-red-800',
}

function getNow() {
  const now = new Date()
  return now.toISOString().slice(0, 16).replace('T', ' ')
}

// --- Sub-components ---

function CanalizarModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  onConfirm: (coordinacion: string) => void
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleConfirm = () => {
    const coord = coordinaciones.find((c) => c.id === selectedId)
    if (coord) {
      onConfirm(coord.nombre)
      setSelectedId(null)
    }
  }

  const handleClose = () => {
    setSelectedId(null)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Canalizar Solicitud</DialogTitle>
          <DialogDescription>
            Selecciona la coordinacion responsable de atender esta solicitud.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {coordinaciones.map((coord) => {
            const IconComponent = coord.icono
            return (
              <button
                key={coord.id}
                type="button"
                onClick={() => setSelectedId(coord.id)}
                className={`w-full flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                  selectedId === coord.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-border hover:bg-muted/50 cursor-pointer'
                }`}
              >
                <IconComponent className="h-6 w-6 text-slate-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{coord.nombre}</p>
                </div>
              </button>
            )
          })}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedId}>
            Canalizar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function RechazarModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  onConfirm: (justificacion: string) => void
}) {
  const [justificacion, setJustificacion] = useState('')
  const [error, setError] = useState(false)

  const handleConfirm = () => {
    if (!justificacion.trim()) {
      setError(true)
      return
    }
    onConfirm(justificacion.trim())
    setJustificacion('')
    setError(false)
  }

  const handleClose = () => {
    setJustificacion('')
    setError(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rechazar Solicitud</DialogTitle>
          <DialogDescription>
            Indica el motivo por el cual se rechaza esta solicitud. Este campo es obligatorio.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="justificacion-rechazo">
            Justificacion <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="justificacion-rechazo"
            placeholder="Escribe el motivo del rechazo..."
            value={justificacion}
            onChange={(e) => {
              setJustificacion(e.target.value)
              if (e.target.value.trim()) setError(false)
            }}
            className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
            rows={4}
          />
          {error && (
            <p className="text-sm text-red-500">La justificacion es obligatoria.</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirmar Rechazo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function AsignarModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  onConfirm: (tecnicos: Tecnico[]) => void
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const handleToggle = (id: string) => {
    const newSet = new Set(selectedIds)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      if (newSet.size < 3) {
        newSet.add(id)
      } else {
        toast.error('Limite alcanzado', {
          description: 'Solo puedes seleccionar un maximo de 3 tecnicos.',
        })
        return
      }
    }
    setSelectedIds(newSet)
  }

  const handleConfirm = () => {
    const tecnicos = Array.from(selectedIds)
      .map((id) => mockTecnicos.find((t) => t.id === id))
      .filter((t) => t !== undefined) as Tecnico[]

    if (tecnicos.length > 0) {
      onConfirm(tecnicos)
      setSelectedIds(new Set())
    }
  }

  const handleClose = () => {
    setSelectedIds(new Set())
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Asignar Tecnicos</DialogTitle>
          <DialogDescription>
            Selecciona de 1 a 3 tecnicos disponibles para atender esta solicitud.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {mockTecnicos.map((tecnico) => (
            <label
              key={tecnico.id}
              className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-colors cursor-pointer ${
                selectedIds.has(tecnico.id)
                  ? 'border-blue-500 bg-blue-50'
                  : tecnico.disponible
                    ? 'border-border hover:bg-muted/50'
                    : 'border-border bg-muted/30 opacity-60 cursor-not-allowed'
              }`}
            >
              <Checkbox
                checked={selectedIds.has(tecnico.id)}
                disabled={!tecnico.disponible && !selectedIds.has(tecnico.id)}
                onCheckedChange={() => {
                  if (tecnico.disponible || selectedIds.has(tecnico.id)) {
                    handleToggle(tecnico.id)
                  }
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {tecnico.nombre}
                </p>
                <p className="text-xs text-muted-foreground">{tecnico.especialidad}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground">
                  {tecnico.cargaActual} ticket{tecnico.cargaActual !== 1 ? 's' : ''}
                </span>
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${
                    tecnico.disponible ? 'bg-green-500' : 'bg-red-400'
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Seleccionados: {selectedIds.size}/3
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={selectedIds.size === 0}>
            Asignar {selectedIds.size > 0 ? `(${selectedIds.size})` : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function PausarModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  onConfirm: (justificacion: string) => void
}) {
  const [justificacion, setJustificacion] = useState('')
  const [error, setError] = useState(false)

  const handleConfirm = () => {
    if (!justificacion.trim()) {
      setError(true)
      return
    }
    onConfirm(justificacion.trim())
    setJustificacion('')
    setError(false)
  }

  const handleClose = () => {
    setJustificacion('')
    setError(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pausar Solicitud</DialogTitle>
          <DialogDescription>
            Indica la razon por la cual se pausa esta solicitud. Este campo es obligatorio.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="justificacion-pausa">
            Justificacion <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="justificacion-pausa"
            placeholder="Escribe el motivo de la pausa..."
            value={justificacion}
            onChange={(e) => {
              setJustificacion(e.target.value)
              if (e.target.value.trim()) setError(false)
            }}
            className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
            rows={4}
          />
          {error && (
            <p className="text-sm text-red-500">La justificacion es obligatoria.</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleConfirm}>
            Confirmar Pausa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function FinalizarModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  onConfirm: (reporte: string) => void
}) {
  const [reporte, setReporte] = useState(
    'Diagnostico: Fuente de poder danada.\nAccion: Reemplazo de fuente de poder 500W.\nResultado: Equipo encendido correctamente. Se verifico funcionamiento general.'
  )

  const handleConfirm = () => {
    onConfirm(reporte)
    setReporte('')
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Finalizar y Generar Reporte</DialogTitle>
          <DialogDescription>
            Se generara un reporte de resolucion con los detalles del trabajo realizado.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Reporte Generado</p>
            <Textarea
              value={reporte}
              onChange={(e) => setReporte(e.target.value)}
              rows={5}
              className="text-sm"
            />
          </div>
          <div className="rounded-lg border bg-green-50 p-3">
            <p className="text-xs text-green-700">
              Al confirmar, el estado cambiara a &quot;Resuelta&quot; y el reporte quedara registrado en el expediente.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleConfirm}>
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Finalizar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --- Action Bar ---

function ActionBar({
  estado,
  canalizado,
  tecnicosAsignados,
  onCanalizar,
  onRechazar,
  onAsignar,
  onIniciarAtencion,
  onPausar,
  onFinalizar,
  onCerrar,
  onReanudar,
}: {
  estado: TicketState
  canalizado: boolean
  tecnicosAsignados: Tecnico[]
  onCanalizar: () => void
  onRechazar: () => void
  onAsignar: () => void
  onIniciarAtencion: () => void
  onPausar: () => void
  onFinalizar: () => void
  onCerrar: () => void
  onReanudar: () => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {estado === 'Pendiente' && (
        <>
          <Button variant="destructive" size="sm" onClick={onRechazar}>
            <Ban className="h-4 w-4 mr-1.5" />
            Rechazar
          </Button>
          <Button
            size="sm"
            variant={canalizado ? 'outline' : 'default'}
            onClick={onCanalizar}
          >
            <Route className="h-4 w-4 mr-1.5" />
            Canalizar
          </Button>
          {canalizado && (
            <Button
              size="sm"
              variant={tecnicosAsignados.length > 0 ? 'outline' : 'default'}
              onClick={onAsignar}
            >
              <UserPlus className="h-4 w-4 mr-1.5" />
              Asignar
            </Button>
          )}
        </>
      )}
      {estado === 'Asignado' && (
        <>
          <Button
            size="sm"
            variant="outline"
            onClick={onAsignar}
          >
            <UserPlus className="h-4 w-4 mr-1.5" />
            Asignar
          </Button>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={onIniciarAtencion}
          >
            <Play className="h-4 w-4 mr-1.5" />
            Iniciar Atencion
          </Button>
        </>
      )}
      {estado === 'En Proceso' && (
        <>
          <Button
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={onPausar}
          >
            <Pause className="h-4 w-4 mr-1.5" />
            Pausar
          </Button>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={onFinalizar}
          >
            <ClipboardCheck className="h-4 w-4 mr-1.5" />
            Finalizar
          </Button>
        </>
      )}
      {estado === 'Pausa' && (
        <Button size="sm" onClick={onReanudar}>
          <Play className="h-4 w-4 mr-1.5" />
          Reanudar
        </Button>
      )}
      {estado === 'Resuelta' && (
        <Button
          size="sm"
          className="bg-slate-700 hover:bg-slate-800 text-white"
          onClick={onCerrar}
        >
          <Lock className="h-4 w-4 mr-1.5" />
          Cerrar Ticket
        </Button>
      )}
    </div>
  )
}

// --- Timeline ---

function TimelineIcon({ icono }: { icono: ExpedienteEntry['icono'] }) {
  const iconMap = {
    documento: { icon: <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />, bg: 'bg-blue-100' },
    usuario: { icon: <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />, bg: 'bg-blue-100' },
    reloj: { icon: <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />, bg: 'bg-amber-100' },
    check: { icon: <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />, bg: 'bg-green-100' },
    pause: { icon: <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-600" />, bg: 'bg-orange-100' },
    rejected: { icon: <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600" />, bg: 'bg-red-100' },
    lock: { icon: <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-600" />, bg: 'bg-slate-100' },
    route: { icon: <Route className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />, bg: 'bg-purple-100' },
  }
  const config = iconMap[icono] ?? iconMap.documento
  return (
    <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
      {config.icon}
    </div>
  )
}

// --- ActionBar ---

function ActionBar({
  estado,
  canalizado,
  tecnicosAsignados,
  onCanalizar,
  onRechazar,
  onAsignar,
  onIniciarAtencion,
  onPausar,
  onFinalizar,
  onCerrar,
  onReanudar,
}: {
  estado: TicketState
  canalizado: boolean
  tecnicosAsignados: Tecnico[]
  onCanalizar: () => void
  onRechazar: () => void
  onAsignar: () => void
  onIniciarAtencion: () => void
  onPausar: () => void
  onFinalizar: () => void
  onCerrar: () => void
  onReanudar: () => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {estado === 'Pendiente' && (
        <>
          <Button size="sm" onClick={onCanalizar} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Route className="h-4 w-4 mr-1.5" />
            Canalizar
          </Button>
          <Button size="sm" variant="destructive" onClick={onRechazar}>
            <Ban className="h-4 w-4 mr-1.5" />
            Rechazar
          </Button>
        </>
      )}
      {estado === 'Asignado' && (
        <>
          <Button
            size="sm"
            variant="outline"
            onClick={onAsignar}
          >
            <UserPlus className="h-4 w-4 mr-1.5" />
            Asignar
          </Button>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={onIniciarAtencion}
          >
            <Play className="h-4 w-4 mr-1.5" />
            Iniciar Atencion
          </Button>
        </>
      )}
      {canalizado && estado === 'Pendiente' && (
        <Button
          size="sm"
          variant="outline"
          onClick={onAsignar}
        >
          <UserPlus className="h-4 w-4 mr-1.5" />
          Asignar
        </Button>
      )}
      {estado === 'En Proceso' && (
        <>
          <Button size="sm" variant="outline" onClick={onPausar} className="border-orange-500 text-orange-600 hover:bg-orange-50">
            <Pause className="h-4 w-4 mr-1.5" />
            Pausar
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={onFinalizar}>
            <CheckCircle2 className="h-4 w-4 mr-1.5" />
            Finalizar
          </Button>
        </>
      )}
      {estado === 'Pausa' && (
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onReanudar}
        >
          <Play className="h-4 w-4 mr-1.5" />
          Reanudar
        </Button>
      )}
      {estado === 'Resuelta' && (
        <Button size="sm" className="bg-slate-600 hover:bg-slate-700 text-white" onClick={onCerrar}>
          <Lock className="h-4 w-4 mr-1.5" />
          Cerrar Ticket
        </Button>
      )}
    </div>
  )
}

// --- Main Page ---

const TicketDetailPage = () => {
  const router = useRouter()

  const [estado, setEstado] = useState<TicketState>('Pendiente')
  const [canalizado, setCanalizado] = useState(false)
  const [canalizacionSeleccionada, setCanalizacionSeleccionada] = useState<string | null>(null)
  const [tecnicosAsignados, setTecnicosAsignados] = useState<Tecnico[]>([])
  const [expediente, setExpediente] = useState<ExpedienteEntry[]>(initialExpediente)

  // Modal states
  const [showCanalizar, setShowCanalizar] = useState(false)
  const [showRechazar, setShowRechazar] = useState(false)
  const [showAsignar, setShowAsignar] = useState(false)
  const [showPausar, setShowPausar] = useState(false)
  const [showFinalizar, setShowFinalizar] = useState(false)

  const addExpedienteEntry = (entry: ExpedienteEntry) => {
    setExpediente((prev) => [...prev, entry])
  }

  // --- Handlers ---

  const handleCanalizar = (coordinacion: string) => {
    setCanalizado(true)
    setCanalizacionSeleccionada(coordinacion)
    addExpedienteEntry({
      fecha: getNow(),
      quien: 'Coordinador TI',
      rol: 'Administrador',
      accion: `Canalizo la solicitud a ${coordinacion}`,
      estado: 'Pendiente',
      icono: 'route',
      detalles: `Coordinacion asignada: ${coordinacion}`,
    })
    setShowCanalizar(false)
    toast.success('Solicitud canalizada', {
      description: `Se ha canalizado a ${coordinacion}.`,
    })
  }

  const handleRechazar = (justificacion: string) => {
    setEstado('Rechazada')
    addExpedienteEntry({
      fecha: getNow(),
      quien: 'Coordinador TI',
      rol: 'Administrador',
      accion: `Rechazo la solicitud: "${justificacion}"`,
      estado: 'Rechazada',
      icono: 'rejected',
      detalles: `Justificacion: ${justificacion}`,
    })
    setShowRechazar(false)
    toast.error('Solicitud rechazada', {
      description: 'La solicitud ha sido rechazada correctamente.',
    })
  }

  const handleAsignar = (tecnicos: Tecnico[]) => {
    setTecnicosAsignados(tecnicos)
    setEstado('Asignado')
    const tecnicosStr = tecnicos.map((t) => t.nombre).join(', ')
    addExpedienteEntry({
      fecha: getNow(),
      quien: 'Coordinador TI',
      rol: 'Administrador',
      accion: `Asigno ${tecnicos.length} tecnico(s): ${tecnicosStr}`,
      estado: 'Asignado',
      icono: 'usuario',
      detalles: `Tecnicos asignados: ${tecnicos.map((t) => `${t.nombre} (${t.especialidad})`).join(', ')}`,
    })
    setShowAsignar(false)
    toast.success('Tecnicos asignados', {
      description: `${tecnicosStr} ha(n) sido asignado(s) a esta solicitud.`,
    })
  }

  const handleIniciarAtencion = () => {
    setEstado('En Proceso')
    const tecnicosStr = tecnicosAsignados.map((t) => t.nombre).join(', ')
    addExpedienteEntry({
      fecha: getNow(),
      quien: 'Coordinador TI',
      rol: 'Administrador',
      accion: `Inicio la atencion con los tecnicos: ${tecnicosStr}`,
      estado: 'En Proceso',
      icono: 'reloj',
      detalles: 'Diagnostico inicial en curso',
    })
    toast.success('Atencion iniciada', {
      description: 'El ticket ahora esta En Proceso.',
    })
  }

  const handlePausar = (justificacion: string) => {
    setEstado('Pausa')
    addExpedienteEntry({
      fecha: getNow(),
      quien: 'Coordinador TI',
      rol: 'Administrador',
      accion: `Pauso la solicitud: "${justificacion}"`,
      estado: 'Pausa',
      icono: 'pause',
      detalles: `Justificacion: ${justificacion}`,
    })
    setShowPausar(false)
    toast.warning('Solicitud pausada', {
      description: 'La solicitud ha sido pausada temporalmente.',
    })
  }

  const handleFinalizar = (reporte: string) => {
    setEstado('Resuelta')
    addExpedienteEntry({
      fecha: getNow(),
      quien: tecnicosAsignados[0]?.nombre ?? 'Tecnico',
      rol: 'Tecnico',
      accion: 'Finalizo y genero reporte de resolucion',
      estado: 'Resuelta',
      icono: 'check',
      detalles: reporte,
    })
    setShowFinalizar(false)
    toast.success('Solicitud resuelta', {
      description: 'El reporte de resolucion ha sido generado.',
    })
  }

  const handleCerrar = () => {
    setEstado('Cerrada')
    addExpedienteEntry({
      fecha: getNow(),
      quien: 'Coordinador TI',
      rol: 'Administrador',
      accion: 'Cerro el ticket',
      estado: 'Cerrada',
      icono: 'lock',
      detalles: 'Ticket cerrado. Encuesta de satisfaccion enviada al solicitante.',
    })
    toast.success('Ticket cerrado - Encuesta enviada', {
      description: 'Se ha enviado una encuesta de satisfaccion al solicitante.',
      duration: 5000,
    })
  }

  const handleReanudar = () => {
    setEstado('Asignado')
    setTecnicosAsignados([])
    setShowAsignar(true)
    addExpedienteEntry({
      fecha: getNow(),
      quien: 'Coordinador TI',
      rol: 'Administrador',
      accion: 'Reanudo la solicitud - Esperando nueva asignacion de tecnicos',
      estado: 'Asignado',
      icono: 'reloj',
      detalles: 'La solicitud fue reanudada. Requiere nueva asignacion de tecnicos.',
    })
    toast.info('Solicitud reanudada', {
      description: 'Selecciona nuevos tecnicos para continuar con la atencion.',
    })
  }

  // --- Static ticket data ---
  const ticket = {
    folio: 'SOP-2026-001',
    titulo: 'Computadora no enciende - Oficina 101',
    fecha: '03/02/2026 10:30',
    prioridad: 'Alta' as const,
    nombreAfectado: 'Maria Gonzalez Hernandez',
    departamento: 'Subdireccion Academica',
    correoContacto: 'maria.gonzalez@ito.edu.mx',
    areaSolicitante: 'Subdireccion Academica',
    horarioDisponible: '08:00 - 10:00',
    equipo: 'INV-ITO-1024',
    tipoProblema: 'Hardware',
    descripcion:
      'La computadora de la oficina 101 no enciende. Se probo con otros cables de poder pero no responde. No hay indicadores de luz en la torre.',
    fotografias: [] as string[],
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-2 py-4 sm:px-4 md:px-6 lg:px-8 lg:py-8">
        {/* Back Button and Title Section */}
        <div className="mb-6 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/solicitudes')}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Volver al listado</span>
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              Detalles de la Solicitud
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Visualiza el estado y detalles de tu solicitud de soporte tecnico
            </p>
          </div>
        </div>

        {/* Ticket Header Card */}
        <Card className="w-full border mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">{ticket.folio}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{ticket.departamento}</p>
                {canalizacionSeleccionada && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Canalizado a: <span className="font-medium text-foreground">{canalizacionSeleccionada}</span>
                  </p>
                )}
                {tecnicosAsignados.length > 0 && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Asignado a: <span className="font-medium text-foreground">{tecnicosAsignados.map((t) => t.nombre).join(', ')}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start sm:items-end">
                <div className="flex flex-wrap gap-2">
                  <Badge className={stateColors[estado]}>{estado}</Badge>
                  <Badge className={priorityColors[ticket.prioridad]}>
                    Prioridad {ticket.prioridad}
                  </Badge>
                </div>
                <div className="mt-1">
                  <ActionBar
                    estado={estado}
                    canalizado={canalizado}
                    tecnicosAsignados={tecnicosAsignados}
                    onCanalizar={() => setShowCanalizar(true)}
                    onRechazar={() => setShowRechazar(true)}
                    onAsignar={() => setShowAsignar(true)}
                    onIniciarAtencion={handleIniciarAtencion}
                    onPausar={() => setShowPausar(true)}
                    onFinalizar={() => setShowFinalizar(true)}
                    onCerrar={handleCerrar}
                    onReanudar={handleReanudar}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stepper */}
        <div className="mb-6 hidden md:block">
          <TicketStepper currentState={estado} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Timeline */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Historico de Cambios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 grid-cols-[auto_1fr] sm:gap-6">
                  {/* Timeline and Icons Column */}
                  <div className="flex flex-col items-center">
                    {expediente.map((evento, idx) => {
                      const isLastItem = idx === expediente.length - 1
                      return (
                        <React.Fragment key={idx}>
                          <TimelineIcon icono={evento.icono} />
                          {!isLastItem && (
                            <div className="w-px bg-slate-200 flex-1 min-h-12 sm:min-h-16" />
                          )}
                        </React.Fragment>
                      )
                    })}
                  </div>

                  {/* Information Column */}
                  <div className="space-y-4 sm:space-y-6 sm:pl-4">
                    {expediente.map((evento, idx) => (
                      <div key={idx} className="pt-0.5">
                        <h3 className="text-xs font-semibold text-foreground uppercase leading-tight break-words mb-2">
                          {evento.estado}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 break-words">
                          <span className="font-medium text-foreground">{evento.quien}</span>
                          <span className="mx-1">{'\u2022'}</span>
                          <span>{evento.rol}</span>
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground break-words">
                          {evento.fecha}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Informacion del Solicitante */}
            <Card>
              <CardHeader>
                <CardTitle>Informacion del Solicitante</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Nombre</p>
                    <p className="text-sm font-medium text-foreground mt-1">{ticket.nombreAfectado}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Departamento</p>
                    <p className="text-sm font-medium text-foreground mt-1">{ticket.departamento}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Correo</p>
                    <p className="text-sm font-medium text-blue-600 mt-1">{ticket.correoContacto}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Area Solicitante</p>
                    <p className="text-sm font-medium text-foreground mt-1">{ticket.areaSolicitante}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Horario Disponible</p>
                    <p className="text-sm font-medium text-foreground mt-1">{ticket.horarioDisponible}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detalles del Problema */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles del Problema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Tipo de Problema</p>
                  <p className="text-sm font-medium text-foreground mt-1">{ticket.tipoProblema}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Descripcion</p>
                  <p className="text-sm text-foreground leading-relaxed">{ticket.descripcion}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                    Fotografia o Evidencia
                  </p>
                  {ticket.fotografias && ticket.fotografias.length > 0 ? (
                    <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
                      {ticket.fotografias.map((foto, idx) => (
                        <div key={idx} className="rounded-lg border overflow-hidden bg-slate-50">
                          <img
                            src={foto || '/placeholder.svg'}
                            alt={`Evidencia ${idx + 1}`}
                            className="w-full h-32 object-cover"
                            crossOrigin="anonymous"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                      <p className="text-sm text-muted-foreground">No hay fotografias adjuntas</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CanalizarModal
        open={showCanalizar}
        onClose={() => setShowCanalizar(false)}
        onConfirm={handleCanalizar}
      />
      <RechazarModal
        open={showRechazar}
        onClose={() => setShowRechazar(false)}
        onConfirm={handleRechazar}
      />
      <AsignarModal
        open={showAsignar}
        onClose={() => setShowAsignar(false)}
        onConfirm={handleAsignar}
      />
      <PausarModal
        open={showPausar}
        onClose={() => setShowPausar(false)}
        onConfirm={handlePausar}
      />
      <FinalizarModal
        open={showFinalizar}
        onClose={() => setShowFinalizar(false)}
        onConfirm={handleFinalizar}
      />
    </div>
  )
}

export default TicketDetailPage
