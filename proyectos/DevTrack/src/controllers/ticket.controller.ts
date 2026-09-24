import prisma from "../prisma";
import e, { Request, Response } from "express";

export const createTicket = async (req: Request, res: Response) => {
    try {
        const { title, description, status, priority, projectId, assigneeId } = req.body;

        const newTicket = await prisma.ticket.create({
            data: {
                title,
                description,
                status,
                priority,
                projectId,
                assigneeId
            }});

            res.status(201).json({mensaje: "ticket creado correctamente", ticket: newTicket});

    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "error al crear el ticket"})
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
        console.error(error);
        res.status(500).json({mensaje: "error al eliminiar el ticket"})
    }
}