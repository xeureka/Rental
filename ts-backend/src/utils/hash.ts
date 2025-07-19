import bcrypt from 'bcryptjs'


export async function hashPassword (password: string): Promise<string>{
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    return hashed;
}

export async function validatePassword(hashedPassword: string, actualPassword: string): Promise<boolean>{
    const isValid = await bcrypt.compare(hashedPassword, actualPassword)
    return isValid;
}