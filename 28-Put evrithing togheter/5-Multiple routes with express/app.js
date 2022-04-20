//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require("mongoose");
const req = require("express/lib/request");

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

// aici vom face o noua scema pentru paginiile create automat

const listSchema = new mongoose.Schema({
  name:String,
  // in schema asta asociem itemsSchema creata mai sus fiind un array
  items:[itemsSchema]

})
//creem collectia 
const List = mongoose.model("List",listSchema)





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


app.get("/:customListName",function(req,res){

  //aici am salvatg nuele pagini care am acesat pentru a o folosi in if 

  const customListName= req.params.customListName
 
     
  //aici accesam cu ajutoru la find specificam ca dorim sa ne gaseascca in list un name = requestedTitle  pe care o sa il salveze in foundList ,
  //si specificam daca avem nu avem o eroare sa vada daca avem sau nu acel faound list
  List.findOne({name:customListName},function(err,foundList){
    if(!err){
    if (foundList){
      //o sa aratam o lista existenta si la  lista daugam ce am creat noi aici si avem in foundList
      res.render("list",{listTitle:foundList.name, newListItems:foundList.items })
    }else{
      //o sa creem o noua lista
       // si aici o sa adaugam la lista elemente
      const list = new List({
        //numele o sa fie ce scrie utilizatoru in ruta
       name:customListName,
      //  iar ca items vom folosi ce avem la default items
        items: defaultItems
      })
      list.save()
      // iar dupe ce salvam redirectionam catre ruta creata customListName
      res.redirect("/" + customListName)
    }
}
})
})




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


app.post("/delete",function(req,res){
  //dupa ce salvam idul  pe care la m  am primit de la checkbox  ,stergem acel elemnt
  const checkedItemId=req.body.checkbox
Item.findByIdAndRemove(checkedItemId,function (err) {
  if (err) {
    console.log(err);
  }else{
    console.log("item sters");
    res.redirect("/")
  }
})
}
)







app.get("/about", function(req, res){
  res.render("about");
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
