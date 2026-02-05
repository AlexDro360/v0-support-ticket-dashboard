"use client"

import React from "react"

import { useState } from "react"
import { Camera, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type UserRole = "" | "administrador" | "jefe_departamento" | "tecnico" | "coordinador"

interface CreateUserModalProps {
  trigger?: React.ReactNode
}

export function CreateUserModal({ trigger }: CreateUserModalProps) {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<UserRole>("")
  const [isActive, setIsActive] = useState(true)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const handleReset = () => {
    setRole("")
    setIsActive(true)
    setAvatarPreview(null)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      handleReset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button>Nuevo Usuario</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Registrar Nuevo Usuario</DialogTitle>
          <DialogDescription>
            Complete el formulario para crear una nueva cuenta de usuario en el sistema.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview || "/placeholder.svg"} alt="Preview" />
                ) : null}
                <AvatarFallback className="bg-muted">
                  <User className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full"
                onClick={() => {
                  // Simulated image upload
                  setAvatarPreview("/placeholder.svg?height=80&width=80")
                }}
              >
                <Camera className="h-3.5 w-3.5" />
                <span className="sr-only">Subir imagen</span>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Foto de perfil</p>
              <p>Haga clic en el icono para subir una imagen</p>
            </div>
          </div>

          {/* Personal Information Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombres">Nombres *</Label>
              <Input id="nombres" placeholder="Ingrese nombres" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primer_apellido">Primer Apellido *</Label>
              <Input id="primer_apellido" placeholder="Ingrese primer apellido" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="segundo_apellido">Segundo Apellido</Label>
              <Input id="segundo_apellido" placeholder="Ingrese segundo apellido (opcional)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input id="email" type="email" placeholder="usuario@ejemplo.com" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="password">Contraseña *</Label>
              <Input id="password" type="password" placeholder="Ingrese una contraseña segura" required />
            </div>
          </div>

          {/* Status Switch */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="status" className="text-base">Estado del Usuario</Label>
              <p className="text-sm text-muted-foreground">
                {isActive ? "El usuario podrá acceder al sistema" : "El usuario no podrá iniciar sesión"}
              </p>
            </div>
            <Switch
              id="status"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>

          {/* Role Selector */}
          <div className="space-y-2">
            <Label htmlFor="role">Rol Asignado *</Label>
            <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Seleccione un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrador">Administrador</SelectItem>
                <SelectItem value="jefe_departamento">Jefe de Departamento</SelectItem>
                <SelectItem value="tecnico">Técnico</SelectItem>
                <SelectItem value="coordinador">Coordinador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic Fields Section */}
          <div className="min-h-[80px]">
            {role === "" && (
              <div className="rounded-lg border border-dashed p-4">
                <p className="text-sm text-muted-foreground text-center">
                  Seleccione un rol para ver los campos adicionales
                </p>
              </div>
            )}

            {role === "administrador" && (
              <div className="rounded-lg bg-muted/50 p-4 animate-in fade-in-50 duration-200">
                <p className="text-sm text-muted-foreground text-center">
                  Este rol no requiere datos adicionales.
                </p>
              </div>
            )}

            {role === "jefe_departamento" && (
              <div className="space-y-4 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                <div className="rounded-lg border bg-card p-4">
                  <h4 className="text-sm font-medium mb-3">Datos de Jefe de Departamento</h4>
                  <div className="space-y-2">
                    <Label htmlFor="departamento">Departamento *</Label>
                    <Select>
                      <SelectTrigger id="departamento">
                        <SelectValue placeholder="Seleccione un departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sistemas">Sistemas y Computación</SelectItem>
                        <SelectItem value="basicas">Ciencias Básicas</SelectItem>
                        <SelectItem value="administrativo">Ciencias Económico-Administrativas</SelectItem>
                        <SelectItem value="industrial">Ingeniería Industrial</SelectItem>
                        <SelectItem value="electronica">Ingeniería Electrónica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {role === "tecnico" && (
              <div className="space-y-4 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                <div className="rounded-lg border bg-card p-4">
                  <h4 className="text-sm font-medium mb-3">Datos de Técnico</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="numero_control">Número de Control *</Label>
                      <Input id="numero_control" placeholder="Ej: TEC-2026-001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="disponibilidad">Disponibilidad / Horario *</Label>
                      <Select>
                        <SelectTrigger id="disponibilidad">
                          <SelectValue placeholder="Seleccione horario" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="matutino">Matutino (7:00 - 14:00)</SelectItem>
                          <SelectItem value="vespertino">Vespertino (14:00 - 21:00)</SelectItem>
                          <SelectItem value="mixto">Mixto (Variable)</SelectItem>
                          <SelectItem value="completo">Tiempo Completo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {role === "coordinador" && (
              <div className="space-y-4 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                <div className="rounded-lg border bg-card p-4">
                  <h4 className="text-sm font-medium mb-3">Datos de Coordinador</h4>
                  <div className="space-y-2">
                    <Label htmlFor="area_coordinacion">Área de Coordinación *</Label>
                    <Select>
                      <SelectTrigger id="area_coordinacion">
                        <SelectValue placeholder="Seleccione área de coordinación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tutorias">Tutorías</SelectItem>
                        <SelectItem value="residencias">Residencias Profesionales</SelectItem>
                        <SelectItem value="servicio_social">Servicio Social</SelectItem>
                        <SelectItem value="vinculacion">Vinculación</SelectItem>
                        <SelectItem value="investigacion">Investigación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button type="submit">
            Crear Usuario
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
