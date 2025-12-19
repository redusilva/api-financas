import { z } from "zod";

export const ValidateRefreshTokenSchema = z.object({
    refresh_token: z
        .string({ error: "Token deve ser uma string" })
        .min(1, { message: "Token é obrigatório" })
        .nonempty({ message: "Token não pode ser vazio" }),
});