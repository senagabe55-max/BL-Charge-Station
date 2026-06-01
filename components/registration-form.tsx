"use client"

import { useState, useCallback, useRef } from "react"
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
import {
  Upload,
  CheckCircle,
  X,
  FileImage,
  Loader2,
  Sparkles,
} from "lucide-react"

const cities = [
  "Belo Horizonte",
  "Contagem",
  "Betim",
  "Nova Lima",
  "Ribeirão das Neves",
  "Santa Luzia",
  "Sabará",
  "Ibirité",
  "Outra",
]

const apps = [
  { value: "uber", label: "Uber" },
  { value: "99", label: "99" },
  { value: "indrive", label: "InDrive" },
  { value: "cabify", label: "Cabify" },
  { value: "multiple", label: "Múltiplos Apps" },
  { value: "other", label: "Outro" },
]

interface FormData {
  nome: string
  email: string
  whatsapp: string
  cidade: string
  app: string
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    whatsapp: "",
    cidade: "",
    app: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<FormData & { file: string }>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handleWhatsAppChange = (value: string) => {
    const formatted = formatWhatsApp(value)
    handleInputChange("whatsapp", formatted)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile)
      setErrors((prev) => ({ ...prev, file: undefined }))
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setErrors((prev) => ({ ...prev, file: undefined }))
    }
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData & { file: string }> = {}

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório"
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório"
    } else if (formData.whatsapp.replace(/\D/g, "").length < 10) {
      newErrors.whatsapp = "WhatsApp inválido"
    }
    if (!formData.cidade) newErrors.cidade = "Cidade é obrigatória"
    if (!formData.app) newErrors.app = "Selecione o aplicativo"
    if (!file) newErrors.file = "O print do app é obrigatório"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const submitData = new FormData()
      submitData.append("nome", formData.nome)
      submitData.append("email", formData.email)
      submitData.append("telefone", formData.whatsapp)
      submitData.append("cpf", "-") // Campo não existe no formulário atual
      submitData.append("veiculo", "-") // Campo não existe no formulário atual
      submitData.append("placa", "-") // Campo não existe no formulário atual
      submitData.append("plataforma", formData.app)
      submitData.append("cidade", formData.cidade)
      
      if (file) {
        submitData.append("printApp", file)
      }

      const response = await fetch("/api/send-registration", {
        method: "POST",
        body: submitData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erro ao enviar formulário")
      }

      setIsSuccess(true)
    } catch (error) {
      console.error("[v0] Submit error:", error)
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : "Erro ao enviar formulário. Tente novamente."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section id="cadastro" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)] tracking-tight">
              Cadastro Enviado com Sucesso!
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Recebemos sua solicitação e nossa equipe irá analisar seus dados.
              Você receberá uma resposta via WhatsApp em até 24 horas.
            </p>
            <div className="bg-card border border-border rounded-2xl p-6">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
              <p className="text-foreground font-medium">
                Fique atento às mensagens no WhatsApp cadastrado!
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="cadastro" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Cadastre-se
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance font-[family-name:var(--font-heading)] tracking-tight">
            Solicite Seu Benefício Agora
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Preencha o formulário abaixo e comece a economizar nas suas recargas
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-foreground font-medium">
                  Nome Completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  className={`h-12 bg-input border-border rounded-xl ${
                    errors.nome ? "border-destructive" : ""
                  }`}
                />
                {errors.nome && (
                  <p className="text-sm text-destructive">{errors.nome}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  E-mail <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`h-12 bg-input border-border rounded-xl ${
                    errors.email ? "border-destructive" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-foreground font-medium">
                  WhatsApp <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="(31) 99999-9999"
                  value={formData.whatsapp}
                  onChange={(e) => handleWhatsAppChange(e.target.value)}
                  maxLength={15}
                  className={`h-12 bg-input border-border rounded-xl ${
                    errors.whatsapp ? "border-destructive" : ""
                  }`}
                />
                {errors.whatsapp && (
                  <p className="text-sm text-destructive">{errors.whatsapp}</p>
                )}
              </div>

              {/* Cidade e App em Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Cidade */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">
                    Cidade <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.cidade}
                    onValueChange={(value) => handleInputChange("cidade", value)}
                  >
                    <SelectTrigger
                      className={`h-12 bg-input border-border rounded-xl ${
                        errors.cidade ? "border-destructive" : ""
                      }`}
                    >
                      <SelectValue placeholder="Selecione sua cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.cidade && (
                    <p className="text-sm text-destructive">{errors.cidade}</p>
                  )}
                </div>

                {/* App */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">
                    Aplicativo <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.app}
                    onValueChange={(value) => handleInputChange("app", value)}
                  >
                    <SelectTrigger
                      className={`h-12 bg-input border-border rounded-xl ${
                        errors.app ? "border-destructive" : ""
                      }`}
                    >
                      <SelectValue placeholder="Qual app você usa?" />
                    </SelectTrigger>
                    <SelectContent>
                      {apps.map((app) => (
                        <SelectItem key={app.value} value={app.value}>
                          {app.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.app && (
                    <p className="text-sm text-destructive">{errors.app}</p>
                  )}
                </div>
              </div>

              {/* Upload */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  Print do App de Motorista <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Envie um print do aplicativo de motorista mostrando seu cadastro ativo.
                </p>

                {!file ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setIsDragOver(true)
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                      isDragOver
                        ? "border-primary bg-primary/5"
                        : errors.file
                        ? "border-destructive bg-destructive/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Upload className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">
                          Arraste uma imagem ou clique para selecionar
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          PNG, JPG ou JPEG até 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative bg-muted rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileImage className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 hover:bg-background rounded-lg transition-colors"
                      aria-label="Remover arquivo"
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                )}
                {errors.file && (
                  <p className="text-sm text-destructive">{errors.file}</p>
                )}
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-center">
                  <p className="text-destructive font-medium">{submitError}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Quero Receber o Benefício"
                )}
              </Button>

              {/* Privacy Note */}
              <p className="text-center text-sm text-muted-foreground">
                Ao enviar, você concorda com nossa política de privacidade.
                Seus dados estão seguros conosco.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
