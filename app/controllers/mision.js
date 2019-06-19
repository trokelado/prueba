import Ember from 'ember';

export default Ember.Controller.extend({        
    
    image01: false,
    image02: false,
    image03: false,    
/*
optione: function() {


    let solucion = 'aqui voy';

//copia el contenido de una caja en otra
function copyContent(from, to) {	
  for(var i = 0; i < from.childNodes.length; i++) {      
    to.appendChild(from.childNodes[i]);        
  }
}
//crea una caja muestra
var referenceBox = document.createElement("div");
var link = document.createElement('a');
link.href = 'https://www.trokelado.weebly.com';
link.textContent = 'mi enlace';

referenceBox.appendChild(link);

var element = document.getElementById("div1");
//agrega copias al documento
for(var i = 0; i < 5; i++) {
    var newBox = document.createElement("div");
    copyContent(referenceBox, newBox);
    element.appendChild(newBox);
}
*/
/*
function miFuncion(input) {
	var element = document.createElement("div");
    var b = document.createElement("b");
    var node = document.createTextNode(input);
    //b.appendChild(node);
    b.appendChild(document.createTextNode(input));
    element.appendChild(b);
    return element;
}
var para = "Aqui voy we";
var nodo = miFuncion(para);
var element = document.getElementById("div1");
element.appendChild(nodo);
*/
/*
    var x = 1;
    function foo() {
        var x = 3;
    }
    foo();
    console.log(x);
    function bar() {
        x = 4;
    }
    bar();
    console.log(x);
*/
/*
    if(false == '')
        alert('son iguales !')
    else
        alert('No son iguales !')
        */
/*
    function a() {

    };
    var b = function() {

    }
    console.log(typeof a);
    console.log(typeof b);
    */
/*            
    var person = { firstName: 'Calixto', lastName:'González' }; 
    //var person = [];   
    //person.firstName = 'Calixto';
    //person.lastName = 'González';
    //person.showName = function () { return(this.firstName + ' ' + this.lastName); };    
    person.showName = function() { alert(this.firstName + ' ' + this.lastName); };
    solucion = person.showName();
*/    
/*
    function foo(a, b, c) { a++; b = 'new string'; c['key'] = 'new value' };
    var a = 1, b = 'old string', c = { 'key' : 'old value'};
    foo(a, b, c);
    solucion = a + ' ' + b + ' ' + c['key'];
    */
/*
    var person = function (firstName ,lastName, dateBirth, measurements) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateBirth = dateBirth;
        this.measurements = measurements
    };
    person = new person('Calixto', 'Nopalitos', new Date(1959, 1, 10), {weight : '90Kg'});
    var clone;
    clone = JSON.parse(JSON.stringify(person));
    alert('person.firstName = ' + person.firstName + ' clone.firstName = ' + clone.firstName );
    alert('person.lastName = ' + person.lastName + ' clone.lastName = ' + clone.lastName );
    alert('person.dateBirth = ' + person.dateBirth + ' clone.dateBirth = ' + clone.dateBirth );
    alert('person.measurements = ' + person.measurements['weight'] + ' clone.measurements = ' + clone.measurements['weight'] );
    */
/*
    return solucion;
  }.property('solucion')
  */
 /*   
    optione: function() {
    console.log('entre al optione !!');
    this.set('image01', false);
    this.set('image02', false);        
    this.set('image03', false);            
    var min = 1;
    var max = 3;
    var solucion = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(solucion);
    switch (solucion) {
    case 1:
        this.set('image01', true);
        break;
    case 2:
        this.set('image02', true);
        break;
    case 3:
        this.set('image03', true);
        break;        
    }
    return solucion;
  }.property('solucion')
*/
 /*  
    optione: Ember.computed(function() {
        console.log('entre al optione !!');       
        var options = this.get('model.baseimages.id');
        console.log('las opciones son: ' + options);
        var solucion = Math.floor(Math.random()*options.length);
        //$('#controls-wrapper').css("background.url", myArray[solucion]);
        //var solucion = myArray[Math.floor(Math.random() * myArray.length)].id;
        console.log(solucion);        
        if (solucion <= 5)
            imageOne = true;
        else
            imageTwo = true;
        return solucion;        
    }).property('solucion'),
 */ 
});
