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
    // console.log('call for notes... app.get pi/notes');
    let output = JSON.parse(fs.readFileSync('./db/db.json','utf-8'));
    // console.log(output);
    res.json(output);
});

app.post('/api/notes',(req,res)=>{
    console.log('call for post api/notes');
    console.log(req.body);
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
    console.log('delete request received id',req.params.id);
    let notes = JSON.parse(fs.readFileSync('./db/db.json'));
    // console.log(notes);
    
    notes.forEach((element,index) => {
        // console.log(element.id);
        if (element.id === Number(req.params.id)){
            console.log(`found note! at index ${index}`);
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