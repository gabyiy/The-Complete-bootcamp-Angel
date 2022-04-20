//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require("mongoose")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListDB")


const itemsSchema = new mongoose.Schema({
  name:{
     type: String,
     required:[true,"Trebuie sa aibe un nume"]
  }
})

const Item = mongoose.model("Item" ,itemsSchema)

const item1= new Item({
  name:"Welcome to your todolist"
})

const item2 = new Item({
  name: "Hit this button to add new item"
})

const item3= new Item({
  name:"Hit this button to delete item"
})

const defaultItems= [item1,item2,item3]



app.get("/", function(req, res) {


// aici casim tot ce avem in colectia item si  il putem utiliza.Am bgat aces find in routa pentru ca atunci cand se initiaza ruta se initiaza si findu
Item.find({},function(err,foundItems){


// aici specificam daca array defaultItems = 0 atunci sa ne adauge in colectia item arayul defaultitems altfel sa ne zica ca este deja adaugat
  if(foundItems.length===0){
    Item.insertMany(defaultItems,function(err){
      if(err){
        console.log(err)
        }else{
          console.log("Succesefuly saved items to db")
        }
      })
      //iar aci spunem ca odata ce a adaugat itemele sa redirectioneze catre home
      res.redirect("/")
      }else{
        res.render("list", {listTitle: "Today", newListItems: foundItems});
      }
    })

});

app.post("/", function(req, res){

  // aici luam datetele ce le avem de la form le salvam si dupa le adaugam la colectia Item
  const itemName=req.body.newItem
 const item =new Item({
   name: itemName
 })
item.save()
//ca sa ne apara in lista trebuie sa redirectionam catre home route
  res.redirect("/")
});



app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List",newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
