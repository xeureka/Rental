const genreSchema = Joi.object({
    name: Joi.string().min(2).max(15).required()
})

// genre schema validator middleware
const validateGenre = (req,res,next) => {

    const {error} = genreSchema.validate(req.body);

    if (error){
        return res.status(400).send({message: error.details[0].message})
    }

    next()
}


router.post('/',validateGenre,async (req,res) => {

    try {

        const newGenre = new Genre({
            name: req.body.name
        })

        const result = await newGenre.save()
        
        res.send(result)

    } catch (error) {
        res.status(400).send(error.message)
        console.log(error)
    }
})
