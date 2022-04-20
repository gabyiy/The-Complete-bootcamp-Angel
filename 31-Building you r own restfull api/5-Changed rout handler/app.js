const express =require("express")
const bodyParser= require("body-parser")
const mongoose =require("mongoose")
const ejs= require("ejs")

const app=express()



mongoose.connect("mongodb://localhost:27017/wikiDB")

app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine", "ejs")

app.use(express.static("public"))



const articleSchema= new mongoose.Schema({
    title:String,
    content:String
})

const Article = mongoose.model("Article", articleSchema)

//dupa app.route putem sa facem un chain la  articles get post si delete se punem un semicolon la ultimu chain ca sa specifricam ca sa terminat chainu

app.route("/articles")


.get((req,res)=>{

    Article.find({},(err,foundArticles)=>{
        if(err){
            res.send(err);
        }else{
            // asa le trimite la pagina articles
           res.send(foundArticles);
        }
    })
})


.post((req,res)=>{
    //iar aici accesam ce am avem la title si content din interioru  colectiei articles
   console.log( req.title)
 console.log(   req.body.content)

//  putem utilza postam pentru a crea un post  request la http://localhost:3000/articles  (in poostman intram la body selectionam url uncoded si la key adaugam title si content si la valoare scriem ce vrem sa salvam in baza de date atat la title cat si la content)
   
//dupa ce facem post requestu din postman o sa primim  in cosola ce am introdu la post in postman

//iar acum salvam in colectia articles tot ce primim  de la postman

const adArticle= new Article({
    title :  req.body.title,
    content: req.body.content
})

// si aici specificam ca daca avem err cand salvam noul articul sa ne trimita eroarea la postman altfel sa trimit un mesaj cu succes
adArticle.save((err)=>{
    if(err){
        res.send(err)
    }else{
        res.send("succes")
    }
})
})


.delete((req,res)=>{

    Article.deleteMany({},(err)=>{
        if(err){
           res.send(err);
        }else{
         res.send("ai sters tot din article");
        }
    })
});



// aici specificam ruta (adica colectia articles,dupa port 3000punem /articles si facem un get request practic la ruta respectiva), si dupa facem o catutare la tot ce avem in colectie


// app.get("/articles",(req,res)=>{

//     Article.find({},(err,foundArticles)=>{
//         if(err){
//             res.send(err);
//         }else{
//             // asa le trimite la pagina articles
//            res.send(foundArticles);
//         }
//     })

// })

// ca sa trimitem date la o anumita colectie trebuie sa utilizam ca ruta respectiva colectie
// app.post("/articles",(req,res)=>{
//     //iar aici accesam ce am avem la title si content din interioru  colectiei articles
//    console.log( req.title)
//  console.log(   req.body.content)

// //  putem utilza postam pentru a crea un post  request la http://localhost:3000/articles  (in poostman intram la body selectionam url uncoded si la key adaugam title si content si la valoare scriem ce vrem sa salvam in baza de date atat la title cat si la content)
   
// //dupa ce facem post requestu din postman o sa primim  in cosola ce am introdu la post in postman

// //iar acum salvam in colectia articles tot ce primim  de la postman

// const adArticle= new Article({
//     title :  req.body.title,
//     content: req.body.content
// })

// // si aici specificam ca daca avem err cand salvam noul articul sa ne trimita eroarea la postman altfel sa trimit un mesaj cu succes
// adArticle.save((err)=>{
//     if(err){
//         res.send(err)
//     }else{
//         res.send("succes")
//     }
// })
// })


//pentru a sterge folosim delete si ruta de unde vre msa stergem putem folosi postamn pentru a utiliza delete



// app.delete("/articles",(req,res)=>{

//     Article.deleteMany({},(err)=>{
//         if(err){
//            res.send(err);
//         }else{
//          res.send("ai sters tot din article");
//         }
//     })
// })


app.listen(3000,()=>{
    console.log("Server up on port 3000");
})