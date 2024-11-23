import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  debug: true, // Enable detailed logs for debugging
  pages: {
    error: "/auth/error", // Custom error page
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.email = user.email;
        token.authId = account.providerAccountId; // Google Auth ID
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.authId = token.authId; // Add Auth ID to session
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Avoid redirecting to /api/auth/error
      console.log("Redirect URL:", url);

      return baseUrl; // Stay on the base URL
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
