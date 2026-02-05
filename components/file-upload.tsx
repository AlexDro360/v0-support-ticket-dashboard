"use client"

import React from "react"

import { Upload, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  accept?: string
}

export function FileUpload({ onFileSelect, accept = "image/*" }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  const processFile = (file: File) => {
    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona una imagen válida")
      return
    }

    setSelectedFile(file)
    onFileSelect(file)

    // Crear preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const clearFile = () => {
    setSelectedFile(null)
    setPreview(null)
    onFileSelect(null)
  }

  return (
    <div className="space-y-3">
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 bg-muted/20"
          }`}
        >
          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm font-medium text-foreground">
            Arrastra una imagen aquí
          </p>
          <p className="text-xs text-muted-foreground">o</p>
          <label htmlFor="file-input" className="cursor-pointer">
            <Button type="button" variant="link" className="p-0 text-xs h-auto">
              selecciona un archivo
            </Button>
          </label>
          <input
            id="file-input"
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Formatos soportados: JPG, PNG, GIF
          </p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-4">
          {preview && (
            <div className="mb-4 flex justify-center">
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="max-h-40 rounded-md object-cover"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedFile?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile?.size ?? 0 / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
