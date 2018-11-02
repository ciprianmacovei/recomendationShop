const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// let __dirname = "C:\Users\macov\Desktop\Licenta"

// app.use(express.static(__dirname));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Content-Type', 'application/json')

    // Pass to next layer of middleware
    next();

    // res.end();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(8000, ()=>{
	console.log('Server started');
})



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Cucurigu12',
  database : 'shopsite'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

// app.post("/login",function(res,req){
//   connection.query(,function(err,rows,fields){
//     connection.end();
//     if (!err){
      
//     }
//   })
// })
app.post("/register",function(req,res){
 let password = req.body.Password;
 let email = req.body.Email;
 if (password.trim().length != 0 && email.trim().length != 0){
  connection.query(`insert into users(Password,Email) values('${password}','${email}');`,function(err,rows,fields){
    if (!err){
      console.log("insertion succesfuly");
    }
    if (err){
      console.log(err);
    }
  })
 }
})



app.post("/login",function(req,res){
  let password = req.body.Password;
  let email = req.body.Email;
  connection.query(`select * from users where Password = '${password}' and Email = '${email}'`,function(err,rows,fields){
    if(!err){
      console.log(rows.length);
      if (rows.length!=0){
        res.json({ok:true,
                  user:email,
                  user_id:rows[0].id_users});
                  console.log('ciprian nu esti tare prost',rows[0].id_users);  
      }
      if (rows.length == 0){
        res.json({ok:false});
      }
    }
    if (err) {
      console.log(err);
    }

  })
})

app.post("/searchItems",function(req,res){

let searchItem = req.body;

  connection.query(`select * from items where nume = ${searchItem}`,function(err,rows,fields){
    if (err){
      console.log(err);

    }
    else {
      console.log(rows)
    }
  })


});


app.post("/rateItem/:id",function(req,res){


let id = req.params.id;
let rate = JSON.parse(Object.keys(req.body)).rate;
let userId =  JSON.parse(Object.keys(req.body)).user_id;
let user = JSON.parse(Object.keys(req.body)).user_name;
let cat = JSON.parse(Object.keys(req.body)).category;
  
  connection.query(`insert into rating(item_id,user_id,user_name,rating,item_category) values(${id},${userId},'${user}',${rate},${cat})`,function(err,rows,fields){
    if (err){
      console.log(err);
      res.send(false);
    }
    else {
      console.log("item has been rated with",id,rate,userId,user);
      res.json({data:rate});
    }
  });


})



app.get("/home",function(req,res){

  connection.query('select * from items',function(err,rows,fields){
    if(!err){
      
      console.log('########',rows);
      res.json({data : rows});
    }
    if(err){
      console.log(err);
    }
  })
})


app.post("/showPassword",function(req,res){

let id = req.body.id;
console.log(id,'hai in pula mea');

  connection.query(`select * from users where id_users = ${id}`,function(err,rows,fields){
    if(!err){
      
      console.log('########',rows);
      res.json({data : rows});
    }
    if(err){
      console.log(err);
    }
  })
})


app.post("/changePassword",function(req,res){

let id = req.body.id;
let pass = req.body.pass


  connection.query(`update users set Password = '${pass}' where id_users = ${id}`,function(err,rows,fields){
    if(!err){
      console.log('s a modificat parola');
      res.send(true);          
    }
    if(err){
      console.log(err);
    }
  })
})





app.get("/home/:start/:end",function(req,res){

  let start = req.params.start;
  let end = req.params.end;
  start = start.slice(1);
  end = end.slice(1);
  console.log(start,end,'haimanao');
  connection.query(`select * from items limit ${start} , ${end}`,function(err,rows,fields){
    if(!err){
      
      console.log('########',rows);
      res.json({data : rows});
    }
    if(err){
      console.log(err);
    }
  })
})


app.get("/itemDetails/:id",function(req,res){
let id = req.params.id;

  connection.query(`select * from items where id_item = ${id}`,function(err,rows,fields){
    if (!err){
      res.json({data:rows});
    }
    if (err){
      console.log(err);
    }
  })
})


app.post("/itemDetails/:id",function(req,res){
  let id = req.params.id;

  connection.query(`update items set numar=numar-1 where id_item = ${id}`,function(err,rows,fields){
    if (!err){
      console.log("s a cumpart Produsul");
    }
    if (err){
      console.log(err);
    }
  })
})

app.get("/search=:nume",function(req,res){
  let numeProdus = req.params.nume;
  console.log(numeProdus);
  connection.query(`select * from items where nume LIKE "${numeProdus}%"`,function(err,rows,fields){
    if (err){
      console.log(err)
    }
    else {
      console.log(rows,'hai ca am trimis produsul asta');
      res.json({data:rows})
    }
  })

})

app.post("/buyItems",function(req,res){
  // let id = req.params.id;
  let buyArray = Object.keys(req.body);
  buyArray = buyArray[0].split(',');
  console.log(buyArray)

  for (i=0;i<buyArray.length;i++)
    {
    connection.query(`update items set numar=numar-1 where nume = ${buyArray[i]}`,function(err,rows,fields){
    if (!err){
      console.log("s a cumpart Produsul");
    }
    if (err){
      console.log(err);
    }
    })
  }
})



app.get("/home/autoMoto",function(req,res){


  //   connection.query('select * from items',function(err,rows,fields){
  //   if(!err){
      
  //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
  //     res.json({data : rows});
  //   }
  //   if(err){
  //     console.log(err);
  //   }
  // })
  connection.query(`select * from itemsoferte`,function (err,rows,fields){
    if (!err){
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",rows);
      res.json({itemsoferte:rows})
     
    }
    if (err){
      console.log(err);
    }

    
  })
})

// });
// app.get("/",function(req,res){
// connection.query('SELECT * from categorysubtype LIMIT 2', function(err, rows, fields) {
// connection.end();
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
//   });
// });








// ROUTES pt insiruire de metode get post put pt a nu reutiliza codul / redundanta !!!


// app.route('/login').get((req,res) => {
// 	res.send({cats:"mata"})
// })

// app.route('/login/:loginName').get((req,res) => {
// 	const cacat = req.params['loginName'];
// 	res.send({cacat:cacat})
// });