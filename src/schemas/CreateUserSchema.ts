import { z } from "zod";

export type CreateUserDTO = {
    name: string;
    email: string;
    password: string;
    role_id: number;
    status_id: number;
};

export const CreateUserSchema = z.object({
    name: z
        .string()
        .transform((s) => s.trim())
        .refine((s) => s.length > 0, { message: "Nome não pode ser vazio" }),

    email: z.email({ message: "Email inválido" }),

    password: z
        .string()
        .min(8, { message: "Senha deve ter ao menos 8 caracteres" }),

    role_id: z.coerce
        .number()
        .int({ message: "role_id deve ser um inteiro" })
        .positive({ message: "role_id deve ser positivo" }),

    status_id: z.coerce
        .number()
        .int({ message: "status_id deve ser um inteiro" })
        .positive({ message: "status_id deve ser positivo" }),
});
