"use server"

import { z } from "zod";
import { NewPasswordSchema } from "@/schema";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";

import bcryptjs from 'bcryptjs'
import { db } from "@/lib/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    
    if(!token) {
        return { error: "Missing Token!!" }
    }

    const validatedFields = await NewPasswordSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: " Invalid Field! "}
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token)

    if(!existingToken) {
        return { error: "Invalid Token" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return { error: "Token has Expired"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser){
        return { error: "Email Does not exists! "}
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return { success: "Password upadated"}

}