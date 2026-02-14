require('dotenv').config();
const express = require('express');
const path = require('path')
const httpStatusText = require('./utils/httpStatusText');
const cors = require('cors')
const app = express();
app.use(express.json());
//imgs?
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("Md connected successfully!");
})

//CRUD :
const coursesRouter = require('./routes/coursesRoute');
const usersRouter = require('./routes/users.route')
app.use(cors());

app.use('/api/courses', coursesRouter)//api courses
app.use('/api/users', usersRouter)// api users
// global meddlware for not found routes
app.use((req,res) => {
  res.status(404).json({
    status: httpStatusText.FAIL,
    
      message: "This Resource Is Not Available!"
    
  });
})
// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,  
    data: null
  });
});


app.listen(process.env.PORT, () => {
  console.log('Listining on port: 5000');
 
})