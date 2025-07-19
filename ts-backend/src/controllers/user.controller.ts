import {Request,Response} from 'express'
import {Users} from '../models/user.model'
import { hashPassword,validatePassword } from '../utils/hash'
import { generateToken, verifyToken } from '../services/generateToken'

export const registerUser = async (req: Request, res: Response) => {
    try {
        
        const existingUser = await Users.findOne({phone: req.body.phone})
    
        if (existingUser){
            res.status(404).json({message: 'Phone number already in Use !'})
            return;
        }
        let securePassword = await hashPassword(req.body.password);
    
        let newUser = new Users({
            name: req.body.name,
            phone: req.body.phone,
            password: securePassword
        })
        await newUser.save()
        let token: string | null = null;

        if (newUser.phone && newUser.role){
            token = generateToken(newUser.phone, newUser.role)
            res.header('authorization', token)
        }

        res.status(201).json({message: 'user registered sucessfull !!'})

    } catch (error) {
        console.log('Error registering a user !')
        res.status(400).json(error)   
    }
}

export const loginUser = async (req: Request, res: Response) =>{
    try {
        const userExists = await Users.findOne({phone: req.body.phone})

        if (!userExists){
            res.status(404).json({message: 'user does not exist go to the register page !!'})
            return;
        }
        const givenPassword = req.body.password;
        let isValidPass ;
        if (userExists.password){
            isValidPass = validatePassword(givenPassword, userExists.password)
        }
        
        if (!isValidPass){
            res.status(401).json({message: 'Invalid phone Number or Password !!'})
            return;
        }
        let token: string | null = null;
        if (userExists.phone && userExists.role){
            token = generateToken(userExists.phone, userExists.role)
            res.header('authorization', token)
        }
        res.status(201).json({message: 'user login sucessful !!'})

        
    } catch (error) {
        console.log('Error logging the user !')
        res.status(400).json(error)   
    }
}

export const logoutUser = async (req: Request, res: Response) =>{
    try {
        res.clearCookie('authorization').json({
            message: 'User loggedout sucessfull !!'
        }).status(200)
    } catch (error) {
        res.json('Error logginout the user !!')
    }
}