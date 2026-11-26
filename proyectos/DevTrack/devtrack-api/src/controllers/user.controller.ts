import prisma from "../prisma";
import { Request, Response } from 'express';



export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const listUsers = await prisma.user.findMany({
            select: {
                id: true,
                name: true 
            }
        })

        res.status(200).json({mensaje: "La lista de los usuarios es: ", listUsers})
    } catch (error) {
        res.status(500).json({mensaje: "Error al obtener la lista de los usuarios"})
    }
};