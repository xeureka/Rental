import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function generateToken (phone: string, role = 'user'): string{
    const token = jwt.sign({userPhone: phone, userRole: role}, process.env.JWT_SECRET!)
    return token
}


export function verifyToken(token: string): string | JwtPayload{
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        return decoded;
    } catch (error) {
        throw new Error('Invalid Token')
    }
}