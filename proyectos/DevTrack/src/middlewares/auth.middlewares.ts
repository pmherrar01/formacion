import { Request, Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: any;
}


export const verifyToken =  (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({mensaje: "Acceso denegado, no hay token"})
    }

    const partes: string[] = token.split(" ");
    const tokenLimpio: string = partes[1];

    try {
        const payload = jwt.verify(tokenLimpio, process.env.JWT_SECRET as string);
        req.user = payload; // Aquí le pegamos la pegatina con los datos al request
        jwt.verify(tokenLimpio, process.env.JWT_SECRET as string)
        next();
        
    } catch (error) {
        res.status(401).json({mensaje: "token invalido o expirado"})
    }

}

export const isAdmin = (req:AuthRequest, res: Response, next: NextFunction) => {
    if(req.user.role !== "ADMIN" ){
        return res.status(403).json({mensaje: "Acceso denegado: solo administradores"})
    }

    next();
}