import { z } from "zod";

export const registerSchema = z.object({
    userName: z.string().min(3).max(31).regex(/^[a-z0-9_-]+$/),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
});

export const loginSchema = z.object({
    usernameOrEmail: z.string().min(3).max(31),
    password: z.string().min(6),
});

export const eventSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    date: z.date(),
    location: z.string().min(3).max(255),
});

export type LoginSchema = typeof loginSchema;

export type RegisterSchema = typeof registerSchema;

export type EventSchema = typeof eventSchema;