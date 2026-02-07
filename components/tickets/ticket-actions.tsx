'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { X, Plus } from 'lucide-react'
import { RejectionModal, PauseModal } from './ticket-modals'

interface TicketActionsProps {
  ticket: {
    id: string
    folio: string
    estado: 'Pendiente' | 'Asignada' | 'En Proceso' | 'Resuelta' | 'Cerrada' | 'Pausa' | 'Rechazada'
    asignadoA?: string
    diagnostico?: string
    materialesUsados?: Array<{ nombre: string; cantidad: number }>
  }
  onStateChange: (newState: any) => void
}

const technicians = [
  { id: '1', name: 'Carlos López', disponible: true },
  { id: '2', name: 'María García', disponible: true },
  { id: '3', name: 'Roberto Sánchez', disponible: false },
  { id: '4', name: 'Ana Martínez', disponible: true },
]

export function TicketActions({ ticket, onStateChange }: TicketActionsProps) {
  const [materials, setMaterials] = useState(ticket.materialesUsados || [])
  const [newMaterial, setNewMaterial] = useState('')
  const [newQuantity, setNewQuantity] = useState(1)
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false)
  const [pauseModalOpen, setPauseModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const addMaterial = () => {
    if (newMaterial.trim()) {
      setMaterials([...materials, { nombre: newMaterial, cantidad: newQuantity }])
      setNewMaterial('')
      setNewQuantity(1)
    }
  }

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index))
  }

  const handleReject = (justificacion: string) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log('[v0] Solicitud rechazada con justificación:', justificacion)
      onStateChange('Rechazada')
      setRejectionModalOpen(false)
      setIsLoading(false)
    }, 1000)
  }

  const handlePause = (justificacion: string) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log('[v0] Solicitud pausada con justificación:', justificacion)
      onStateChange('Pausa')
      setPauseModalOpen(false)
      setIsLoading(false)
    }, 1000)
  }

  // Panel for Pending state - Admin
  if (ticket.estado === 'Pendiente') {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Acciones Disponibles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Selecciona una acción para procesar esta solicitud
            </p>
            <div className="flex flex-col gap-3 md:flex-row">
              <Button
                className="flex-1"
                onClick={() => onStateChange('Asignada')}
              >
                Canalizar Solicitud
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => setRejectionModalOpen(true)}
              >
                Rechazar
              </Button>
            </div>
          </CardContent>
        </Card>
        <RejectionModal
          isOpen={rejectionModalOpen}
          onClose={() => setRejectionModalOpen(false)}
          onConfirm={handleReject}
          isLoading={isLoading}
        />
      </>
    )
  }

  // Panel for Asignada state - Assign to technician
  if (ticket.estado === 'Asignada') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Asignación de Técnico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm">Técnicos Disponibles</Label>
            <div className="space-y-2">
              {technicians.map((tech) => (
                <Button
                  key={tech.id}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  disabled={!tech.disponible}
                  onClick={() => {
                    onStateChange('En Proceso')
                  }}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span>{tech.name}</span>
                    <Badge
                      variant="secondary"
                      className={
                        tech.disponible
                          ? 'bg-green-100 text-green-800 ml-auto'
                          : 'bg-slate-100 text-slate-800 ml-auto'
                      }
                    >
                      {tech.disponible ? 'Disponible' : 'Ocupado'}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Panel for En Proceso state - Technician work
  if (ticket.estado === 'En Proceso') {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Panel de Trabajo - En Proceso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Equipment */}
            <div className="space-y-2">
              <Label htmlFor="inventarioNum" className="text-sm">
                Búsqueda de Equipo por Num. Inventario
              </Label>
              <div className="flex gap-2">
                <Input
                  id="inventarioNum"
                  placeholder="Ej: INV-ITO-001"
                  className="flex-1"
                />
                <Button variant="outline">Buscar</Button>
              </div>
            </div>

            {/* Diagnostico */}
            <div className="space-y-2">
              <Label htmlFor="diagnostico" className="text-sm">
                Diagnóstico
              </Label>
              <textarea
                id="diagnostico"
                placeholder="Describe el diagnóstico del problema..."
                defaultValue={ticket.diagnostico || ''}
                className="w-full h-24 p-2 border rounded-lg text-sm"
              />
            </div>

            {/* Materials Used */}
            <div className="space-y-3">
              <Label className="text-sm">Materiales Utilizados</Label>
              {materials.length > 0 && (
                <div className="space-y-2 mb-3">
                  {materials.map((material, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded"
                    >
                      <span className="text-sm">
                        {material.nombre} x {material.cantidad}
                      </span>
                      <button
                        onClick={() => removeMaterial(index)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Material */}
              <div className="flex gap-2">
                <Input
                  placeholder="Nombre del material"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Cantidad"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(Number(e.target.value))}
                  className="w-20"
                />
                <Button size="sm" onClick={addMaterial}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 md:flex-row">
              <Button
                className="flex-1"
                onClick={() => onStateChange('Resuelta')}
              >
                Finalizar y Generar Reporte
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => setPauseModalOpen(true)}
              >
                Pausar Solicitud
              </Button>
            </div>
          </CardContent>
        </Card>
        <PauseModal
          isOpen={pauseModalOpen}
          onClose={() => setPauseModalOpen(false)}
          onConfirm={handlePause}
          isLoading={isLoading}
        />
      </>
    )
  }

  // Panel for Resuelta state - Confirm closure
  if (ticket.estado === 'Resuelta') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-900">Solicitud Resuelta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-green-800">
            La solicitud ha sido resuelta. El coordinador puede proceder al cierre.
          </p>
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => onStateChange('Cerrada')}
          >
            Cerrar Solicitud
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Default state
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado Actual</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Solicitud en estado: {ticket.estado}
        </p>
      </CardContent>
    </Card>
  )
}
