import { getUserSession } from "@/lib/get-user-session";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const user = await getUserSession();

        if(!user) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const data = await prisma.user.findUnique({
            where: {
                id: Number(user.id),
            },
            select: {
                fullName: true,
                email: true,
                password: false,
                
            }
        });
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Failed to fetch user info"}, {status: 500});
    }
}