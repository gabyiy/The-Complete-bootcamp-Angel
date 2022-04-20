const mongoose= require("mongoose");

// dupa ce facem un requeire la pac facem conexiunea cu baza de date si portu unde putem acesa baza de date,iar la final specificam baza de date cu care dorim sa facem legatura daca acesta nu exista o creaza automat

// dupa in consolla trebuie sa initiem serveru cu node app.js

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true});

// si acum insertam date creed o nou schema si specificand structura ex nume prenume etc,iar poi folisim constanta asta cu schema predefinita

const fruitSchema =  new mongoose.Schema({
name: {
    //asa validam un tipe string
    type:String,
    required: [true,"Adauga un nume la fructe"]
},
rating: Number,
review: String
});

//iar acum creem un model ,care primeste 2 parametri(primul o sa fie numele colectiei (deobicei este la singular si este in paranteze)),asta practic o sa fie un table din baza de date.Al doilea parametru este structura predefinita adica aici este furitSchema

const Fruit = mongoose.model("Fruit",fruitSchema);

//iar acum creem un document dupa modelu Fruit

const fruit =   new Fruit({
    name : "Madarine",
    rating: 5,
    review: "Pretty solid as a fruit"
})

//iar acum salvam fructu in baza noastra de date fruitsDB (trebuie sa terminam node app.js si sa initiem dinou sa faca un refresh)

// fruit.save();

const personSchema= new mongoose.Schema({
    name: String,
    //asa specificam ca trebuie sa avem o varsta de cel putin 5 si max 100 daca este sub 5 o sa ne arate mesaju 
    age: {
        type: Number,
        min: [5,"Number is to low"],
        max:100
    },

    // aici facem un embading (relationam fruit cu Person),trebuie adaugat aici in schema
    favoritFruit: fruitSchema
})

const Person = mongoose.model("Person",personSchema)

// iar acum putem crea aici un nou fruct pentru ca il avem embeded in schema

const strawbery=new Fruit({
    name:"strawbery",
    rating:9,
    review:"Good"
})
 strawbery.save()

//  aici ia m adaugat la o persona deja existenta o  relatie cu fructa strawbery

Person.updateOne({_id: "622a65e5e5766e6b6780b7b0"},{favoritFruit:strawbery},function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Ai adaugat corect realtia  cu fructa");
    }
})

const person= new Person({
    name:"Mihai",
    age : 30,
    // iar aici ii adaugam la persona asta realtia cu pinaple
    favoritFruit: pinaple
})

// person.save()

// pentru a adauga mai multe colecti sau tabeluri vom face urmatoarele

const kiwi= new Fruit({
    name: "kiwi",
    rating: 10,
    review: "The best fruit"
})

const orange = new Fruit({
    name: "orange",
    rating:8,
    review: "Not bad"
})
const banana = new Fruit({
    name: "banana",
    rating:5,
    review: "bleah"
})

//asa adaugam mail multe fructe de odata vezi documentatia in api la model
//primu par1ametru este ce vrem sa adaugam(Acestea trebuie sa aibe aceasi shema cu cea a Fruit),al doilea parametru este un callback care ne ajuta sa facem on log  in caz ca am avea vro eroare

//               -------------------------------------             ///
//aic am comentat ca nu numai adaugam alte fructe cand reinitializam node app.js


// Fruit.insertMany([kiwi,orange,banana],function(err){
//     if(err){
//     console.log(err)
//     }else{
//         console.log("sa u salvat cu sucess toate fructele la fruitsDB")
//     }
// })



//pentru a citit ce avem in baza de date facem urmatoarele

//facem un callback la tabla sau mai bine zis la colectie fructe,aceasta are 2 prametri, primu finnd err iar al doilea  si al doilea ce vrem sa primim inapoi (aici vrem toate fructele)
//daca avem erroare sa ne arate eroarea atfle sa ne arate fructele
Fruit.find(function(err,fruits){
    if(err){
        console.log(err)
    }else{

        //aici am ichis conexiunea cu baza de date  pentru a  numai utiliza resurse
        //dupa ce am luat datele necesare sau am facut treaba necesara o sa  iasa automat din node app.js
      
      fruits.map(fruit=>
          console.log(fruit.name))
}

//asa ii adaugm un nume la fructu relationat cu id respectiv(idurile se creaza autmoat)
Fruit.updateOne({_id:"622c4da5f77cdd96172bfa0d"},{name: "peach"},function(err){
    if(err){
        console.log(err)
    }else{
        console.log("added name to the fruit")
    }
})

Person.updateOne()

//iar acum facem un delete la o fructa selectionand doar id

Fruit.deleteOne({name:"622c4da5f77cdd96172bfa0d"},function(err){
    if(err){
        console.log(err)
    }else{
        console.log("delete sucesufuly")
    }
})

//iar acum vom utiliza un delete many pentru a sterge mai multe fructe cu acelasi nume

Fruit.deleteMany({name:"banana"},function(err){
    if(err){
        console.log(err)
    }else{
        console.log("ai stres toate banalele")
    }
})

})