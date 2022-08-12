const router = require("express").Router();
const Contact = require("../models/Contact"); 

router.post("/", async (req, res) => {
    try {
      const newContact = new Contact({
        name: req.body.name,
        occupation: req.body.occupation,
        email: req.body.email,
        message: req.body.message,
      });
      const contact = await newContact.save();
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router
