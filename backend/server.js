const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
var cors = require('cors')
const moment = require('moment')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express()
const port = process.env.PORT || 5000;
app.use(cors()) 

app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config();
app.use(bodyParser.json())

// MySQL
const pool = mysql.createPool({
    connectionLimit : 10000,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'mind-roots-club'
})


app.get('/', (req, res) => {
    
    pool.getConnection((err, connection) => {
        
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        console.log("Hello conn")
        connection.query('SELECT * from UserProfiles', (err, rows) => {
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

  
app.post("/generateToken", (req, res) => {
    
  
 


    let jwtSecretKey ="abcsssawreyrtyfdvdwter53vtwtdc";
    let data = {
        time: Date(),
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);
});




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



app.get('/test/:name', (req, res) => {

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

app.get('/SignCheck/:name/:password', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT name,password from UserProfiles', (err, rows) => {
           
            
            
            connection.release() // return the connection to pool
            for(var i =0 ; i<rows.length ; i++) {
                if(req.params.name == rows[i].name && req.params.password == rows[i].password)
                {
                res.send(rows[i])
                break;    
               }
               
            }
            if(err) {  
                console.log(err)

            } 
            
        })
    })
    res.status(200)
    
})











// Add a record / beer
app.post('/apply', (req, res) => {
    // console.log("a")
    // console.log(req.body)
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        res.status(200)
        const params = req.body
        params.dob = moment().format('YYYY-MM-DD')
        connection.query('INSERT INTO UserProfiles SET ?' , params , (err, rows) => {
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