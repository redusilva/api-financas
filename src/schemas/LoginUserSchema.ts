import { z } from "zod";

export const LoginUserSchema = z.object({
    email: z.email({ message: "Email inválido" }),
    password: z
        .string({ error: "Senha deve ser uma string" })
        .min(8, { message: "Senha deve ter ao menos 8 caracteres" }),
});
