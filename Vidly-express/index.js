// Vidly movie rental app simple backend


require('dotenv').config()

const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json())

// List of movies

const catagories = [
    {id:1, genre:'Romance'},
    {id:2, genre: 'Action'},
    {id:3, genre: 'Comedy'}
]

// Getting all the list of geners

app.get('/api/geners/',(req,res) =>{
    res.send(catagories)
})

// Getting a single genre
app.get('/api/geners/:id',(req,res) =>{
    const id = req.params.id;
    
    const genra = catagories.find(g => g.id === parseInt(id));
    req.send(genra)
})


// genre input schema
const genreSchema = Joi.object({
    genre: Joi.string().min(2).max(15).required()
})

// genre schema validator middleware
const validateGenre = (req,res,next) => {

    const {error} = genreSchema.validate(req.body);

    if (error){
        return res.status(400).send({message: error.details[0].message})
    }
    next()
}

// creating a new genra

app.post('/api/geners/',validateGenre,(req,res) => {

    const newGenre = {
        id: catagories.length + 1,
        genre: req.body.genre
    }

    catagories.push(newGenre)
    res.send(catagories)
})

// updating an existing genre

app.put('/api/geners/:id',validateGenre,(req,res) =>{

    const id = req.params.id;
    const newGenre = catagories.find(g => g.id === parseInt(id));

    if (!newGenre){
        return res.send(400).send('Genre Not Found')
    }

    newGenre.genre = req.body.genre;

    res.send(catagories);
})

// delete existing genre

app.delete('/api/geners/:id',(req,res) =>{
    
    const id = req.params.id
    const genra = catagories.find(g => g.id === parseInt(id))

    if(!genra){
        return res.send(400).send('Genre Not Found')
    }

    const index = catagories.indexOf(genra);

    catagories.splice(index,1);
    res.send(catagories)
})

const PORT = process.env.PORT || 3000; 
app.listen(PORT,() =>{
    console.log(`Server Running on port ${PORT}. `)
})