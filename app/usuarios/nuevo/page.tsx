"use client"

import { useState } from "react"
import Link from "next/link"
import { Camera, User, ArrowLeft, Save } from "lucide-react"
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

type UserRole =
  | ""
  | "administrador"
  | "jefe_departamento"
  | "tecnico"
  | "coordinador"

export default function NuevoUsuarioPage() {
  const [role, setRole] = useState<UserRole>("")
  const [isActive, setIsActive] = useState(true)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const handleReset = () => {
    setRole("")
    setIsActive(true)
    setAvatarPreview(null)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Volver al panel</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Registrar Nuevo Usuario
            </h1>
            <p className="text-sm text-muted-foreground">
              Complete el formulario para crear una nueva cuenta de usuario en
              el sistema.
            </p>
          </div>
        </div>
        <form className="space-y-8">
          {/* Avatar Section */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-foreground">
              Foto de Perfil
            </h2>
            <div className="flex items-center gap-5">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-muted">
                  {avatarPreview ? (
                    <AvatarImage
                      src={avatarPreview || "/placeholder.svg"}
                      alt="Preview"
                    />
                  ) : null}
                  <AvatarFallback className="bg-muted">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow-sm"
                  onClick={() => {
                    setAvatarPreview(
                      "/placeholder.svg?height=96&width=96"
                    )
                  }}
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Subir imagen</span>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  Imagen del usuario
                </p>
                <p>
                  Haga clic en el icono de la camara para subir una imagen.
                </p>
                <p className="mt-1 text-xs">
                  Formatos: JPG, PNG. Tamano maximo: 2 MB.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-foreground">
              Datos Personales
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres *</Label>
                <Input id="nombres" placeholder="Ingrese nombres" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primer_apellido">Primer Apellido *</Label>
                <Input
                  id="primer_apellido"
                  placeholder="Ingrese primer apellido"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="segundo_apellido">Segundo Apellido</Label>
                <Input
                  id="segundo_apellido"
                  placeholder="Ingrese segundo apellido (opcional)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electronico *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="password">Contrasena *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingrese una contrasena segura"
                  required
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-foreground">
              Estado de la Cuenta
            </h2>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="status" className="text-base">
                  Estado del Usuario
                </Label>
                <p className="text-sm text-muted-foreground">
                  {isActive
                    ? "El usuario podra acceder al sistema"
                    : "El usuario no podra iniciar sesion"}
                </p>
              </div>
              <Switch
                id="status"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-foreground">
              Rol y Permisos
            </h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="role">Rol Asignado *</Label>
                <Select
                  value={role}
                  onValueChange={(value: UserRole) => setRole(value)}
                >
                  <SelectTrigger id="role" className="w-full">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrador">
                      Administrador
                    </SelectItem>
                    <SelectItem value="jefe_departamento">
                      Jefe de Departamento
                    </SelectItem>
                    <SelectItem value="tecnico">Tecnico</SelectItem>
                    <SelectItem value="coordinador">Coordinador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dynamic Fields */}
              <div className="min-h-[60px]">
                {role === "" && (
                  <div className="rounded-lg border border-dashed p-4">
                    <p className="text-center text-sm text-muted-foreground">
                      Seleccione un rol para ver los campos adicionales
                    </p>
                  </div>
                )}

                {role === "administrador" && (
                  <div className="rounded-lg bg-muted/50 p-4 animate-in fade-in-50 duration-200">
                    <p className="text-center text-sm text-muted-foreground">
                      Este rol no requiere datos adicionales.
                    </p>
                  </div>
                )}

                {role === "jefe_departamento" && (
                  <div className="space-y-4 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h4 className="mb-3 text-sm font-medium">
                        Datos de Jefe de Departamento
                      </h4>
                      <div className="space-y-2">
                        <Label htmlFor="departamento">Departamento *</Label>
                        <Select>
                          <SelectTrigger id="departamento">
                            <SelectValue placeholder="Seleccione un departamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sistemas">
                              Sistemas y Computacion
                            </SelectItem>
                            <SelectItem value="basicas">
                              Ciencias Basicas
                            </SelectItem>
                            <SelectItem value="administrativo">
                              Ciencias Economico-Administrativas
                            </SelectItem>
                            <SelectItem value="industrial">
                              Ingenieria Industrial
                            </SelectItem>
                            <SelectItem value="electronica">
                              Ingenieria Electronica
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {role === "tecnico" && (
                  <div className="space-y-4 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h4 className="mb-3 text-sm font-medium">
                        Datos de Tecnico
                      </h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="numero_control">
                            Numero de Control *
                          </Label>
                          <Input
                            id="numero_control"
                            placeholder="Ej: TEC-2026-001"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="disponibilidad">
                            Disponibilidad / Horario *
                          </Label>
                          <Select>
                            <SelectTrigger id="disponibilidad">
                              <SelectValue placeholder="Seleccione horario" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="matutino">
                                Matutino (7:00 - 14:00)
                              </SelectItem>
                              <SelectItem value="vespertino">
                                Vespertino (14:00 - 21:00)
                              </SelectItem>
                              <SelectItem value="mixto">
                                Mixto (Variable)
                              </SelectItem>
                              <SelectItem value="completo">
                                Tiempo Completo
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {role === "coordinador" && (
                  <div className="space-y-4 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h4 className="mb-3 text-sm font-medium">
                        Datos de Coordinador
                      </h4>
                      <div className="space-y-2">
                        <Label htmlFor="area_coordinacion">
                          Area de Coordinacion *
                        </Label>
                        <Select>
                          <SelectTrigger id="area_coordinacion">
                            <SelectValue placeholder="Seleccione area de coordinacion" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tutorias">Tutorias</SelectItem>
                            <SelectItem value="residencias">
                              Residencias Profesionales
                            </SelectItem>
                            <SelectItem value="servicio_social">
                              Servicio Social
                            </SelectItem>
                            <SelectItem value="vinculacion">
                              Vinculacion
                            </SelectItem>
                            <SelectItem value="investigacion">
                              Investigacion
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pb-8">
            <Link href="/">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button
              type="button"
              variant="ghost"
              onClick={handleReset}
            >
              Limpiar Formulario
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Crear Usuario
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
