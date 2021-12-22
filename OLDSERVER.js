//const Discord = require('discord.js');
//const client = new Discord.Client();
//const config = require('./config.json');
//const command = require('./command.js');
const http = require('http');
const https = require('https');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer  = require('multer');
const fs = require('fs');

///connect was here

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySQL connected");
});


const storage = multer.diskStorage({
    destination: '/var/www/front-end//uploads/',
    filename: function (req, file, cb){
        const filenamer = `/var/www/front-end/uploads/${req.params.id}${path.extname(file.originalname)}`;
        //console.log(filenamer);
        let sql = `SELECT id, location FROM images WHERE users_id = ${req.params.id}`;
        let sql2 = ``;

        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            if(result.length === 0){
                sql2 = `INSERT INTO images (location, users_id, yes, no) VALUES ('${filenamer}', ${req.params.id}, 0, 0);`
            }else{
                try {
                    fs.unlinkSync(result[0].location);
                    //file removed

                } catch(err) {
                    console.log("tried to remove nonexistent file")
                }
                sql2 = `UPDATE images SET location='${filenamer}', yes=0, no=0 WHERE users_id=${req.params.id};`;
            }
            let query2 = db.query(sql2, (err2, result2) => {
                if(err2) throw err2;
            });

            cb(null, req.params.id, 'a');
        });
        
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 12000*1024 }}).single('UserImage');

const express = require('express')
const cors = require('cors')
const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '1mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}))

app.use(express.static(path.join(__dirname, 'build')));



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////









app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/top', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/something', (req,res) => {
    res.send("hi")
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////





app.get('/find/:username',  (req,res) => {
    if(req.params.username === '') return res.json([1,2,3]);
    let sql = `SELECT id FROM users WHERE username='${req.params.username}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

app.get('/findUser/:id',  (req,res) => {
    if(!req.params.id) return res.json([]);
    let sql = `SELECT username FROM users WHERE id='${req.params.id}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

app.get('/users',  (req,res) => {
    const {username, pass} = req.query;
    let sql = `SELECT * FROM users WHERE username='${username}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        
        if(!username || !pass || !result[0]) return res.json({"data":-1});
        bcrypt.compare(pass, result[0].userPassword, function(err, passResult) {
            if(passResult){
                res.json({"data":result[0].id});
            }else{  
                res.json({"data":-1});
            }
        });
    });
});

app.post('/add/user', (req, res) => {
    let sql = `INSERT INTO users (username, userPassword, ref) VALUES ('${req.body.newusername}', '${req.body.newpassword}', 1);`
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    });  
});

app.post('/add/image/:id', (req, res) => {
    if(!req.params.id) return res.sendStatus(69);
    
    const file = upload(req,res, (err) => {
        if(err){
            res.sendStatus(200)
        }else{
            res.sendStatus(200);
        }
    });
});

app.get('/getimage/:id', (req, res) => {

    let sql = `SELECT location FROM images WHERE users_id = ${req.params.id}`;

    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        let img = '';
        if(req.params.id === '-1'){
            img = '/root/Chrisy/uploads/-1.png';
            res.sendFile(img);
        }else if(result.length === 0){
            img = '/root/Chrisy/uploads/0.png';
            res.sendFile(img);
        }else{
            img = result[0].location;
            res.sendFile(img);
        }
    });
});

app.get('/users/top', (req,res) => {
    let sql = `select * from images order by yes desc limit 10;`
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.send(result);
    });
});

app.post('/vote', (req, res) => {
    let field = 'yes';
    if(req.body.ballot === 0){
        field='no'
    };
    

    let sql = `SELECT \`${field}\` FROM images WHERE users_id=${req.body.img};`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        let number = 0;
        if(field === 'yes'){
            number = result[0].yes
        }else{
            number = result[0].no
        }
        let sql2 = `UPDATE images SET ${field}=${number+1} WHERE users_id = ${req.body.img}`;
        let query2 = db.query(sql2, (err2, result2) => {
            if(err2) throw err2;
            res.sendStatus(200);
        });
        
    });
});

app.get('/getmax', (req, res) => {
    let sql1 = `SELECT MAX(id) FROM images;`;
    let query1 = db.query(sql1, (err, result) => {
        if(err) throw err;
        let max = result[0]['MAX(id)'];
        res.json({max});
    });
})

app.post('/incrementRef', (req,res) => {
    let sql1 = `SELECT MAX(id) FROM images;`;
    let query1 = db.query(sql1, (err, result) => {
        if(err) throw err;
        let max = result[0]['MAX(id)'];
        let sql3 = `UPDATE users SET ref=(users.ref+1) WHERE id=${req.body.id} AND users.ref+1 <= ${max}`;
        let query3 = db.query(sql3, (err2, result2) => {
            if(err2) throw err2;
            res.sendStatus(200);
        });
    });
});

app.get('/dashboard/data/:id', (req,res) => {
    let id = req.params.id;
    if(id === '1'){
        let sql = `SELECT users.id, username, ref, images.users_id, images.location, yes, no FROM users LEFT JOIN images ON users.id = images.users_id;`;
        let query = db.query(sql, (err, result) => {
            res.send(result);
        });
    }else{
        res.send([]);
    }
    
});

app.get('/getref/:id', (req,res) => {
    let myId = req.params.id;
    let sql = `SELECT ref FROM users WHERE id=${myId};`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        theID = result[0].ref;
        res.json({theID});
    });
});

