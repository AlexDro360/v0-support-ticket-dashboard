"use client"

import React from "react"
import { TicketsTable } from "@/components/tickets-table" // Import TicketsTable component

import { useState, useMemo } from "react"
import { TicketsResponsiveView, type Ticket } from "@/components/tickets-responsive-view"
import { TicketsToolbar } from "@/components/tickets-toolbar"
import { TicketsPagination } from "@/components/tickets-pagination"

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
      const searchMatch =
        searchQuery === "" ||
        ticket.folio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.nombreAfectado.toLowerCase().includes(searchQuery.toLowerCase())

      const prioridadMatch =
        prioridad === "todas" || ticket.prioridad === prioridad

      const departamentoMatch =
        departamento === "todos" || ticket.departamento === departamento

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

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="mx-auto w-full max-w-7xl px-2 py-4 sm:px-4 md:px-6 lg:px-8 lg:py-8">
        {/* Main Content Card */}
        <div className="rounded-lg border bg-card shadow-sm md:rounded-xl">
          <div className="border-b px-4 py-4 sm:px-6 sm:py-5">
            <h2 className="text-base font-semibold text-foreground sm:text-lg">
              Listado de Solicitudes
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Gestiona todas las solicitudes de soporte técnico
            </p>
          </div>

          <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
            {/* Toolbar */}
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

            {/* Responsive View - Desktop Table / Mobile Cards */}
            <TicketsResponsiveView tickets={paginatedTickets} />

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
      </div>
    </div>
  )
}
