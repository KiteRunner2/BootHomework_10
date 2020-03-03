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
    let output = JSON.parse(fs.readFileSync('./db/db.json','utf-8'));
    res.json(output);
});

app.post('/api/notes',(req,res)=>{
    
    let notes = JSON.parse(fs.readFileSync('./db/db.json'));
    req.body.id = notes.length + 1;
    notes.push(req.body);
    fs.writeFileSync('./db/db.json',JSON.stringify(notes));
    res.end('end');
})


app.get('/',(req,res)=>{
    let output = fs.readFileSync('./public/index.html');
    res.end(output);
});

app.delete('/api/notes/:id',(req,res)=>{
    let notes = JSON.parse(fs.readFileSync('./db/db.json'));
    notes.forEach((element,index) => {
        if (element.id === Number(req.params.id)){
            notes.splice(index,1);
            fs.writeFileSync('./db/db.json',JSON.stringify(notes));
        }
        })
    
    res.end('note deleted');
})

app.get('*',function (req, res) {
    res.redirect('/');
});

app.listen(PORT,(req,res)=> {
    console.log(`server started on port ${PORT}`);
});