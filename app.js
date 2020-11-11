const express = require("express")
const router = require("./routes/index")
const app = express()
const port = 3000

const errorHandler = require("./middlewares/errorhandler.middleware")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)

app.use(errorHandler)


// app.listen(port, () => { 
//     console.log(`http:localhost:${port}`);
// })



module.exports = app
