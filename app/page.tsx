"use client"

import Link from "next/link"
import {
  Headset,
  ArrowRight,
  CheckCircle2,
  Zap,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Zap,
    title: "Soporte Rápido",
    description: "Crea solicitudes y recibe asistencia técnica de forma inmediata",
  },
  {
    icon: CheckCircle2,
    title: "Seguimiento Transparente",
    description: "Monitorea el progreso de tus solicitudes en tiempo real",
  },
  {
    icon: MessageSquare,
    title: "Asistente Inteligente",
    description: "Consulta nuestro chatbot con IA para respuestas inmediatas",
  },
]

const quickAccessCards = [
  {
    icon: Zap,
    title: "Solicitudes",
    description: "Accede a tus solicitudes de soporte",
    href: "/solicitudes",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: CheckCircle2,
    title: "Inventario",
    description: "Gestiona el inventario de equipos",
    href: "/inventario",
    color: "from-green-500 to-teal-600",
  },
  {
    icon: MessageSquare,
    title: "Documentación",
    description: "Consulta la documentación técnica",
    href: "/documentacion",
    color: "from-orange-500 to-yellow-600",
  },
  {
    icon: Headset,
    title: "Chatbot",
    description: "Habla con nuestro asistente inteligente",
    href: "/chatbot",
    color: "from-pink-500 to-purple-600",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* Hero Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Bienvenido al Portal de Servicios
              </h1>
              <p className="text-xl text-slate-600">
                del Centro de Cómputo
              </p>
            </div>
            <p className="text-lg leading-8 text-slate-600">
              Optimización y soporte tecnológico para la comunidad del Instituto Tecnológico de Oaxaca. Accede a nuestros servicios de soporte técnico, gestión de inventarios y documentación.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/solicitudes">
                <Button size="lg" className="w-full sm:w-auto">
                  Ver Solicitudes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/soporte/nueva-solicitud">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Nueva Solicitud
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image Area */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white shadow-2xl">
              <div className="flex h-full flex-col items-center justify-center space-y-4">
                <Headset className="h-24 w-24 opacity-80" />
                <p className="text-center text-lg font-semibold">
                  Soporte Técnico Profesional
                </p>
                <p className="text-center text-sm opacity-90">
                  Centro de Cómputo - ITO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Características Principales
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="flex flex-col items-start space-y-4 rounded-lg border border-slate-200 p-6"
                >
                  <div className="rounded-lg bg-blue-100 p-2">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h4 className="font-semibold text-slate-900">Centro de Cómputo</h4>
              <p className="mt-2 text-sm text-slate-600">
                Instituto Tecnológico de Oaxaca
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Horario</h4>
              <p className="mt-2 text-sm text-slate-600">
                Lunes a Viernes: 8:00 - 18:00 hrs
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Contacto</h4>
              <p className="mt-2 text-sm text-slate-600">
                soporte@ito.edu.mx
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
