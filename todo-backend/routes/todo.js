const express = require("express");
const router = express.Router();
const Todo = require("../schema/todo.js")

router.get("/get", async (req, res) => {
    try {
      const data = await Todo.find({})
      res.json({success:true,data})
    } catch (err) {
      res.json({ success: false, msg: "Something Went Wrong", err });
    }
  });

  router.post("/add", async (req, res) => {
    try {
        const add = new Todo({...req.body})
         await add.save(add)
      res.json({success:true,msg:"successfully saved"})
    } catch (err) {
      res.json({ success: false, msg: err?.message, err });
    }
  });


  router.put("/edit", async (req, res) => {
    try {
       const data  =  await Todo.findByIdAndUpdate(req.body._id,{...req.body},{new:true})
      res.json({success:true,msg:"successfully updated",data})
    } catch (err) {
      res.json({ success: false, msg: err?.message, err });
    }
  });

  router.delete("/remove", async (req, res) => {
    try {
        const data  =  await Todo.findByIdAndDelete(req.body._id)
       res.json({success:true,msg:"successfully deleted",data})
     } catch (err) {
       res.json({ success: false, msg: err?.message,  err});
     }
  });


  module.exports = router;