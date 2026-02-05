"use client"

import React from "react"

import { useState, useMemo } from "react"
import { TicketsTable, type Ticket } from "@/components/tickets-table"
import { TicketsToolbar } from "@/components/tickets-toolbar"
import { TicketsPagination } from "@/components/tickets-pagination"
import { CreateUserModal } from "@/components/create-user-modal"
import { Headset, TicketCheck, Clock, AlertCircle, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for the support tickets
const mockTickets: Ticket[] = [
  {
    id: "1",
    folio: "SOP-2026-001",
    fecha: "03/02/2026",
    nombreAfectado: "María González Hernández",
    departamento: "Subdirección Académica",
    equipo: "INV-ITO-1024",
    prioridad: "Alta",
    estado: "Pendiente",
  },
  {
    id: "2",
    folio: "SOP-2026-002",
    fecha: "03/02/2026",
    nombreAfectado: "Carlos Ramírez López",
    departamento: "Centro de Cómputo",
    equipo: "INV-ITO-2045",
    prioridad: "Media",
    estado: "En Proceso",
  },
  {
    id: "3",
    folio: "SOP-2026-003",
    fecha: "02/02/2026",
    nombreAfectado: "Ana Patricia Sánchez",
    departamento: "Recursos Humanos",
    equipo: "INV-ITO-0892",
    prioridad: "Baja",
    estado: "Resuelto",
  },
  {
    id: "4",
    folio: "SOP-2026-004",
    fecha: "02/02/2026",
    nombreAfectado: "Roberto Méndez Cruz",
    departamento: "Biblioteca",
    equipo: "INV-ITO-1567",
    prioridad: "Alta",
    estado: "En Proceso",
  },
  {
    id: "5",
    folio: "SOP-2026-005",
    fecha: "01/02/2026",
    nombreAfectado: "Laura Elena Torres",
    departamento: "Subdirección de Planeación",
    equipo: "INV-ITO-3201",
    prioridad: "Media",
    estado: "Pendiente",
  },
  {
    id: "6",
    folio: "SOP-2026-006",
    fecha: "01/02/2026",
    nombreAfectado: "Fernando Jiménez Vega",
    departamento: "Laboratorios",
    equipo: "INV-ITO-0445",
    prioridad: "Alta",
    estado: "Pendiente",
  },
  {
    id: "7",
    folio: "SOP-2026-007",
    fecha: "31/01/2026",
    nombreAfectado: "Patricia Ortega Luna",
    departamento: "Dirección",
    equipo: "INV-ITO-0001",
    prioridad: "Alta",
    estado: "Resuelto",
  },
  {
    id: "8",
    folio: "SOP-2026-008",
    fecha: "31/01/2026",
    nombreAfectado: "Miguel Ángel Flores",
    departamento: "Subdirección Administrativa",
    equipo: "INV-ITO-1890",
    prioridad: "Baja",
    estado: "En Proceso",
  },
  {
    id: "9",
    folio: "SOP-2026-009",
    fecha: "30/01/2026",
    nombreAfectado: "Gabriela Morales Díaz",
    departamento: "Centro de Cómputo",
    equipo: "INV-ITO-2100",
    prioridad: "Media",
    estado: "Resuelto",
  },
  {
    id: "10",
    folio: "SOP-2026-010",
    fecha: "30/01/2026",
    nombreAfectado: "José Luis Vargas",
    departamento: "Recursos Humanos",
    equipo: "INV-ITO-0910",
    prioridad: "Baja",
    estado: "Pendiente",
  },
  {
    id: "11",
    folio: "SOP-2026-011",
    fecha: "29/01/2026",
    nombreAfectado: "Claudia Herrera Martín",
    departamento: "Biblioteca",
    equipo: "INV-ITO-1580",
    prioridad: "Media",
    estado: "En Proceso",
  },
  {
    id: "12",
    folio: "SOP-2026-012",
    fecha: "29/01/2026",
    nombreAfectado: "Andrés Felipe Castro",
    departamento: "Laboratorios",
    equipo: "INV-ITO-0460",
    prioridad: "Alta",
    estado: "Resuelto",
  },
]

export default function SoporteDashboard() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [prioridad, setPrioridad] = useState("todas")
  const [departamento, setDepartamento] = useState("todos")
  const [estado, setEstado] = useState("todos")

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Filter the tickets
  const filteredTickets = useMemo(() => {
    return mockTickets.filter((ticket) => {
      // Search filter
      const searchMatch =
        searchQuery === "" ||
        ticket.folio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.nombreAfectado.toLowerCase().includes(searchQuery.toLowerCase())

      // Priority filter
      const prioridadMatch =
        prioridad === "todas" || ticket.prioridad === prioridad

      // Department filter
      const departamentoMatch =
        departamento === "todos" || ticket.departamento === departamento

      // Status filter
      const estadoMatch = estado === "todos" || ticket.estado === estado

      return searchMatch && prioridadMatch && departamentoMatch && estadoMatch
    })
  }, [searchQuery, prioridad, departamento, estado])

  // Calculate pagination
  const totalPages = Math.ceil(filteredTickets.length / rowsPerPage)
  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredTickets.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredTickets, currentPage, rowsPerPage])

  // Reset to first page when filters change
  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value)
    setCurrentPage(1)
  }

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows)
    setCurrentPage(1)
  }

  // Stats calculations
  const stats = useMemo(() => {
    const total = mockTickets.length
    const pendientes = mockTickets.filter((t) => t.estado === "Pendiente").length
    const enProceso = mockTickets.filter((t) => t.estado === "En Proceso").length
    const altaPrioridad = mockTickets.filter((t) => t.prioridad === "Alta").length
    return { total, pendientes, enProceso, altaPrioridad }
  }, [])

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Headset className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Sistema de Soporte Técnico
                </h1>
                <p className="text-sm text-muted-foreground">
                  Centro de Cómputo - Gestión de Solicitudes
                </p>
              </div>
            </div>
            <CreateUserModal
              trigger={
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Nuevo Usuario
                </Button>
              }
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <TicketCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Solicitudes</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold text-foreground">{stats.pendientes}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Headset className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En Proceso</p>
                <p className="text-2xl font-bold text-foreground">{stats.enProceso}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alta Prioridad</p>
                <p className="text-2xl font-bold text-foreground">{stats.altaPrioridad}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b px-6 py-5">
            <h2 className="text-lg font-semibold text-foreground">
              Listado de Solicitudes
            </h2>
            <p className="text-sm text-muted-foreground">
              Gestiona todas las solicitudes de soporte técnico
            </p>
          </div>

          <div className="p-6">
            {/* Toolbar */}
            <div className="mb-6">
              <TicketsToolbar
                searchQuery={searchQuery}
                onSearchChange={(value) => handleFilterChange(setSearchQuery, value)}
                prioridad={prioridad}
                onPrioridadChange={(value) => handleFilterChange(setPrioridad, value)}
                departamento={departamento}
                onDepartamentoChange={(value) =>
                  handleFilterChange(setDepartamento, value)
                }
                estado={estado}
                onEstadoChange={(value) => handleFilterChange(setEstado, value)}
              />
            </div>

            {/* Table */}
            <div className="mb-6">
              <TicketsTable tickets={paginatedTickets} />
            </div>

            {/* Pagination */}
            {filteredTickets.length > 0 && (
              <TicketsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalItems={filteredTickets.length}
                onPageChange={setCurrentPage}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
