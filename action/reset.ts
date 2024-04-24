'use server'

import { z } from 'zod'

import { ResetSchema } from "@/schema"
import { getUserByEmail } from "@/data/user"
import { generatePasswordResetToken } from '@/lib/token'
import { sendPasswordResetEmail } from '@/lib/mail'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    
    const validatedFields = ResetSchema.safeParse(values)

    if(!validatedFields.success) {
        return { error: " Invalid Email"};
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser){
        return { error: "Email not Found"}
    }

    const passwordResetToken = await generatePasswordResetToken(email)

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    )

    return { success: "Reset email sent"}

}