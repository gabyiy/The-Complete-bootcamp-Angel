

// cand avem mai multe functi ce vrem sa le exportam din acelasi modul le putem acesa in felu urmator ca si cum ar fi un object
 

//  aici creem propriu modul care il vom importain app.js
 
 // aici exportam direct functia 

  exports.getDate  = function(){

 const today = new Date()

 // creem un obiect unde vom define tot ce vine in date sub forma de numere in cuvinte 
 // (ex 1 in ianuarie)
const options ={weekday: "long", year: "numeric", month: "long", day: "numeric"}

 
//   aici salvam today cu un format en cu ajutorul toLocaleDateString si apoi cu al doilea parametru ii facem formatu ca sa ne apara in forma de string
 return today.toLocaleDateString("en-US",options)

 }

//  aici exportam functia day
 exports.getDay =function (){
    const today = new Date()
   
    // creem un obiect unde vom define tot ce vine in date sub forma de numere in cuvinte 
    // (ex 1 in ianuarie)
   const options ={weekday: "long"}
   
    
   //   aici salvam today cu un format en cu ajutorul toLocaleDateString si apoi cu al doilea parametru ii facem formatu ca sa ne apara in forma de string
   return today.toLocaleDateString("en-US",options)
   
   
    }
   

// 