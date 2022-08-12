const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const contactRoute = require("./routes/contact");
const multer = require("multer"); 
const path = require("path"); 

const app = express();

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images"))); 

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,

})
  .then(console.log("Conectado ao MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({  
  destination: (req, file, cb) => {  
    cb(null, "images");
  },
  filename: (req, file, cb) => { 
    cb(null, req.body.name) 
  },
})

const upload = multer({ storage: storage }); 
app.post("/api/upload", upload.single("file"), (req, res) => { 
  res.status(200).json("O arquivo foi enviado");
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/contact", contactRoute);

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta especificada");
});