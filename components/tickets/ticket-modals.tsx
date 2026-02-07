'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface RejectionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (justificacion: string) => void
  isLoading?: boolean
}

export function RejectionModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: RejectionModalProps) {
  const [justificacion, setJustificacion] = useState('')

  const handleConfirm = () => {
    if (justificacion.trim()) {
      onConfirm(justificacion)
      setJustificacion('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-900">Rechazar Solicitud</DialogTitle>
          <DialogDescription className="text-red-800">
            Por favor, proporciona una justificación clara para el rechazo de esta solicitud.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="justificacion">Justificación *</Label>
            <Textarea
              id="justificacion"
              placeholder="Explica por qué se rechaza esta solicitud..."
              value={justificacion}
              onChange={(e) => setJustificacion(e.target.value)}
              rows={5}
              className="resize-none"
            />
            {justificacion.length === 0 && (
              <p className="text-xs text-red-600">La justificación es obligatoria</p>
            )}
            <p className="text-xs text-muted-foreground">
              {justificacion.length}/500 caracteres
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!justificacion.trim() || isLoading}
          >
            {isLoading ? 'Rechazando...' : 'Rechazar Solicitud'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface PauseModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (justificacion: string) => void
  isLoading?: boolean
}

export function PauseModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: PauseModalProps) {
  const [justificacion, setJustificacion] = useState('')

  const handleConfirm = () => {
    if (justificacion.trim()) {
      onConfirm(justificacion)
      setJustificacion('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-orange-900">Pausar Solicitud</DialogTitle>
          <DialogDescription className="text-orange-800">
            Indica el motivo de la pausa en el procesamiento de esta solicitud.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="justificacion">Motivo de la Pausa *</Label>
            <Textarea
              id="justificacion"
              placeholder="Explica por qué se pausa esta solicitud..."
              value={justificacion}
              onChange={(e) => setJustificacion(e.target.value)}
              rows={5}
              className="resize-none"
            />
            {justificacion.length === 0 && (
              <p className="text-xs text-orange-600">El motivo es obligatorio</p>
            )}
            <p className="text-xs text-muted-foreground">
              {justificacion.length}/500 caracteres
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!justificacion.trim() || isLoading}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isLoading ? 'Pausando...' : 'Pausar Solicitud'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
