const express = require('express');
const app = express();
const multer  = require('multer')
const cors = require('cors')();
const port = process.env.PORT || 8000;;

app.use(cors);

const storage = multer.diskStorage({
  destination: __dirname +'/src/images/',
  filename(req, file, cb) {
   console.log(file);
   cb(null, `${file.originalname}-${new Date()}`);
  }
});

const upload = multer({ storage });

app.post('/api/Recipe',upload.single('file'), function(req, res) {
  console.log(req.body.data);
  console.log(req.files);
});

app.listen(port,()=> console.log('Running on port: ' + port));