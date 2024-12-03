
require('dotenv').config();
const  mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/Rental')
// mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB')) 
.catch(err => console.error('Connection error', err));   



const express  = require('express');
const  cors = require("cors")  
const app = express(); 
app.use(cors({
    origin: ['https://crane.supermall.digital', 'http://localhost:5173' , 'http://localhost:3001' ],
    methods: 'GET,POST,PUT,DELETE ,PATCH', 
    allowedHeaders: 'Content-Type,Authorization'    
  }));
app.use(express.json())
app.use(express.static('public'));





 const authRoute = require('./src/routes/authroute');
 const companyRoute  = require('./src/routes/companyRoute');

app.use('/api' , authRoute);
app.use('/api/v1/company' , companyRoute);





app.get('/test' , (req ,res)=>{
  res.json({
    success: true, 
    message: "Hello world"
  })
})


const port = process.env.SERVER_PORT | 4000;
// console.log(process.env.SERVER_PORT);
app.listen(port , ()=>{ 
    console.log("server is runing on port : " + port);

});
