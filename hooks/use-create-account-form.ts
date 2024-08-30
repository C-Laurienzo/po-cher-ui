import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import { emailSchema, nameSchema, phoneNumberSchema } from "@/utils/validator-schema";
import { IUserInformation } from "@/utils/authorization";

const createAccountFormSchema = object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    phoneNumber: phoneNumberSchema,
})

export const useCreateAccountForm = (user: IUserInformation) => useForm({
    defaultValues: {
        ...user
    },
    resolver: yupResolver(createAccountFormSchema)
})