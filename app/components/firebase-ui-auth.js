/* globals firebaseui */ 
import Ember from 'ember'; 
import firebase from 'firebase';

const { computed, inject: { service } } = Ember;

export default Ember.Component.extend({
    firebaseApp: service(),

    didInsertElement() { 
        this._super(...arguments); 
        this._initializeAuthUI(); 
    },

    signInSuccess() {},
/*
    uiConfig: {
      //'signInFlow': 'popup',
      'signInSuccessUrl': '/about',      
      'callbacks': {
        'signInSuccess': function(currentUser, credential, redirectUrl) {
          console.log('toy en el callback run: ');
          console.log("Signed in as "+ currentUser.uid + " with credential " + credential.accessToken);          
          return true;
        }.bind(this),
        uiShown: function() {
          alert("doing login stuff.");
        }
      },
      'signInOptions': [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
    },
*/

    uiConfig: computed('signInSuccess', function () { 
        return {            
            signInOptions: [ 
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                //firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID                                 
            ], 
            callbacks: { 
                signInSuccess: this.get('signInSuccess'),              
            }, 
        }; 
    }),
    
    elementId: 'firebaseui-auth-container', 
 
    _initializeAuthUI() {
        // Initialize the FirebaseUI Widget using Firebase. 
        const auth = this.get('firebaseApp').auth(); 
        const ui = new firebaseui.auth.AuthUI(auth);
        // The start method will wait until the DOM is loaded.         
        ui.start('#firebaseui-auth-container', this.get('uiConfig')); 
        this.set('ui', ui);                 
    }, 
});