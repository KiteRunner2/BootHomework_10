const fs = require(`fs`);
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get(`/notes`,(req,res)=>{
    let output = fs.readFileSync('./public/notes.html');
    res.end(output);
});


app.get('/',(req,res)=>{
    let output = fs.readFileSync('./public/index.html');
    res.end(output);
});

app.get('*',function (req, res) {
    res.redirect('/');
});

app.listen(PORT,(req,res)=> {
    console.log(`server started on port ${PORT}`);
});