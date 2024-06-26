//@ts-nocheck

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { updateBalance } from "../../actions";
const prisma = new PrismaClient({
  log: ["query"],
});

export async function POST(req: NextRequest, res: NextResponse) {
    const { id, payment } = await req.json();
    const paymentInt = parseInt(payment);
    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            balance: {
                decrement: paymentInt
            }
        }
    })
    await updateBalance(paymentInt)
    return NextResponse.json(user);
}

export async function PATCH(req: NextRequest, res : NextResponse) {
    const { id, payment, balanceDue } = await req.json();
    const paymentInt = parseInt(payment);
    const balanceDueDate = new Date(balanceDue);

    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            balance: {
                increment: paymentInt
            },
            balanceDue : balanceDueDate

        }
    })
    return NextResponse.json(user);
}