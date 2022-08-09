const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-Parser");

const memos = [];
app.use(bodyParser.json());

app.get('/api/memos', (req, res) => {
  res.send(memos)
});

app.post("/api/memos", (req,res) =>{
    memos.push(req.body.content);
    res.send(memos)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});