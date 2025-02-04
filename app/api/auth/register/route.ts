import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
  try {
    const { username, name, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        name,
        password: hashedPassword,
        role: {
          connect: { name: "dummyuser" },
        },
      },
    });

    return NextResponse.json(
      { message: "User created", user },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error creating user." },
      { status: 401 }
    );
  }
};
