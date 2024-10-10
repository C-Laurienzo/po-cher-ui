import { string } from 'yup';
import "yup-phone-lite";

export const emailSchema = string().required().email();

export const passwordSchema = string().required().min(8).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/);

export const nameSchema = string().required().min(1);

export const phoneNumberSchema = string().required().phone();

export const confirmationCodeSchema = string().required().min(6).max(6);