var express = require('express');
var router = express.Router();
// Créer une instance de categorie.
const Scategorie = require('../models/scategorie');

router.get('/',async(req,res)=>{
    try {
        const scat = await Scategorie.find({}, null, {sort: {'_id': -1}})
        
        res.status(200).json(scat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }

})


    router.post('/', async (req, res) => {
        // const { nomcategorie, imagecategorie} = req.body;
         
         
         
         const newScategorie = new Scategorie(req.body)
         try {
         await newScategorie.save();
         res.status(200).json(newScategorie );
         } catch (error) {
         res.status(404).json({ message: error.message });
         }
    
})

router.put('/:scategorieID',async(req,res)=>{

    try {
        const Scat1 = await Scategorie.findByIdAndUpdate(
        req.params.scategorieID,
        { $set: req.body },
        { new: true }
        );
        res.status(200).json(Scat1);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
})


router.get('/:scategorieID',async(req,res)=>{
        try {
        const Scat = await Scategorie.findById(req.params.scategorieID);
        res.status(200).json(Scat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
})


router.delete('/:scategorieID',async(req,res)=>{

        const id = req.params.scategorieID;
        await Scategorie.findByIdAndDelete(id);
        res.json({ message: "categorie deleted successfully." });
    
})

module.exports=router