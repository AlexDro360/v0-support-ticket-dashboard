'use client'

import { useState } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface ConfirmarBajaEquipoDialogProps {
  open: boolean
  equipo: {
    id: string
    numeroInventario: string
    marca: string
    modelo: string
    responsable: string
  } | null
  isLoading?: boolean
  onConfirm: () => void
  onOpenChange: (open: boolean) => void
}

export function ConfirmarBajaEquipoDialog({
  open,
  equipo,
  isLoading = false,
  onConfirm,
  onOpenChange,
}: ConfirmarBajaEquipoDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <AlertDialogTitle>Dar de baja equipo</AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription className="space-y-4">
          <div>
            <p className="font-medium text-foreground">
              ¿Estás seguro de que deseas dar de baja este equipo?
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Esta acción cambiar el estado del equipo a &quot;Baja&quot; pero no lo eliminar de la base de datos.
            </p>
          </div>

          {equipo && (
            <div className="rounded-lg bg-muted/50 p-3 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">No. Inventario</p>
                  <p className="font-mono font-medium">{equipo.numeroInventario}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Marca / Modelo</p>
                  <p className="font-medium text-sm">{equipo.marca} {equipo.modelo}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Responsable</p>
                <p className="font-medium text-sm">{equipo.responsable}</p>
              </div>
            </div>
          )}
        </AlertDialogDescription>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel disabled={isLoading}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Dando de baja...
              </>
            ) : (
              'Confirmar baja'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
