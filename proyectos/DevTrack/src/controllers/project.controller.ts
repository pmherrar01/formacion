import prisma from "../prisma";
import { Request, Response } from 'express';

export const createProject = async (req: Request, res: Response) => {

    try {
            const { name, description } = req.body
    const newProject = await prisma.project.create({
        data: {
        name,
        description
    }});

    res.status(201).json({mensaje: "projecto creado correctamente", project: newProject})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: "error al crear el projecto"})
    }

}

export const getProjects = async(req: Request, res: Response) => {
    try {
        const todosLosProjects = await prisma.project.findMany();

        res.status(201).json({mensaje: "listado de todos los projectos: ", projects: todosLosProjects})
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "error al listar los projectos"})
    }
}

export const getProjectById = async(req: Request, res:Response) => {
    try {

        const idFormateado = Number(req.params.id);

        const project = await  prisma.project.findUnique({
            where: {
                id: idFormateado
            }, include: {
                tickets: true
            }
        });

        res.status(201).json({mensaje: "projecto filtrado por el id: ", project: project})

    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "error al mostrar el projecto filtrnado por id"})
    }
} 