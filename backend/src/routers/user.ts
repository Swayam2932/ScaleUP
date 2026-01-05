import {PrismaClient} from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";


const router = Router();
const prismaClient = new PrismaClient();
const JWT_SECRET = "swayam12"

// signin wih wallet
// signin a message
router.post("/signin", async(req, res) => {
    const temp_wallet_address = "9UemZnBoEdqXWUtjBsECUarqges7Cf9okJnwPBMJWxS4";
    const existingUser = await prismaClient.user.findFirst({
        where:{
            address : temp_wallet_address
        }
    })
    if(existingUser){
        const token = jwt.sign({
            userId: existingUser.id
        }, JWT_SECRET)

        res.json({
            token
        })
    }
    else{
        const user = await prismaClient.user.create({
            data:{
                address : temp_wallet_address
            }
        })
        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET)

        res.json({
            token
        })
    }
});

export default router;