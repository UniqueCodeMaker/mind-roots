const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const mysql = require('mysql')
var smtpTransport = require('nodemailer-smtp-transport');
var nodemailer = require('nodemailer');
var cors = require('cors')
const moment = require('moment')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// const moment = require('moment');
const app = express()

// import handlebars from "handlebars";
const port = process.env.PORT || 5000;
app.use(cors()) 
// app.use(bodyParser.urlencoded({limit: '128mb', extended: true}));
dotenv.config();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true, parameterLimit: 500000 }));
app.use(bodyParser.text({ limit: '200mb' }));
// MySQL
const pool = mysql.createPool({
    connectionLimit : 10000,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'mind-roots-club'
})


app.get('/', async (req, res) => {
        
    pool.getConnection((err, connection) => {
        
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

         connection.query('SELECT * from UserProfiles', (err, rows) => {
            connection.release() // return the connection to pool
            
            if(!err) {  
                
                for(var i = 0 ; i < rows.length ; i++)
                {
                
                        rows[i].dob = moment(rows[i].dob).format('YYYY-MM-DD')

                }
                    
                    res.send(rows);
            } else {
                console.log(err)
            }
           
        })
       
    })
    // res.sendStatus(200)

})

app.post('/', (req, res) => {
    // console.log("Hello")
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from UserProfiles', (err, rows) => {
            connection.release() // return the connection to pool
            console.log("Hello conn")   
            if(!err) {  
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
    res.status(200)
    
})

app.get('/testdata/:value', (req, res) => {
    // console.log("Hello")
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const query1 = 'SELECT * from UserProfiles ORDER BY name DESC'
        const query2 = 'SELECT * from UserProfiles ORDER BY name ASC'
        const query = req.params.value=="true" ? query1 : query2
        // console.log(typeof(true))
        connection.query(query, (err, rows) => {
            connection.release() // return the connection to pool
            console.log("Hello conn")   
            if(!err) {  
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
    res.status(200)
    
})

app.get('/loggedin/:value', (req, res) => {
    // console.log("Hello")
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const query1 = 'SELECT * from UserProfiles WHERE email = ?'
        connection.query(query1 ,req.params.value , async(err, rows) => {
            connection.release() // return the connection to pool
            console.log("Hello conn")   
            if(!err) {  
                
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
    res.status(200)
    
})



















app.get('/testemail/:value', (req, res) => {
    // console.log("Hello")
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const query1 = 'SELECT * from UserProfiles ORDER BY email DESC'
        const query2 = 'SELECT * from UserProfiles ORDER BY email ASC'
        const query = req.params.value=="true" ? query1 : query2
        // console.log(typeof(true))
        connection.query(query, (err, rows) => {
            connection.release() // return the connection to pool
            console.log("Hello conn")   
            if(!err) {  
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
    res.status(200)
    
})


app.get('/View', (req, res) => {
    // console.log("Hello")
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * FROM Addevent', (err, rows) => {
            connection.release() // return the connection to pool
            console.log("Hello conn")   
            if(!err) {  
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
    res.status(200)
    
})



app.get('/SearchVal/:search', (req, res) => {
    
    pool.getConnection((err, connection) => {
        
        if(err) throw err
        const search  =  (req.params.search)
        console.log(`connected as id ${connection.threadId}`)
        console.log("Hello conn")
connection.query(`SELECT * from UserProfiles where name LIKE '${req.params.search}%' OR email LIKE '${req.params.search}%' OR mobile LIKE '${req.params.search}%' OR dob LIKE '${req.params.search}%' OR gender LIKE '${req.params.search}%' OR transaction LIKE '${req.params.search}%'` ,   (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {  

                res.send(rows)




            } else {
                console.log(err)
            }

        })
    })
    res.status(200)
    
})


app.get('/SearchEve/:search', (req, res) => {
    
    pool.getConnection((err, connection) => {
        
        if(err) throw err
        const search  =  (req.params.search)
        console.log(`connected as id ${connection.threadId}`)
        console.log("Hello conn")
connection.query(`SELECT * from Addevent where lead LIKE '${req.params.search}%' OR event LIKE '${req.params.search}%' OR location LIKE '${req.params.search}%' OR etime LIKE '${req.params.search}%' OR budget LIKE '${req.params.search}%' OR fees LIKE '${req.params.search}%'` ,   (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {  

                res.send(rows)




            } else {
                console.log(err)
            }

        })
    })
    res.status(200)
    
})


app.get('/Delete/:id', (req, res) => {
    // console.log("Hello")
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE FROM UserProfiles WHERE id = ?', req.params.id  , (err, rows) => {
            connection.release() // return the connection to pool
            console.log("Hello conn")   
            if(!err) {  
                res.send("User deleted")
            } else {
                console.log(err)
            }

        })
    })
    res.status(200)
    
})

app.get('/DeletEvents/:id', (req, res) => {
    // console.log("Hello")
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE FROM Addevent WHERE id = ?', req.params.id  , (err, rows) => {
            connection.release() // return the connection to pool
            console.log("Hello conn")   
            if(!err) {  
                res.send("User deleted")
            } else {
                console.log(err)
            }

        })
    })
    res.status(200)
    
})

  
app.post("/generateToken/:name/:password", (req, res) => {
    
    console.log("generateToken")
 


    let jwtSecretKey ="abcsssawreyrtyfdvdwter53vtwtdc";
    let data = {
        time: Date(),
        userName: req.params.name,
        password: req.params.password,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.json(token);
});

app.get('/reject/:email', (req, res) => {
    // console.log("Hello")
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE FROM UserProfiles WHERE email = ?', req.params.email  , (err, rows) => {
            connection.release() // return the connection to pool
            console.log("Hello conn")   
            if(!err) {  
                res.send("User Rejected...")
            } else {
                console.log(err)
            }

        })
    })
    res.status(200)
    
})

