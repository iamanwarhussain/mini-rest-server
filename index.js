const express = require("express");
const usersData = require("./MOCK_DATA.json");
const fs = require("fs");
const { json } = require("stream/consumers");
const logger = require("./logger")
const morgan = require("morgan")

const app = express();
const port = 8080
app.use(express.urlencoded())

app.use(morgan("combined" , {
    stream : {
        write : (message) => logger.info(message.trim())
    }
}))

logger.info("Serveris running on port : 2323")
app.get("/users" , (req , res) => {
    logger.info("All users called.")
    return res.status(200).json(usersData)
})
app.get("/users/:id" , (req , res) => {
    const ID = Number(req.params.id)
    const user = usersData.find(u => u.id === ID)
    if(!user){
        logger.warn("User not found!")
        return res.status(404).send("404 Not found")
    }
    logger.info("User sent successfully!")
    res.status(200).json(user)
})
app.post("/users/add" , (req , res) => {
    const {id , first_name , last_name , email , gender , job_title} = req.body
    const newUser = {
        id : Number(id) , 
        first_name , 
        last_name , 
        email , 
        gender , 
        job_title
    }
    fs.readFile("./MOCK_DATA.json" , "utf-8" , (error , data) => {
        let container = []

        if(!error && data){
            try {
                container = JSON.parse(data)
            } catch (error) {
                console.error(error)
            }
        }

        container.push(newUser)

        fs.writeFile("./MOCK_DATA.json" , JSON.stringify(container , null , 2) , (error) => {
            if(error){
                logger.warn("Error writing file!")
                res.status(500).send("Error writing file!")
            }

            logger.info("User added successfully!")
            res.status(200).send("User added successfully!")
        })
    })

})
app.patch("/users/update/:id" , (req , res) => {
    const ID = Number(req.params.id)
    const {first_name , last_name , email , gender , job_title} = req.body
    const newUserData = {first_name , last_name , email , gender , job_title}
    fs.readFile("./MOCK_DATA.json" , "utf-8" , (error , data) => {
        if(error){
            console.log("Error occured while readng file.")
        }
        let container = []

        container = JSON.parse(data)

        const index = container.findIndex(i => i.id === ID)
        if(index === -1){
            logger.warn("No user is available to update!")
            return res.send("No user is available to update!")
        }

        container[index] = {
            ...container[index] ,
            ...newUserData
        }

        fs.writeFile("./MOCK_DATA.json" , JSON.stringify(container , null ,2 ) , (error) => {
            if(error){
                return res.status(500).send("Internal server error")
            }
            logger.info("User updated successfully!")
            res.status(200).send("User updated successfully!")
        })
    })

})
app.delete("/users/delete/:id" , (req , res) => {
    const ID = Number(req.params.id)

    fs.readFile("./MOCK_DATA.json" , "utf-8" , (error , data) => {
        if(error){
            return res.status(500).send("Internal server error!")
        }

        let container ;
        container = JSON.parse(data)

        const index = container.findIndex(i => i.id === ID)

        if(index === -1){
            logger.info("User not found")
            res.status(404).send("404 Not found")
        }

        container.splice(index , 1)

        fs.writeFile("./MOCK_DATA.json" , JSON.stringify(container , null , 2) , (error) => {
            if(error){
                logger.warn("Unable to remove user!")
                res.send("Unable to remove user!")
            }
            logger.info("User removed successfully!")
            res.status(200).send("User removed successfully!")
        })
    })
})

app.listen(port , console.log("Server is running on port : " , port));