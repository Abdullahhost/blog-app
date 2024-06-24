import { connectDB } from "@/app/libs/connectdb";
import User from "@/app/modals/User";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credential) {
                const { email, password, name } = credential as {
                    name: string;
                    email: string;
                    password: string;
                };

                try {
                    await connectDB();
                    const user = await User.findOne({ email: email });

                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    return user;
                } catch (err) {
                    console.log("Error", err);
                }
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
        // ...add more providers here
    ],

    pages: {
        signIn: "/login",
    },

    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {

        async signIn({ user, account }: { user: any, account: any }) {


            if (account.provider === "google") {
                try {

                    const { name, email } = user
                    await connectDB();

                    const existingUser = await User.findOne({ email: email })

                    if (existingUser) {
                        return user;
                    }

                    const newUser = new User({
                        name: name,
                        email: email
                    })

                    const res = await newUser.save();


                    if (res.status === 200 || res.status === 201) {
                        return user;
                    }
                    return user;

                } catch (err: any) {
                    console.log(err);
                }
            }

            return user;
        },

        async jwt({ token, user }) {
            if (user) {
                (token.name = user.name), (token.email = user.email);
            }
            return token;
        },

        async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        },
    },
};

