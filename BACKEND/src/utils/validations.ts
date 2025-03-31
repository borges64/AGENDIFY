import { add } from "date-fns"
import z from "zod"

export const userSchama = z.object({
  name: z.string().min(2, "Nome de usuário inválido"),
  email: z.string().email("E-mail inválido"),
  cpf: z.string().min(1, "No minimo um numero"),
  phone: z.string().min(2, "Numero de telefone invalido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  address: z.string().min(2, "Endereço inválido").optional(),
})
