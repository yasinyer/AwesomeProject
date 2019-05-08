// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAyDevrg7nD7j20nc03Ly9Mi4PgdRo098Y",
    authDomain: "foodwaste-5c5d2.firebaseapp.com",
    databaseURL: "https://foodwaste-5c5d2.firebaseio.com",
    projectId: "foodwaste-5c5d2",
    storageBucket: "foodwaste-5c5d2.appspot.com",
    messagingSenderId: "541027310814"
  };
  firebase.initializeApp(config);


  var db = firebase.firestore();

  function uploadData(){
  	var naam= document.getElementById("productnaam").value;
  	var striktheid= document.getElementById("striktheid").value;
  	var datum= document.getElementById("datum").value;
  	var categorie= document.getElementById("categorie").value;
  	var opmerkingen= document.getElementById("opmerkingen").value;
 db.collection("voedingsproducten").doc(naam).set({ 
naam:naam,
striktheid:striktheid,
datum:datum,
categorie:categorie,
opmerkingen:opmerkingen

 })
document.getElementById("productnaam").value = "";
document.getElementById("striktheid").value="";
document.getElementById("datum").value="";
document.getElementById("categorie").value="";
document.getElementById("opmerkingen").value="";

  }

  function makeList(){







 	var voedingsproducten= db.collection("voedingsproducten");
 	voedingsproducten.orderBy('datum').get().then(snapshot => {
	snapshot.docs.forEach(doc=>{
	var naam= doc.data().naam;
	var datum=doc.data().datum;
	var row= document.createElement("div");
	row.className= "row ml-3 mr-3 rij";
	row.id=naam;
	row.setAttribute("onClick","clicked(this.id)");
	document.body.appendChild(row);


	var linkerkolom=document.createElement("div");
	linkerkolom.className="font-weight-bold text-white col-5  mr-1 mt-3";  
	row.appendChild(linkerkolom);
	var displaynaam=document.createElement("p");
	displaynaam.innerHTML=naam;
	linkerkolom.appendChild(displaynaam);


	var rechterkolom=document.createElement("div");
	rechterkolom.className="font-weight-light text-white font-italic col-5  ml-5 mt-3";
	row.appendChild(rechterkolom);
	var displaydatum=document.createElement("p");
	displaydatum.innerHTML=datum;
	rechterkolom.appendChild(displaydatum);

})

 	})

  }

 var clickedNaam;

function clicked(naam){
var naam; 
var striktheid; 
var datum; 
var categorie; 
var opmerkingen;


var product= db.collection("voedingsproducten").doc(naam);
product.get().then(function(doc){
	naam= naam;
	striktheid= doc.data().striktheid;
	datum= doc.data().datum;
	categorie= doc.data().categorie;
	opmerkingen= doc.data().opmerkingen;

clickedNaam = naam;

	navigator.notification.confirm(
    "naam: " + naam
    +"\n"+
    striktheid
    +"\n"+
    "datum: " + datum
    +"\n"+
    "voedingscategorie: " + categorie
    +"\n"+
    "opmerkingen: " + opmerkingen,						// message
    onConfirm,        									 // callback
    'Informatie',            							// title
    ['Verwijderen','Oke']   							  // buttonLabels          
);
});



}
function onConfirm(buttonIndex) {
    if(buttonIndex=="1"){
    	var product= db.collection("voedingsproducten").doc(clickedNaam).delete().then(function(){
    		var row=document.getElementById(clickedNaam);
    		row.parentNode.removeChild(row);
    		navigator.vibrate(500);

    	});

    }
}


//Local Storage hier:
function saveName(){
    var inputName = document.getElementById("getName").value;
var storage = window.localStorage;
storage.setItem('name',inputName);
setName();
 
}

function GetName(){
    var storage = window.localStorage;
   return storage.getItem('name');
 
   
    }
    function setName(){
        var title = document.getElementById("title");
        var naam = GetName();
        if (naam == null || naam == ""){
            title.innerHTML = "Eat This";
             
        }
        else {
            title.innerHTML ="EAT THIS " + naam;
 
    }}
    document.addEventListener("DOMContentLoaded",() => {
       
        setName();
       
    });