app.post("/sendmail", (req, res) => {


var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    service: 'gmail',
    auth: {
      user: 'mr.rudraxmehta@gmail.com',
      pass: 'oaizpngvbwmtmnme'
    }
  }));

var mailOptions = {
  from: 'mr.rudraxmehta@gmail.com',
  to: 'mr.rudraxmehta@gmail.com',
  subject: 'I am Applying to join this Club Application',
  text: 'That was easy!',
  html: `
  
    <div style="padding:10px; border:1px ; border-style:solid  ;   border-radius:110px ">
        <center><h3>Applicant Details</h3></center>
        <hr/>
        <b><img src="cid:img" alt="Client_Dp" style="padding:10px ; margin-left:40px;"/></b>
        <ul style="list-style-type:square ; font-size:15px ;" >
        <li><b>Email: ${req.body.email}</b></li>
        <li><b>Name: ${req.body.name}</b></li>
        <li><b>Mobile: ${req.body.mobile}</b></li>
        <li><b>DOB: ${req.body.dob}</b></li>
        <li><b>Transaction_ID: ${req.body.transaction}</b></li>
        <li><b>Gender: ${req.body.gender}</b></li>
        </ul><center>
        <a href ="http://localhost:5000/reject/${req.body.email}" target="_self" style="cursor:pointer!important;"><button type="button"  style = "background-color: transparent ; padding:10px  ; border:2px ;  border-style: solid ;  border-radius:10px ; cursor:pointer"
         
        >Reject</button></a>
        <a href ="http://localhost:5000/approve/${req.body.email}" target="_self" style="cursor:pointer!important;"><button type="button" style = "background-color: transparent ; padding:10px  ; border:2px ;  border-style: solid ;  border-radius:10px ;  ">Accept</button></a>
        </center>
        </div>
  
  
  `,
  attachments: [{
    filename: 'img.jpg',
    path: `${req.body.ImageUrl}`, // path contains the filename, do not just give path of folder where images are reciding.
    cid: 'img' // give any unique name to the image and make sure, you do not repeat the same string in given attachment array of object.
   }]
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
   
});

app.get("/approve/:email", (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`Approve called`)
        
        connection.query('UPDATE UserProfiles SET status = ? where email = ?', ["Approved" , req.params.email ] , (err, rows) => {
            connection.release() // return the connection to pool
            console.log("Hello conn")   
            if(!err) {  
                
                res.send("User Approved successfully")
            } else {
                console.log(err)
            }

        })
    })
    res.status(200)

})



// Update a record / beer
app.post('/Edit', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
           
        const { id ,  	name ,	email ,	mobile	 , dob	 , gender	, password , transaction } = req.body
    
        connection.query('UPDATE `UserProfiles` SET `id`= ? ,`name`= ?,`email`= ?,`mobile`=? ,`dob`=? ,`gender`=? ,`password`=? ,`transaction`=? WHERE id= ?', [  id ,   name ,	email ,	mobile	 , dob	 , gender	, password , transaction , id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`User with the name: ${name} has Updated .`)
            } else {
                console.log(err)
            }

        })

       console.log("Hello")
    })
})



// Update a record / beer
app.post('/Editevent', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id ,  lead , event , edate , location , etime , budget , fees } = req.body
        // dob = 2022-02-02
        console.log(req.body)
        connection.query('UPDATE `Addevent` SET `id`= ? ,`lead`= ?,`event`= ?,`location`=? ,`etime`=? ,`budget`=? ,`fees`=?  WHERE id= ?', [  id ,   lead , event , edate , location , etime , budget , fees ,  id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                console.log("hello")
                res.send(`event with the name: ${lead} has Updated .`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})


app.get('/search/:searchvalue', (req, res) => {
    // console.log("Hello")
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * FROM Addevent WHERE event LIKE  ?',  req.params.searchvalue , (err, rows) => {
            connection.release() // return the connection to pool
            console.log("Hello conn SEARCH")   
            if(!err) {  
                
                res.send(rows)

            } else {
                console.log(err)
            }

        })
    })
    res.status(200)
    
})



