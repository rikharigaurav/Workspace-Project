"use server";
import { LoginSchema } from "@/schema";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import identityServer4 from "next-auth/providers/identity-server4";
import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async(values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, code } = validatedFields.data;
    
    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.password || !existingUser.email)  {
        return { error: "Email does not exist!"};
    }

    // Generate Verification token
    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email)

         await sendVerificationEmail(
           verificationToken.email,
           verificationToken.token
         )

        return { success: " Confirmation email sent "}
    };


    // Check if user has 2FA enabled
    if(existingUser.isTwoFactorEnabled && existingUser.email) {
        if(code){
            // TODO: Verify code

            const twoFactorToken = await getTwoFactorTokenByEmail(email)

            if(!twoFactorToken){
                return { error: "Something went wrong"}
            }

            if(twoFactorToken.token !== code){
                return { error: "Invalid Code" }
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if(hasExpired){
                return { error: "Code Expired" }
            }

            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id
                }
            })

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if(existingConfirmation){
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id
                    }
                })
                
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                }
            })

        } else{
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
    
            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token
            )
            
            return { twoFactor: true } 
        }

    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if( error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials" }

                default:
                    return { error: "Something went wrong" }
            }
        }

        throw error
    }


    
}