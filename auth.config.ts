import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth'

import bcryptjs from 'bcryptjs'

import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'

import { LoginSchema } from './schema';
import { getUserByEmail } from './data/user';

export default { 
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials){
                const isValid = LoginSchema.safeParse(credentials);

                if(isValid.success){
                    const {email, password} = isValid.data;

                    const user = await getUserByEmail(email);

                    if(!user || !user.password ) return null;

                    const passwordMatch = await bcryptjs.compare(
                        password,
                        user.password,
                    );

                    if(passwordMatch) return user
                }

                return null;
            }
        })
    ],
} satisfies NextAuthConfig