app.get('/user/:name', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from UserProfiles WHERE name = ?', [req.params.name], (err, rows) => {
            connection.release() // return the connection to pool
          
            if(!err) {  
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
})

app.get('/events/:event', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from Addevent WHERE event = ?', [req.params.event], (err, rows) => {
            connection.release() // return the connection to pool
          
            if(!err) {  
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
})

app.get('/SignCheck/:email/:password/:Role', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
            // console.log(req.params)
            const email = req.params.email
            const password =  req.params.password
            const Role = req.params.Role
         
            connection.query('SELECT password from UserProfiles WHERE email = ?', email , async(err, rows) =>{
                // console.log(rows[0].password)
                var string=JSON.stringify(rows);
                var json =  JSON.parse(string);
                var result = json[0].password ; 
                const ismatch =  await bcrypt.compare(password,result)
               
         if(ismatch) { 
                connection.query('SELECT * from UserProfiles WHERE email = ?  AND Role = ?', [email ,  Role]  , (err, rows) => {
               if(!err)
               {
                        res.send(rows)
                   
               }
            
            if(err) {  
                console.log(err)

            } 
            
        })
           }
           else
           {
               res.send("Not matched")
           }
           
            })
            // connection.release() // return the connection to pool
            
     
    })
    // res.status(200).send("Hello")
    
})











// Add a record / beer
app.post('/apply', (req, res) => {
    
    pool.getConnection(async(err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        res.status(200)
        const params = req.body
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(params.password , salt )
        console.log(hashPassword)
        params.password = hashPassword
       connection.query('select * from UserProfiles Where email = ? ' , req.body.email ,    (err, rows) => {
           if(rows.length > 0)
{
    console.log("User already exists")
        res.send({
            "status" : "User already exists"
        })        
}
else
{
    connection.query('INSERT INTO UserProfiles SET ?' , params , (err, rows) => {
            
        console.log("matched")
         // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
}
connection.release()

    })
       
        // console.log(test)
            // console.log(req.body)
    })

})

app.get('/UserSelected/:id', (req, res) => {
  
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        res.status(200)
        
        connection.query('SELECT * FROM UserProfiles WHERE id =  ?' , req.params.id , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })

        // console.log(req.body)
    })
})

app.get('/EventSelected/:id', (req, res) => {
  
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        res.status(200)
        
        connection.query('SELECT * FROM Addevent WHERE id =  ?' , req.params.id , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })

        // console.log(req.body)
    })
})

// app.get('/Check/:mobile', (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log(`connected as id ${connection.threadId}`)

//         connection.query('SELECT mobile from UserProfiles WHERE  `mobile` = ?',req.params.mobile ,  (err, rows) => {
//             connection.release() // return the connection to pool
//             console.log(rows.mobile)
//             if(!err) {  
               
//             // if(rows.length > 0)    
//             //    { 
               
//                 // res.send(rows)
//             // } 
//             // } 
//             // else{
//                 res.send(rows)
//             }
            
//         })
//     })
//     res.status(200)
    
// })






app.post('/eventlog', (req, res) => {
    console.log("a")
    console.log(req.body)
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        res.status(200)
        const params = req.body
       params.edate = moment().format('YYYY-MM-DD')
        connection.query('INSERT INTO  Addevent SET ?' , params , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`user with the name: ${params.name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})

///////////////..............END..........//////////////////////////////////////////
// app.post("/userdetail", async(req,res) => {

//     const id = req.body.id;
    
//     try
//     {
//         pool.getConnection((err, connection) =>
//         {   connection.query('SELECT * from UserProfiles WHERE id = ?', id , (err, rows) => {
//             connection.release() // return the connection to pool
            
//             res.send(rows)
//             res.sendStatus(200)
//         })
//     })
//     }
//     catch(err) {
      
//     }
      


// })



// // Get a beer by ID
// app.get('/:id', (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log(`connected as id ${connection.threadId}`)

//         connection.query('SELECT * from beers WHERE id = ?', [req.params.id], (err, rows) => {
//             connection.release() // return the connection to pool

//             if(!err) {
//                 res.send(rows)
//             } else {
//                 console.log(err)
//             }

//         })
//     })
// })

// // Delete a records / beer
// app.delete('/:id', (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log(`connected as id ${connection.threadId}`)

//         connection.query('DELETE from beers WHERE id = ?', [req.params.id], (err, rows) => {
//             connection.release() // return the connection to pool

//             if(!err) {
//                 res.send(`Beer with the Record ID: ${[req.params.id]} has been removed.`)
//             } else {
//                 console.log(err)
//             }

//         })
//     })
// })





// // Update a record / beer
// app.put('', (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log(`connected as id ${connection.threadId}`)

//         const { id, name, tagline, description, image } = req.body

//         connection.query('UPDATE beers SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?', [name, tagline, description, image, id] , (err, rows) => {
//             connection.release() // return the connection to pool

//             if(!err) {
//                 res.send(`Beer with the name: ${name} has been added.`)
//             } else {
//                 console.log(err)
//             }

//         })

//         console.log(req.body)
//     })
// })



// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))