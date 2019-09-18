const express = require('express');
const cors = require('cors');
const app = express();

const data = require('./client/src/data/test-board-1.json')
app.use(cors());

app.get('/shuffle', async (req,res)=>{
    let i, j ,temp, letterData;
    letterData = data.board;
    i = letterData.length;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = letterData[j];
        letterData[j] = letterData[i]
        letterData[i]= temp;
    }
    res.send(letterData);
})
// Server Port following by env file setting
// or use server port as 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
console.log(`Server is listening '${PORT}`))