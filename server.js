if(process.env.NODE_ENV !== 'production') {
   require('dotenv').config()
 }
 
 const Conn = require('./src/conn/conn');

const express = require ('express');
const cookieParser = require ('cookie-parser');
const cors = require ('cors');
const path = require ('path');

const routes= require ('./src/routes');

var mongoose = require("mongoose");


const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(routes);


  
  
   const db_url = process.env.DB_URL;
   const db_user = process.env.DB_USER;
   const db_pass = process.env.DB_PASS;
   const db_data = process.env.DB_DATA;
   Conn(db_url, db_user, db_pass, db_data);
   
   // inicializar o servidor http em alguma porta para podermos acessar ele.
   const port = 3001;
   app.listen(process.env.PORT || port, () => {
     console.log(`O servidor esta rodando na porta ${port}`);
   })
   

 