import { z } from "zod";

export const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "La cotnraseña tiene que tener minimo 6 caracteres"),
    role: z.enum(["ADMIN", "NORMAL"]).optional()
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})