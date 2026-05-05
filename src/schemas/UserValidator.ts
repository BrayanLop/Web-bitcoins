import { z} from 'zod'

export const UserSchema = z.object({
    username: z.string().min(3, "Minimo 3 letras").max(20).optional(),
    email: z.string().email("Correo no valido").optional(),
    points: z.number().positive("Puntos debe ser mayor a 0").int("Puntos debe ser un número entero"),
    operacion: z.enum(['comprar', 'vender']).optional(),
    birthDate: z.date().optional()
});

//Interferencia automatica
export type User = z.infer<typeof UserSchema>;