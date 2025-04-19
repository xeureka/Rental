

const jwt = require('jsonwebtoken')




const sampleUser = {
    id:'234',
    username: 'Eureka'
}

// jwt contains
// header
// payload
// signiture


// Function to create a JWT
function createToken(user){
    const SECRET_KEY = 'jsonPrivateKey'
    const token = jwt.sign({id: user.id, username: user.username},SECRET_KEY);
    
    return token

}

function verifyToken(token){

    try {
        const SECRET_KEY = 'jsonPrivateKey'


        const decoded = jwt.verify(token,SECRET_KEY)
        
        return decoded
        
    } catch (error) {
        console.log('Failed Verificatioin: ')
    }

}

function decodeToken(token){

    const result = jwt.decode(token)
    console.log(result)

}

let token = createToken(sampleUser)

decodeToken(token)
