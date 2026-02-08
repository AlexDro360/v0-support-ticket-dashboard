'use client'

import React from 'react'
import { useState, useMemo } from 'react'
import { EquiposToolbar } from '@/components/equipos-toolbar'
import { EquiposResponsiveView, type Equipo } from '@/components/equipos-responsive-view'
import { EquiposPagination } from '@/components/equipos-pagination'

// Mock data for equipment inventory
const mockEquipos: Equipo[] = [
  {
    id: '1',
    numeroInventario: 'ITO-2024-001',
    tipoEquipo: 'Computadora',
    marca: 'Dell',
    modelo: 'OptiPlex 3080',
    ubicacion: 'Centro de Cómputo',
    responsable: 'Carlos Ramírez López',
    departamento: 'Subdirección Académica',
    estado: 'Activo',
  },
  {
    id: '2',
    numeroInventario: 'ITO-2024-002',
    tipoEquipo: 'Impresora',
    marca: 'HP',
    modelo: 'LaserJet Pro M404n',
    ubicacion: 'Dirección',
    responsable: 'Patricia Ortega Luna',
    departamento: 'Dirección',
    estado: 'Activo',
  },
  {
    id: '3',
    numeroInventario: 'ITO-2024-003',
    tipoEquipo: 'Switch',
    marca: 'Cisco',
    modelo: 'Catalyst 2960X',
    ubicacion: 'Cuarto de Telecomunicaciones',
    responsable: 'Fernando Jiménez Vega',
    departamento: 'Laboratorios',
    estado: 'Activo',
  },
  {
    id: '4',
    numeroInventario: 'ITO-2024-004',
    tipoEquipo: 'Monitor',
    marca: 'LG',
    modelo: '27UK850',
    ubicacion: 'Laboratorio de Diseño',
    responsable: 'Laura Elena Torres',
    departamento: 'Subdirección de Planeación',
    estado: 'Baja',
  },
  {
    id: '5',
    numeroInventario: 'ITO-2024-005',
    tipoEquipo: 'Computadora',
    marca: 'Lenovo',
    modelo: 'ThinkCentre M90',
    ubicacion: 'Biblioteca',
    responsable: 'Roberto Méndez Cruz',
    departamento: 'Biblioteca',
    estado: 'Activo',
  },
  {
    id: '6',
    numeroInventario: 'ITO-2024-006',
    tipoEquipo: 'Impresora',
    marca: 'Canon',
    modelo: 'imagePRUNNER 2725i',
    ubicacion: 'Recursos Humanos',
    responsable: 'Ana Patricia Sánchez',
    departamento: 'Recursos Humanos',
    estado: 'Activo',
  },
  {
    id: '7',
    numeroInventario: 'ITO-2024-007',
    tipoEquipo: 'Computadora',
    marca: 'HP',
    modelo: 'ProDesk 600 G5',
    ubicacion: 'Laboratorio de Sistemas',
    responsable: 'Miguel Ángel Flores',
    departamento: 'Subdirección Administrativa',
    estado: 'Activo',
  },
  {
    id: '8',
    numeroInventario: 'ITO-2024-008',
    tipoEquipo: 'Switch',
    marca: 'NETGEAR',
    modelo: 'M4250-40G',
    ubicacion: 'Cuarto de Telecomunicaciones',
    responsable: 'Fernando Jiménez Vega',
    departamento: 'Laboratorios',
    estado: 'Activo',
  },
  {
    id: '9',
    numeroInventario: 'ITO-2024-009',
    tipoEquipo: 'Computadora',
    marca: 'ASUS',
    modelo: 'VivoBook 15',
    ubicacion: 'Centro de Cómputo',
    responsable: 'Gabriela Morales Díaz',
    departamento: 'Centro de Cómputo',
    estado: 'Baja',
  },
  {
    id: '10',
    numeroInventario: 'ITO-2024-010',
    tipoEquipo: 'Impresora',
    marca: 'Brother',
    modelo: 'HL-L8360CDW',
    ubicacion: 'Biblioteca',
    responsable: 'José Luis Vargas',
    departamento: 'Recursos Humanos',
    estado: 'Activo',
  },
  {
    id: '11',
    numeroInventario: 'ITO-2024-011',
    tipoEquipo: 'Computadora',
    marca: 'Dell',
    modelo: 'Inspiron 15 3000',
    ubicacion: 'Oficina Académica',
    responsable: 'Claudia Herrera Martín',
    departamento: 'Biblioteca',
    estado: 'Activo',
  },
  {
    id: '12',
    numeroInventario: 'ITO-2024-012',
    tipoEquipo: 'Switch',
    marca: 'Juniper',
    modelo: 'SRX5400',
    ubicacion: 'Cuarto de Telecomunicaciones',
    responsable: 'Andrés Felipe Castro',
    departamento: 'Laboratorios',
    estado: 'Baja',
  },
]

export default function EquiposPage() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [tipoEquipo, setTipoEquipo] = useState('todos')
  const [departamento, setDepartamento] = useState('todos')

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Filter the equipment
  const filteredEquipos = useMemo(() => {
    return mockEquipos.filter((equipo) => {
      const searchMatch =
        searchQuery === '' ||
        equipo.numeroInventario.toLowerCase().includes(searchQuery.toLowerCase()) ||
        equipo.responsable.toLowerCase().includes(searchQuery.toLowerCase())

      const tipoMatch = tipoEquipo === 'todos' || equipo.tipoEquipo === tipoEquipo

      const departamentoMatch =
        departamento === 'todos' || equipo.departamento === departamento

      return searchMatch && tipoMatch && departamentoMatch
    })
  }, [searchQuery, tipoEquipo, departamento])

  // Calculate pagination
  const totalPages = Math.ceil(filteredEquipos.length / rowsPerPage)
  const paginatedEquipos = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredEquipos.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredEquipos, currentPage, rowsPerPage])

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
              Inventario de Equipos
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Gestiona el inventario de equipos de TI
            </p>
          </div>

          <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
            {/* Toolbar */}
            <EquiposToolbar
              searchQuery={searchQuery}
              onSearchChange={(value) => handleFilterChange(setSearchQuery, value)}
              tipoEquipo={tipoEquipo}
              onTipoEquipoChange={(value) => handleFilterChange(setTipoEquipo, value)}
              departamento={departamento}
              onDepartamentoChange={(value) => handleFilterChange(setDepartamento, value)}
            />

            {/* Responsive View - Desktop Table / Mobile Cards */}
            <EquiposResponsiveView equipos={paginatedEquipos} />

            {/* Pagination */}
            {filteredEquipos.length > 0 && (
              <EquiposPagination
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalItems={filteredEquipos.length}
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
