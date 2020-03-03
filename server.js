const fs = require(`fs`);

const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.get(`/notes`,(req,res)=>{
    let output = fs.readFileSync('./public/notes.html');
    res.end(output);
});

app.get('/api/notes',(req,res) => {
    console.log('call for notes...');
});

app.post('/api/notes',(req,res)=>{
    console.log(req.body);
    let notes = JSON.parse(fs.readFileSync('./db/db.json'));
    notes.push(req.body);
    fs.writeFileSync('./db/db.json',JSON.stringify(notes));
    res.end('note saved');
})


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