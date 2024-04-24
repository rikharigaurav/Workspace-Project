import { Resend } from 'resend';

const resend = new Resend();

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmUrl = `http://localhost:3000/new-verification?token=${token}`;


    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Verify your email',
        html: `<p>Click <a href="${confirmUrl}">here</a> to confirm email</p>`
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/new-password?tokens=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  })
}

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA code",
        html: `<p>This is your confirmation code for Autenticate: ${token}</p>`
    })
}