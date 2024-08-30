import { string } from 'yup';
import "yup-phone-lite";

export const emailSchema = string().required().email();

export const passwordSchema = string().required().min(8);

export const nameSchema = string().required().min(1);

export const phoneNumberSchema = string().required().phone();