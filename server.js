const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello world')
})
// Server Port following by env file setting
// or use server port as 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
console.log(`Server is listening '${PORT}`))