"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRamptxn(amount:number, provider:string ){
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    
    
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;
    if(!userId){
        return {
            message: "USer not logged in"
        }
    }
     await prisma.onRampTransaction.create({
        data:{
            userId: Number(userId),
            amount: amount*100,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token

        }
    })
    return {
        message: "OnRamp transaction created successfully"
    }
}