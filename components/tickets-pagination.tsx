"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TicketsPaginationProps {
  currentPage: number
  totalPages: number
  rowsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
}

export function TicketsPagination({
  currentPage,
  totalPages,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}: TicketsPaginationProps) {
  const startItem = (currentPage - 1) * rowsPerPage + 1
  const endItem = Math.min(currentPage * rowsPerPage, totalItems)

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Info Row */}
      <div className="flex justify-center">
        <p className="text-xs text-muted-foreground sm:text-sm whitespace-nowrap">
          Mostrando {startItem} a {endItem} de {totalItems} solicitudes
        </p>
      </div>

      {/* Controls Row - Centered */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
        {/* Rows per page */}
        <div className="flex items-center gap-2 justify-center">
          <span className="text-xs text-muted-foreground sm:text-sm">Filas por página:</span>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => onRowsPerPageChange(parseInt(value))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-1 overflow-x-auto justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Anterior</span>
          </Button>

          <div className="flex items-center gap-1 mx-1">
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-1 text-xs text-muted-foreground sm:px-2">
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 text-xs p-0"
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </Button>
              )
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3"
          >
            <span className="hidden sm:inline mr-1">Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
