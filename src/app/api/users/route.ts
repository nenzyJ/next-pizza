import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
export async function POST(request: NextRequest) {
    const data = await request.json();

    const user = await prisma.user.create({
        data
    });

    return NextResponse.json(user);
}