'use client'

import { Check, AlertCircle, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepperProps {
  currentState: 'Pendiente' | 'Asignada' | 'En Proceso' | 'Resuelta' | 'Cerrada' | 'Pausa' | 'Rechazada'
}

const steps = [
  { id: 1, label: 'Pendiente', state: 'Pendiente' },
  { id: 2, label: 'Asignada', state: 'Asignada' },
  { id: 3, label: 'En Proceso', state: 'En Proceso' },
  { id: 4, label: 'Resuelta', state: 'Resuelta' },
  { id: 5, label: 'Cerrada', state: 'Cerrada' },
]

const exceptionStates = ['Pausa', 'Rechazada']

export function TicketStepper({ currentState }: StepperProps) {
  const currentStepIndex = steps.findIndex((s) => s.state === currentState)
  const isException = exceptionStates.includes(currentState)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-1 md:gap-2">
        {steps.map((step, index) => {
          const isPassed = index < currentStepIndex
          const isCurrent = index === currentStepIndex && !isException
          const isFuture = index > currentStepIndex

          return (
            <div key={step.id} className="flex flex-1 items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    'flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border-2 transition-all',
                    isPassed && 'border-green-500 bg-green-500',
                    isCurrent && 'border-blue-500 bg-blue-50',
                    isFuture && 'border-slate-300 bg-slate-50'
                  )}
                >
                  {isPassed && <Check className="h-4 w-4 md:h-5 md:w-5 text-white" />}
                  {isCurrent && (
                    <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-blue-500 animate-pulse" />
                  )}
                  {isFuture && <Circle className="h-4 w-4 md:h-5 md:w-5 text-slate-400" />}
                </div>
                <span className="mt-2 text-center text-xs md:text-sm font-medium text-foreground">
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-1 md:mx-2 rounded-full transition-all',
                    isPassed && 'bg-green-500',
                    !isPassed && 'bg-slate-200'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Exception Alert */}
      {isException && (
        <div
          className={cn(
            'mt-4 p-3 rounded-lg flex items-center gap-2',
            currentState === 'Pausa' && 'bg-orange-50 border border-orange-200',
            currentState === 'Rechazada' && 'bg-red-50 border border-red-200'
          )}
        >
          <AlertCircle
            className={cn(
              'h-5 w-5 flex-shrink-0',
              currentState === 'Pausa' && 'text-orange-600',
              currentState === 'Rechazada' && 'text-red-600'
            )}
          />
          <div>
            <p
              className={cn(
                'text-sm font-semibold',
                currentState === 'Pausa' && 'text-orange-900',
                currentState === 'Rechazada' && 'text-red-900'
              )}
            >
              {currentState === 'Pausa'
                ? 'Solicitud en Pausa'
                : 'Solicitud Rechazada'}
            </p>
            <p
              className={cn(
                'text-xs mt-1',
                currentState === 'Pausa' && 'text-orange-800',
                currentState === 'Rechazada' && 'text-red-800'
              )}
            >
              Esta solicitud ha sido{' '}
              {currentState === 'Pausa' ? 'pausada' : 'rechazada'}. Verifica los
              detalles en el historial.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
