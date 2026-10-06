import prisma from "../prisma";
import  { Request, Response } from "express";
import { createTicketSchema } from "../schemas/ticket.schema";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AuthRequest } from "../middlewares/auth.middlewares";

export const createTicket = async (req: AuthRequest, res: Response) => {
    try {
        console.log(req.user);
        const validatedData = createTicketSchema.parse(req.body);

        const newTicket = await prisma.ticket.create({
            data: {
                ...validatedData,
                assigneeId: req.user.id
            }
                
            });

            res.status(201).json({mensaje: "ticket creado correctamente", ticket: newTicket});

    } catch (error) {
        if (error instanceof ZodError) {
    return res.status(400).json({ 
        mensaje: "datos de entrada invalidos", 
        errores: error.issues 
    });
}

        console.error(error);
        res.status(500).json({mensaje: "Error al intentar crear el ticket"})
    }
};

export const updateTicketStatus = async (req: Request, res: Response) => {
    try {
        const idFormateado = Number(req.params.id);

        const { status } = req.body;

        const nuevoStadoTicket = await prisma.ticket.update({
            where: {
                id: idFormateado
            }, data: {
                status
            }
        })

        res.status(200).json({mensaje: "ticket actualizado", ticket: nuevoStadoTicket})

    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: "error al actualizar el estado"})
    }
}

export const deleteTicket = async (req: Request, res: Response) =>{
   
    try {
            const idFormateado = Number(req.params.id);

    const ticketABorrar = await prisma.ticket.delete({
        where: {
            id: idFormateado
        }
    });

    res.status(200).json({mensaje: "ticket eliminado correctamente",  ticket: ticketABorrar})
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === "P2025"){
                return res.status(404).json({mensaje: "El ticket que intentas borrar no existe"})
            }
        }

        console.error(error);
        res.status(500).json({mensaje: "Error al intentar eliminar el ticket"});
    }
}