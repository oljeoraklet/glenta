import { z } from "zod";

export const registerSchema = z.object({
    userName: z.string().min(3).max(31).regex(/^[a-z0-9_-]+$/),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
});

export const loginSchema = z.object({
    //User can login with either username or email
    usernameOrEmail: z.string().min(3).max(31),
    password: z.string().min(6),
});

export type LoginSchema = typeof loginSchema;

export type RegisterSchema = typeof registerSchema;