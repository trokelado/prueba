import Ember from 'ember';
import firebase from 'firebase';

const { inject:  { service } } = Ember;

export default Ember.Controller.extend({
    session: service(),

    toys: Ember.computed(function() {
      return this.store.peekAll('toy');
    }),   

   actions: { 
     signInSuccess() {
        alert('Bienvenido a WebShore !');
        //alert('entre al signInSuccess action de login controller !');        
        let user = firebase.auth().currentUser;    
        if (user != null) {
          let name = user.displayName;
          //alert('Bienvenido usuario: ' + name);
          //let email = user.email;
          //alert('el email es: ' + email);
          //let photoUrl = user.photoURL;
          //alert('la imagen es: ' + photoUrl);
          //let emailVerified = user.emailVerified;
          let uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                          // this value to authenticate with your backend server, if
                          // you have one. Use User.getToken() instead.
          //alert('uid: ' + uid);                                       
          var selectedToys = this.get('toys').filterBy('uid', user.uid);        
          let participante = selectedToys.get('firstObject');          
          if(participante !== undefined) {                                     
            console.log('el participante ' + participante.get('name') + ' ya existe en la base de datos !');
            return            
          }
          
          console.log('voy a llenar los parametros del toy !');
          let params = {
            uid: user.uid,
            name: user.displayName,
            isActive: true,
            email: user.email,
            rol: 'Visitante'
          };
          console.log('voy a grabar el nuevo toy !');
          let newToy = this.store.createRecord('toy', params);     
          newToy.save();                    
        }
     }, 
   } 
}); 

