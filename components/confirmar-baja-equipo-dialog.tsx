'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
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

export interface EquipoBasico {
  id: string
  numeroInventario: string
  marca: string
  modelo: string
  responsable: string
}

interface ConfirmarBajaEquipoDialogProps {
  open: boolean
  equipo: EquipoBasico | null
  isLoading?: boolean
  onConfirm: () => void | Promise<void>
  onOpenChange: (open: boolean) => void
}

function DetallesEquipo({ equipo }: { equipo: EquipoBasico }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3 space-y-2">
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">No. Inventario</p>
          <p className="font-mono font-medium text-foreground">{equipo.numeroInventario}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Marca / Modelo</p>
          <p className="font-medium text-sm text-foreground">
            {equipo.marca} {equipo.modelo}
          </p>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Responsable</p>
        <p className="font-medium text-sm text-foreground">{equipo.responsable}</p>
      </div>
    </div>
  )
}

export function ConfirmarBajaEquipoDialog({
  open,
  equipo,
  isLoading = false,
  onConfirm,
  onOpenChange,
}: ConfirmarBajaEquipoDialogProps) {
  if (!equipo) {
    return null
  }

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
        <AlertDialogDescription asChild>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-foreground">
                ¿Estás seguro de que deseas dar de baja este equipo?
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Esta acción cambiará el estado del equipo a &quot;Baja&quot; pero no lo eliminará de la base de datos.
              </p>
            </div>

            <DetallesEquipo equipo={equipo} />
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel disabled={isLoading} className="sm:order-1">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 sm:order-2"
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
