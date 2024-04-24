import * as z from "zod"

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimun 6 character Field',
  }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string())
});

export const RegisterSchema = z.object({
    username: z.string().min(1, {
        message: "Username required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().refine((password) => {
        const PasswordTest =
          /^[a-zA-Z0-9](?!.*?[ _-]{2})[a-zA-Z0-9_ -]{1,18}[a-zA-Z0-9]$/
        return PasswordTest.test(password)
    }),
});


