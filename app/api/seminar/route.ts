import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import authenticate from "@/lib/auth";

export const index = async (req: Request) => {
  const data = prisma.seminar.findMany();
  return NextResponse.json(
    { message: "Getting all data...", data },
    { status: 200 }
  );
};

export const create = async (req: Request) => {
  const user = await authenticate(req);
  console.log(user);
  // if (!user)
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  // const { name, date } = await req.json();
  // const data = prisma.seminar.create({
  //   data: {
  //     name,
  //     date,
  //   },
  // });
  // return NextResponse.json({ message: "Data created", data }, { status: 201 });
};
