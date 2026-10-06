import prisma from "../prisma";
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password,  } = req.body;

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
                
            }
        })

        res.status(201).json({mensaje: "User añadido corecctamente", user: newUser})

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "hubo un problema al crear el usuario"})
    }
};