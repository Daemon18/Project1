const express=require('express')
const router= express.Router();
const Brand=require('../models/brand-Schema')

router.post("/", async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body); 
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/",async(req,res)=>{
  try {
    const brands=await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.put("/:id", async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: "Brand deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;