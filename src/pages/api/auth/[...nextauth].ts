import NextAuth from 'next-auth';
import LinkedInProvider from 'next-auth/providers/linkedin';
export const authOptions = {
  // Configure one or more authentication providers
  callbacks: {
    async jwt({ token, account }) {
      console.log(account);
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      // is this the way?
      // authorization: { params: { scope: 'r_network' } },
    }),

    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
