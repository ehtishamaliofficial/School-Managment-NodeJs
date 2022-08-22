const express = require('express')
const chalk=require('chalk')
const datebaseConnection=require('./database')

const app = express()
const port = 8000

// app.use(cors())
app.use(express.json());

app.use('/',  require('./Routes/authtication'))

app.listen(port, () =>{
     console.log(chalk.bgCyanBright(`School Managment listening on port ${port}!`))
     
})
