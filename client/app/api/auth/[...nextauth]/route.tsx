import NextAuth, { Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';

type CustomSession = Session & {
    subId?: string;
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
                const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                    headers: {
                        Authorization: `Bearer ${account.accessToken}`,
                    },
                });
                const googleUser = response.data;
                token.id = googleUser.id;
                token.accessToken = account.accessToken;

            }
            return token;
        },
        async session({ session, token }) {
            const customSession = session as CustomSession; // Ép kiểu session thành CustomSession
            customSession.subId = token.sub;
            return customSession;
        },
    }
})

export { handler as GET, handler as POST };