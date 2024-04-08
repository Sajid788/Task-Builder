const express = require('express')
const cors = require('cors');
const {connection, PORT} = require('./config/db')
const { TaskRouter } = require("./routes/task_routes");

const app = express()
app.use(cors());
app.use(express.json())

app.get('/', (_,res)=>{
    res.send({msg:"api is live"})
})

app.use("/task",TaskRouter);

app.listen(PORT, async()=>{
    try {
        await connection
        console.log("connected deta base")
    } catch (error) {
        console.log(error)
    }
    console.log(`api is running ${PORT}`)
})