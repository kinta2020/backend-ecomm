const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const categorieRouter=require("./routes/categorie.route")
const ScategorieRouter=require("./routes/scategorie.route")
const articleRouter=require("./routes/article.route")


const app=express()
app.use(express.json())
dotenv.config()
app.get("/",(req,res)=>
{
    res.send("bonjour")
})




mongoose.connect(process.env.DATABASECLOUD)
.then(() => {console.log("DataBase Successfully Connected");})
.catch(err => { console.log("Unable to connect to database", err);
process.exit(); });
app.use("/api/categories",categorieRouter);
app.use("/api/scategories",ScategorieRouter);
app.use("/api/article",articleRouter);


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`); });

    module.exports=app;
