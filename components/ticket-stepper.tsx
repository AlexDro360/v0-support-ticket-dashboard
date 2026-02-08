'use client'

import React from 'react'
import { CheckCircle2, AlertCircle, Pause, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TicketState = 'Pendiente' | 'Asignado' | 'En Proceso' | 'Resuelta' | 'Cerrada' | 'Pausa' | 'Rechazada'

interface TicketStepperProps {
  currentState: TicketState
  className?: string
}

const stepsOrder: TicketState[] = ['Pendiente', 'Asignado', 'En Proceso', 'Resuelta', 'Cerrada']

const getStepNumber = (state: TicketState): number => {
  const index = stepsOrder.indexOf(state as any)
  return index >= 0 ? index : -1
}

const getStepConfig = (state: TicketState) => {
  switch (state) {
    case 'Pendiente':
      return { label: 'Pendiente', icon: 'pending', color: 'from-slate-400 to-slate-500' }
    case 'Asignado':
      return { label: 'Asignado', icon: 'assigned', color: 'from-blue-400 to-blue-500' }
    case 'En Proceso':
      return { label: 'En Proceso', icon: 'process', color: 'from-amber-400 to-amber-500' }
    case 'Resuelta':
      return { label: 'Resuelta', icon: 'resolved', color: 'from-green-400 to-green-500' }
    case 'Cerrada':
      return { label: 'Cerrada', icon: 'closed', color: 'from-slate-600 to-slate-700' }
    case 'Pausa':
      return { label: 'Pausa', icon: 'pause', color: 'from-orange-400 to-orange-500' }
    case 'Rechazada':
      return { label: 'Rechazada', icon: 'rejected', color: 'from-red-400 to-red-500' }
    default:
      return { label: 'Desconocido', icon: 'unknown', color: 'from-slate-300 to-slate-400' }
  }
}

export function TicketStepper({ currentState, className }: TicketStepperProps) {
  const isExceptionalState = currentState === 'Pausa' || currentState === 'Rechazada'
  const currentStepNumber = getStepNumber(currentState)

  return (
    <div className={cn('w-full bg-card rounded-lg border p-6', className)}>
      {/* Exceptional State Alert */}
      {isExceptionalState && (
        <div className={cn(
          'mb-6 p-4 rounded-lg border-l-4 flex items-start gap-3',
          currentState === 'Pausa'
            ? 'bg-orange-50 border-orange-400'
            : 'bg-red-50 border-red-400'
        )}>
          {currentState === 'Pausa' ? (
            <Pause className={cn(
              'h-5 w-5 flex-shrink-0 mt-0.5',
              'text-orange-600'
            )} />
          ) : (
            <XCircle className={cn(
              'h-5 w-5 flex-shrink-0 mt-0.5',
              'text-red-600'
            )} />
          )}
          <div className="flex-1">
            <p className={cn(
              'font-semibold text-sm',
              currentState === 'Pausa'
                ? 'text-orange-900'
                : 'text-red-900'
            )}>
              {currentState === 'Pausa'
                ? 'Solicitud en Pausa'
                : 'Solicitud Rechazada'}
            </p>
            <p className={cn(
              'text-xs mt-1',
              currentState === 'Pausa'
                ? 'text-orange-800'
                : 'text-red-800'
            )}>
              {currentState === 'Pausa'
                ? 'Esta solicitud ha sido pausada temporalmente.'
                : 'Esta solicitud ha sido rechazada.'}
            </p>
          </div>
        </div>
      )}

      {/* Stepper */}
      <div className="relative">
        {/* Background connector line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-slate-200 rounded-full" />

        {/* Filled connector line (progress) */}
        {!isExceptionalState && currentStepNumber >= 0 && (
          <div
            className="absolute top-5 left-0 h-1 bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300"
            style={{
              width: currentStepNumber === 0 ? '0%' : `${(currentStepNumber / (stepsOrder.length - 1)) * 100}%`
            }}
          />
        )}

        {/* Steps container */}
        <div className="relative flex justify-between gap-2">
          {stepsOrder.map((step, index) => {
            const isCompleted = currentStepNumber > index
            const isCurrent = currentStepNumber === index
            const isFuture = currentStepNumber < index

            return (
              <div key={step} className="flex flex-col items-center gap-2 flex-1">
                {/* Step circle */}
                <button
                  disabled
                  className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 relative z-10 flex-shrink-0',
                    isCompleted && 'bg-green-100 text-green-700 shadow-sm border border-green-200',
                    isCurrent && 'bg-blue-100 text-blue-700 shadow-sm border border-blue-200 ring-2 ring-blue-300',
                    isFuture && 'bg-slate-100 text-slate-500 border border-slate-200'
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>

                {/* Step label */}
                <span
                  className={cn(
                    'text-xs font-medium text-center',
                    isCompleted && 'text-green-700',
                    isCurrent && 'text-blue-700',
                    isFuture && 'text-slate-500'
                  )}
                >
                  {step}
                </span>
              </div>
            )
          })}
        </div>

        {/* Exceptional state indicator */}
        {isExceptionalState && (
          <div className="absolute top-5 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-slate-200 to-slate-200 rounded-full" />
        )}
      </div>
    </div>
  )
}
