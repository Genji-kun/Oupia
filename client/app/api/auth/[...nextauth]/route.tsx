import NextAuth, { Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';

type CustomSession = Session & {
    accessToken?: string;
};


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
                },
            },
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.accessToken) {
                token.accessToken = account.access_token;
            }
            return token;
        }
    }
})

export { handler as GET, handler as POST };