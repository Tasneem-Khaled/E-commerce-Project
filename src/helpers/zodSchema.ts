import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email");

export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password is too long")
  .refine((val) => /[A-Z]/.test(val), "Must contain uppercase letter")
  .refine((val) => /[a-z]/.test(val), "Must contain lowercase letter")
  .refine((val) => /\d/.test(val), "Must contain number")
  .refine((val) => /[^A-Za-z0-9]/.test(val), "Must contain special character");

export const nameSchema = z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long")
      .refine((v) => /^[\p{L}\s.'-]+$/u.test(v), "Invalid name");

export const phoneSchema = z
  .string()
  .trim(); 
