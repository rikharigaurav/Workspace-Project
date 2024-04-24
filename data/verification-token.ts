import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (
    email: string
) => {
    try {
        const verificationEmail = await db.verificationToken.findFirst({
            where: {
                email
            }
        })

        return verificationEmail;
    } catch (error) {
        console.log('getVerificationTokenByEmail' + error) 
    }
}

export const getVerificationTokenByToken = async (
    token: string
) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        token
      },
    })

    return verificationToken;
  } catch (error) {}
}