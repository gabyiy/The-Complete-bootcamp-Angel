const mongoose= require("mongoose");

// dupa ce facem un requeire la pac facem conexiunea cu baza de date si portu unde putem acesa baza de date,iar la final specificam baza de date cu care dorim sa facem legatura daca acesta nu exista o creaza automat

// dupa in consolla trebuie sa initiem serveru cu node app.js

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true});

// si acum insertam date creed o nou schema si specificand structura ex nume prenume etc,iar poi folisim constanta asta cu schema predefinita

const fruitSchema =  new mongoose.Schema({
name: String,
rating: Number,
review: String
});

//iar acum creem un model ,care primeste 2 parametri(primul o sa fie numele colectiei (deobicei este la singular si este in paranteze)),asta practic o sa fie un table din baza de date.Al doilea parametru este structura predefinita adica aici este furitSchema

const Fruit = mongoose.model("Fruit",fruitSchema);

//iar acum creem un document dupa modelu Fruit

const fruit =   new Fruit({
    name : "Apple",
    rating: 7,
    review: "Pretty solid as a fruit"
})

//iar acum salvam fructu in baza noastra de date fruitsDB (trebuie sa terminam node app.js si sa initiem dinou sa faca un refresh)

// fruit.save();

const personSchema= new mongoose.Schema({
    name: String,
    age: Number
})

const Person = mongoose.model("Person",personSchema)

const person= new Person({
    name:"Mihai",
    age : 30
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
Fruit.insertMany([kiwi,orange,banana],function(err){
    if(err){
    console.log(err)
    }else{
        console.log("sa u salvat cu sucess toate fructele la fruitsDB")
    }
})