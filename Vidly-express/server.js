
/**

 * JSON web tokens
 * generating auth tokens
 * storing secret keys in the .env variable
 * setting a response headers
 * encapsulating logic in mongoose
 * authorization middleware
 * pretecting routes
 * Getting the current user
 * loggin ou the user
 * role based authorization
 * testing authorization
 */

// how to cmpare and verify password wors in bcrypt

// lets work on comparing auth thing


const bcrypt = require('bcryptjs')

// Fuction hashPassword


async function hashPassword(password){
    const salt = await bcrypt.genSalt(10)

    const hashed = await bcrypt.hash(password,salt)

    console.log(hashed)
}

// Function to verify password

async function verifyPassword(password,hashedPassword){
    try {
        const match = await bcrypt.compare(password,hashedPassword)

        console.log('Match: ',match)
        
    } catch (error) {
        concole.error('Error verifying password: ',error.message)
    }
}

verifyPassword('urka@2004','$2b$10$BEHNwnO9/0X3ho9.zRt0sez3P0UotPOVTH1F594oZCrHN8/hcdiDi')