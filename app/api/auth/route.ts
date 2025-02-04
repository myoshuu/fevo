import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret-key";
// console.log(SECRET_KEY);

export const login = async (req: Request) => {
  try {
    const { username, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user)
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch)
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    return NextResponse.json({ message: "Logged in", token }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error logging in." }, { status: 401 });
  }
};

export const register = async (req: Request) => {
  try {
    const { username, name, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        name,
        password: hashedPassword,
        role: {
          connect: { name: "user" },
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
