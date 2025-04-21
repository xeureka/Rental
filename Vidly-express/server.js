
/**

 * hashing passwords
 * authenticating users
 * tesing the authenticatioin
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

// lets see about hashing passwords for now

const bcrypt = require('bcryptjs')

// Function to hash password

async function hashPassword(password){

    const salt = await bcrypt.genSalt(10)

    const hashed = await bcrypt.hash(password, salt)

    console.log(salt)
    console.log(hash)
}

async function verifyPassword(hash,salt){

    const isMatch = await bcrypt.compare('urk@2004',hash)

    console.log('Password: ',isMatch)

}


// hashPassword('urka@2004')



let hash = '$2b$10$v5KnhNMC/6xoTSUjjdLeO.Ch/0NmzAQuzQDo4u1fshdKf59aWxJmC'
let salt = '$2b$10$auiPgIAlbH20PB0DvVrN6e'

verifyPassword(hash,salt)

// lets implement the above all logic to the mongoose code and lets store the hash password in the database