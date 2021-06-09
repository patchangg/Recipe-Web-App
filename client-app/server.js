const express = require('express');
const app = express();
const multer  = require('multer')
const cors = require('cors')();
const port = process.env.PORT || 5001;;
//const bodyParser = require('body-parser');
//const path = require('path');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//    extended:true
// }));

app.use(cors);

const storage = multer.diskStorage({
  destination: __dirname +'/src/images/',
  filename(req, file, cb) {
   console.log(file);
   cb(null, `${file.originalname}-${new Date()}`);
  }
});

//const upload = multer({ storage });
const upload = multer({ storage: storage }).single('file')

// app.post('/api/Recipe',upload.single('file'), function(req, res) {
//   console.log(req.body.data);
//   console.log(req.files);
// });

app.post('/api/Recipe',function(req, res) {
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })
});

//app.listen(port,()=> console.log('Running on port: ' + port));
app.listen(5001, function() {
  console.log('App running on port 5001');
});