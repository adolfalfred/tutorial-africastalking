// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import axios from "axios";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID || "",
//       clientSecret: process.env.GOOGLE_SECRET || "",
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {},
//       async authorize(credentials: any) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Please enter email and password");
//         }
//         try {
//           const { data } = await axios.post(
//             `${process.env.BACKEND_URL}/user/login`,
//             credentials
//           );
//           return data;
//         } catch (error: any) {
//           if (error?.response?.data) {
//             throw new Error(error?.response?.data.error);
//           }
//           throw new Error("Network error!");
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user, trigger, session }) {
//       if (trigger === "update") return { ...session };
//       if (user) {
//         try {
//           //@ts-ignore
//           if (!user?.type) {
//             const { data } = await axios.post(
//               `${process.env.BACKEND_URL}/user/signup`,
//               { ...user, password: `${user.email}@spark` }
//             );
//             token.user = {
//               id: data.id,
//               name: data?.name,
//               email: data?.email,
//               image: data?.image,
//               phone: data?.phone,
//               emailVerified: data?.emailVerified,
//               type: data?.type,
//               provider: "google",
//             };
//             //@ts-ignore
//             if (data?.token) token.user.token = data.token;
//           } else token.user = user;
//         } catch (error: any) {
//           if (error?.response?.data) {
//             throw new Error(error?.response?.data.error);
//           }
//           throw new Error("Network error!");
//         }
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       //@ts-ignore
//       session.user = token.user;
//       return session;
//     },
//   },
// };
