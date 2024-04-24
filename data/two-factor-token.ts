import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (
    token: string
) => {
    try {
        const getTwoFactor = await db.twoFactorToken.findUnique({
          where: {
            token,
          },
        })

        return getTwoFactor;

    } catch (error) {
        return null;
    }
}

export const getTwoFactorTokenByEmail = async (
    email: string
) => {
  try {
    const getTwoFactor = await db.twoFactorToken.findFirst({
      where: {
        email
      },
    })

    return getTwoFactor
  } catch (error) {
    return null
  }
}