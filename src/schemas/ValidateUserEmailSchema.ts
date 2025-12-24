import { z } from "zod";

export const ValidateUserEmailSchema = z.object({
    user_id: z
        .number({ error: "ID do usuário deve ser um número" })
        .min(1, { message: "ID do usuário é obrigatório" }),
    token: z
        .string({ error: "Token deve ser uma string" })
        .min(1, { message: "Token é obrigatório" })
        .nonempty({ message: "Token não pode ser vazio" }),
});