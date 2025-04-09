
require('dotenv').config()

const express = require('express')
const Joi = require('joi')


const app = express()
app.use(express.json())


// Courses List used as a mock DB

const courses = [
    {id:1, name:'course one'},
    {id:2, name:'course two'},
    {id:3, name:'course three'}
]

// GET all the courses

app.get('/api/courses',(req,res) =>{
    res.send(courses)
})

// GET a single course

app.get('/api/courses/:id',(req,res) =>{

    const id = req.params.id;

    const course = courses.filter(c => c.id === parseInt(id));

    if (!course){
        return res.send(404).send('Course Not FOund')
    }
    res.send(course)
})

// Validate user input using Joi


// Input schema
const courseSchema = Joi.object({
    name: Joi.string().min(3).max(20).required()
})

// validator middleware

const validateCourse = (req,res,next) => {
    const {error} = courseSchema.validate(req.body);

    if (error){
        return res.status(400).send({message: error.details[0].message})
    }
    next()
}

// Adding new course using POST
app.post('/api/courses',validateCourse,(req,res) =>{

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course)
    res.status(201).send(courses)
})

// updating an existing course using PUT
app.put('/api/courses/:id',validateCourse,(req,res) =>{

    const id = req.params.id;
    const course = courses.find(c => c.id === parseInt(id))
    
    if (!course){
        return res.send(404).send('Course Not Found.')
    }

    course.name = req.body.name;

    res.send(courses)

})

// deleting a course sing DELETE
app.delete('/api/courses/:id',(req,res) =>{

    const id = req.params.id;
    const course = courses.find(c => c.id === parseInt(id))

    if (!course){
        return res.send(404).send('Course Not Found.')
    }

    const index = courses.indexOf(course);
    
    courses.splice(index,1);
    res.send(courses)
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log(`Server Running on port ${PORT}. `)
})