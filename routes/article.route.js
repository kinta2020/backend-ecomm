var express = require('express');
var router = express.Router();
// Créer une instance de categorie.
const article = require('../models/article');


router.get('/',async(req,res)=>{
    try {
        const art = await article.find({}, null, {sort: {'_id': -1}}).populate("scategorieID")
        
        res.status(200).json(art);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }

})

router.post('/', async (req, res) => {
    // const { nomcategorie, imagecategorie} = req.body;
     
     
     
     const art1 = new article(req.body)
     try {
     await art1.save();
     res.status(200).json(art1 );
     } catch (error) {
     res.status(404).json({ message: error.message });
     }

})


router.get('/:articleID',async(req,res)=>{
    try {
    const art = await article.findById(req.params.articleID);
    res.status(200).json(art);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
})


router.delete('/:articleID',async(req,res)=>{

    const id = req.params.articleID;
    await article.findByIdAndDelete(id);
    res.json({ message: "categorie deleted successfully." });

})

router.put('/:articleID',async(req,res)=>{

    try {
        const art = await article.findByIdAndUpdate(
        req.params.articleID,
        { $set: req.body },
        { new: true }
        );
        res.status(200).json(art);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
})


// chercher un article par s/cat
router.get('/scat/:scategorieID',async(req, res)=>{
    try {
    const art = await article.find({ scategorieID:
    req.params.scategorieID}).exec();
    res.status(200).json(art);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });



    // afficher la liste des articles par page
    router.get('/art/pagination', async(req, res) => {
        const page = req.query.page ||1 // Current page
        const limit = req.query.limit ||5; // Number of items per page
        // Calculez le nombre d'éléments à sauter (offset)
        const offset = (page - 1) * limit;
        try {
        // Effectuez la requête à votre source de données en utilisant les paramètres de pagination
        
        const articlesTot = await article.countDocuments();
        const articles = await article.find( {}, null, {sort: {'_id': -1}})
        .skip(offset)
        .limit(limit)
        res.status(200).json({articles:articles,tot:articlesTot});
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });

module.exports=router