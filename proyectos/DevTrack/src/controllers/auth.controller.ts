import prisma from "../prisma";
import { Request, Response } from "express";
import { registerSchema } from "../schemas/auth.schema";
import bcrypt  from "bcrypt";
import { email, json, ZodError } from "zod";
import  jwt  from "jsonwebtoken";
import { loginSchema } from "../schemas/auth.schema";

export const register = async (req: Request, res: Response) => {

    try {
    const validatedRegister = registerSchema.parse(req.body)
    
    if( await prisma.user.findUnique({
        where: {
            email: validatedRegister.email
        }
    })){
        return res.status(400).json({mensaje: "Ese usuario ya existe no se puede crear otro con ese mismo correo"})
    }

    const passwordEncript = await bcrypt.hash(validatedRegister.password, 10);
    const name =  validatedRegister.name;
    const email = validatedRegister.email;
    const role = validatedRegister.role;

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: passwordEncript,
            role
        }
    })

    const { password, ...usuarioLimpio } = newUser;

    res.status(201).json({mensaje: "usuario creado perfectamente", user: usuarioLimpio})
    
    } catch (error) {
        if (error instanceof ZodError){
            return res.status(400).json({
            mensaje: "datos de entra invalidos",
            errores: error.issues
            })
        }
        console.error(error);
        res.status(500).json({mensaje: "Error al intentar crear el usuario"})
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const validatedDataLogin = loginSchema.parse(req.body);

        const usuario = await prisma.user.findUnique({
            where: {
                email: validatedDataLogin.email
            }})

        if(!usuario){
            return res.status(404).json({mensaje: "No existe ningun usuario con ese correo"});
        }

        if (! await bcrypt.compare(validatedDataLogin.password, usuario.password)){
            return res.status(401).json({mensaje: "la contrasela es incorrecta"})
        }

        const token =  jwt.sign(
            {id: usuario.id, role: usuario.role},
            process.env.JWT_SECRET as string,
            { expiresIn: "2h" }
            
        );

        const  { password, ...usuarioLimpio } =  usuario;

        res.status(200).json({mensaje: "Login correcto", token: token, usuario: usuarioLimpio})

    } catch (error) {
        
    }
}