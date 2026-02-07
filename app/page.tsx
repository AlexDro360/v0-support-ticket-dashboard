"use client"

import Link from "next/link"
import {
  Headset,
  FileText,
  HardDrive,
  BookOpen,
  AlertCircle,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const quickAccessCards = [
  {
    title: "Estado de Solicitudes",
    description: "Revisa el estado actual de tus solicitudes de soporte",
    icon: Headset,
    href: "/solicitudes",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Inventario de Equipos",
    description: "Gestiona y consulta el control de activos tecnológicos",
    icon: HardDrive,
    href: "/inventarios/equipos",
    color: "from-slate-500 to-slate-600",
  },
  {
    title: "Base de Conocimientos",
    description: "Accede a documentación técnica y tutoriales",
    icon: BookOpen,
    href: "/base-conocimientos",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Avisos del Centro",
    description: "Mantente informado sobre noticias y alertas",
    icon: AlertCircle,
    href: "/avisos",
    color: "from-orange-500 to-orange-600",
  },
]

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

      {/* Quick Access Cards Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Acceso Rápido a Módulos
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Accede a las herramientas principales del sistema
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccessCards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group"
              >
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-blue-300">
                  <div
                    className={`mb-4 inline-block rounded-lg bg-gradient-to-br ${card.color} p-3 text-white`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="mb-4 text-sm text-slate-600">
                    {card.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                    Acceder
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

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

      {/* Chatbot Widget Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl">
          <div className="flex flex-col items-center gap-8 px-6 py-12 sm:px-12 lg:flex-row lg:justify-between">
            <div className="space-y-4 text-white lg:max-w-lg">
              <h3 className="text-2xl font-bold">
                ¿Tienes dudas sobre procesos académicos?
              </h3>
              <p className="text-blue-50">
                Pregúntale a nuestro asistente inteligente. Disponible 24/7 para resolver tus preguntas y proporcionar orientación inmediata.
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Iniciar Chat
                <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="hidden h-48 w-48 rounded-full bg-white/10 backdrop-blur lg:block" />
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
