'use strict'

import express from 'express'
import multer from 'multer';
import cors from 'cors'
const path = require('path');


const app = express();
//const upload = multer({ dest: "uploads/" });
//const multerStorage = multer.memoryStorage();
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/fullsize')
  },
  filename: (req, file, cb) => { 
    cb(null, Date.now() + path.extname(file.originalname))

  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({  
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
}).single("image");


// Include the express body parser
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async function (req, res) {
  await res.render('index');
});

app.post('/upload', async (req, res) => {

  upload(req, res, (err)=> {
    if(err instanceof multer.MulterError){
      return res.send(err) //multer error 
    }else if(err) {
      return res.send(err) //normal error 
    }
  }) ;
 
  return res.status(200).json({ name: req.filename }); 

});



const port = process.env.PORT || 3000
app.listen(port)