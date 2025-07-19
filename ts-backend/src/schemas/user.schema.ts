import {z} from 'zod'

export const registerUserSchema = z.object({
    name: z.string(),
    phone: z.string().min(10),
    password: z.string().min(5)
})

export const loginUserSchema = z.object({
    phone: z.string().min(10),
    password: z.string().min(5)
})