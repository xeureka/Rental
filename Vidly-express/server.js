
const jwt = require('jsonwebtoken')

const SECRET_KEY = 'eureka'

// sample user data

const user = {
    id: '123',
    username: 'hexora'
}

// Function to create a jwt

function createToken(user) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
        expiresIn: '1h',
    });
    console.log('Generated Token:', token);
    // return token;
}


// function to verify a jwt

function verifyToken(token){

    try {

        const decoded = jwt.verify(token,SECRET_KEY)
        console.log('Decoded payload: ',decoded)
        
    } catch (error) {
        console.error('Token verification Failed: ',error.message)
    }
}

// Function to decode jwt without verification

function decodeToken(token){

    const decoded =jwt.decode(token);
    console.log('Decoded Payload without verificaitoin ',decoded)
}