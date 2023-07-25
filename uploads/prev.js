const express = require('express');
const multer = require('multer');
const cors  =require('cors')
const app = express();
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tty2'
})

app.use(cors())

// Set up the destination and filename for the uploaded images
const storage = multer.diskStorage({
  destination: './uploads/', // specify the folder where images will be stored
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Create the multer middleware
const upload = multer({ storage: storage });

// Use the middleware to handle the file upload for a specific route
// app.post('/upload', upload.single('userImage'), (req, res) => {
//   // Handle the uploaded image here if needed
//   const { userName} = req.body
//   const {filename, originalname} = req.file
//   const sql  = `INSERT INTO user (username, imagename, filename) VALUES ( ?, ?, ?)`
  
//   connection.query(
//     sql, 
//     [userName, originalname, filename], 
//     (error, result) => {
//         res.send(result)
//   })

  
  
// });

app.get('/uploads/:filename', (req, res) => {
    const fileName = req.params.filename;
    res.sendFile(fileName, { root: './uploads/' });
  });

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});