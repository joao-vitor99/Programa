import { z } from "zod";
import { PHONE_REGEX } from "../constants/regex";

export const CreateClientResolver = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caractéres"), 
    phone: z.string().regex(PHONE_REGEX, "Telefone com formato inválido")
})