app.get('/users/next/:id', (req,res) => {
    let myId = req.params.id;
    let theID = 0;
    if(myId === '-1'){
        myId=1;
    }
    
    let sql = `SELECT users.id, ref, username, images.users_id, location FROM users JOIN images ON (images.id=(users.ref)) WHERE users.id=${myId};`;
    
    let query = db.query(sql, (err, result) => {
        if(err) throw err;

        let sql1 = `SELECT MAX(id) FROM images;`;
        let max = 9999999;
        let query1 = db.query(sql1, (err2, result2) => {
            if(err2) throw err2;
            max = result2[0]['MAX(id)'];
            let sql4 = `UPDATE users SET ref=(users.ref+1) WHERE id=${req.params.id} AND users.ref+1 <= ${max+1}`;
            let query4 = db.query(sql4, (err4, result4) => {
                if(err4) throw err4;
                res.json({result, max});
            });
        });
    });
});

app.post('/reset', (req,res) => {
    let sql2 = `UPDATE users SET ref=1 WHERE id=${req.body.id};`;

    let query2 = db.query(sql2, (err2, result2) => {
        if(err2) throw err2;
        res.sendStatus(200);
    });
});

app.post('/delete', (req,res) => {
    let sql2 = `DELETE FROM images WHERE images.users_id=${req.body.id};`;
    let sql = `DELETE FROM users WHERE id=${req.body.id};`;

    try {
        if(req.body.location !== null){
            fs.unlinkSync(req.body.location);
        }
    } catch(err) {
        console.log("tried to remove nonexistent file")
    }
    let query = db.query(sql2, (err, result) => {
        if(err) throw err;
        let query2 = db.query(sql, (err2, result2) => {
            if(err2) throw err2;
            res.sendStatus(200);
        });
    });
    
});

app.post('/delete/image', (req,res) => {
    try {
        if(req.body.location !== null){
            fs.unlinkSync(req.body.location);
        }
    } catch(err) {
        console.log("tried to remove nonexistent file")
    }

    let sql2 = `DELETE FROM images WHERE images.users_id=${req.body.id};`;

    let query2 = db.query(sql2, (err2, result2) => {
        if(err2) throw err2;
        res.sendStatus(200);
    });
});
    
app.listen(8080, () => {
    console.log("Server started on 8080");
});
