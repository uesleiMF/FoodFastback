const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),  
  }); 

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    const doesUserExist = user !== null  
    
    if (doesUserExist) {   
      const hashedPassword = CryptoJS.AES.decrypt(  
        user.password,
        process.env.PASS_SEC
      ) 
    
      const password = hashedPassword.toString(CryptoJS.enc.Utf8) 
      const isValidPassword = password === req.body.password 
      
      if (isValidPassword) {  
        const accessToken = jwt.sign(  
          {
            id: user._id,
            isAdmin: user.isAdmin,
          }, 
          process.env.JWT_SEC,
          {expiresIn:"3d"}
        )

        const { password, ...others } = user._doc;  
        return res.status(200).json({...others, accessToken});
      }
    }
    res.status(401).send("Usuário não autorizado")
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

router.put("/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(); 
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, 
      },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router