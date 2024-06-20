

import { connectDB } from "@/app/libs/connectdb";
import { NextResponse } from "next/server";

import User from "@/app/modals/User";

import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    await connectDB()
      .then((fullData) => {
        console.log(fullData);
      })
      .catch((err) => {
        console.log(err);
      });

    const body = await request.json();
    const { name, email, password } = await body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return new NextResponse("User Already exists", { status: 404 });
    }

    if (!email || !name || !password) {
      return new NextResponse("All fields are required!", { status: 204 });
    }

    if (password.length < 6) {
      return new NextResponse("Password must be long of 6 charecter", { status: 411 });
    }
    if (name.length > 30) {
      return new NextResponse("fulName not longoer than 30 charecter", { status: 409 });
    }
    if (name.length < 3) {
      return new NextResponse("fullName must be long of 3 charecter", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    await User.create(user).catch((error) => {
      console.log(error);
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    console.log(err, "REGISTRATION_ERROR");
    return new NextResponse("Internel Error", { status: 500 });
  }
}
