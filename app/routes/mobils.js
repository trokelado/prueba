import Ember from 'ember';

export default Ember.Route.extend({

  controllerName: 'mobils',
  model(params) {
    return this.store.findRecord('mobil', params.mobil_id);
    /*return Ember.RSVP.hash({
        features: this.store.findAll('feature'), 
        mobil: this.store.findRecord('mobil', params.mobil_id)        
    });
    */
  },  

  setupController: function(controller,model) {      
      // Call _super for default behavior 
      this._super(controller, model);
      // Implement your custom setup after                                              
      controller.set('model', model);   //esta pasa el modelo al controlador pero parece inecesario
      // or first item only
      //controller.set('model', model.get('firstObject'));      
  }, 
      
    actions: {

     savePoint(params) {
      //alert("entre al savePoint de mobils.js");
      var newPoint = this.store.createRecord('point', params);
      var mobil = params.mobil;
      mobil.get('points').addObject(newPoint);            
      newPoint.save().then(function() {
        return mobil.save();
      });
      this.transitionTo('mobils', mobil.id);
    },
    /*
        invoice.save().then(function(invoice){
            self.set('content.invoiceId', parseInt(invoice.id, 10));
            invoice.get('lineItems').then(function(lineItems){
                self.get('content').save().then(self.didSave.bind(self), self.paymentDidNotSave.bind(self));
            });
        }, function(error) {      
            lineItem.deleteRecord();
            invoice.deleteRecord();
        });
    */
    /*
App.EditRoute = Em.Route.extend
   setupController: (controller, model) ->
       this.set 'transaction', this.get('store').transaction()
       this.get('transaction').add model
   deactivate: ->
       # if the transaction has already been committed or rolled back, this
       # will have no effect
       this.get('transaction').rollback()
   events: 
       save: ->
           # I prefer to keep the user on the edit view until the
           # commit is complete, so that if an error occurs I can display
           # it in the edit form
           this.get('currentModel').on 'didUpdate', this, -> this.send('exit')
           this.get('transaction').commit()
      cancel: ->
           # because rolling back is synchronous, trigger `exit` immediately
           this.get('transaction').rollback()
           this.send('exit')
      exit: ->
           this.transitionTo 'list'

    */
    savePolygon(params) {
      //alert("entre al savePolygon de mobils.js");
      var newPolygon = this.store.createRecord('polygon', params);
      var mobil = params.mobil;
      mobil.get('polygons').addObject(newPolygon);
      newPolygon.save().then(function() {
        return mobil.save();
      });
      this.transitionTo('mobils', mobil.id);
    },
    saveLine(params) {
      //alert("entre al saveLine de mobils.js");
      var newLine = this.store.createRecord('line', params);
      var mobil = params.mobil;
      mobil.get('lines').addObject(newLine);
      newLine.save().then(function() {
        return mobil.save();
      });
      this.transitionTo('mobils', mobil.id);
    },
    saveEllipse(params) {
      //alert("entre al saveEllipse de mobils.js");
      var newEllipse = this.store.createRecord('ellipse', params);
      var mobil = params.mobil;
      mobil.get('ellipses').addObject(newEllipse);
      newEllipse.save().then(function() {
        return mobil.save();
      });
      this.transitionTo('mobils', mobil.id);
    },
    saveCube(params) {
      //alert("entre al saveCube de mobils.js");
      var newCube = this.store.createRecord('rectangle', params);
      var mobil = params.mobil;
      mobil.get('rectangles').addObject(newCube);
      newCube.save().then(function() {
        return mobil.save();
      });
      this.transitionTo('mobils', mobil.id);
    },
    updatePoint(point, params) {                  
      //alert("entre al updatePoint de projects.js");
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          point.set(key,params[key]);
        }
      });
      point.save();
      this.transitionTo('mobils', params.mobil.feature.feature_id);            
    },
    updatePolygon(polygon, params) {                  
      //alert("entre al updatePolygon de mobils.js");
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          polygon.set(key,params[key]);
        }
      });
      polygon.save();
      this.transitionTo('mobils', params.mobil.feature.feature_id);            
    },
    updateLine(line, params) {                  
      //alert("entre al updateLine de mobils.js");
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          line.set(key,params[key]);
        }
      });
      line.save();
      this.transitionTo('mobils', params.mobil.feature.feature_id);            
    },
    updateEllipse(ellipse, params) {                  
      //alert("entre al updateEllipse de mobils.js");
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          ellipse.set(key,params[key]);
        }
      });
      ellipse.save();
      this.transitionTo('mobils', params.mobil.feature.feature_id);            
    },
    updateCube(rectangle, params) {                  
      //alert("entre al updateEllipse de mobils.js");
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          rectangle.set(key,params[key]);
        }
      });
      rectangle.save();
      this.transitionTo('mobils', params.mobil.feature.feature_id);            
    },
    destroyPoint(point) {
    //alert("entre al destroyPoint de mobils.js");
      var doc_deletions = point.get('docs').map(function(doc) {
        return doc.destroyRecord();
      });
      Ember.RSVP.all(doc_deletions).then(function() {
        return point.destroyRecord();
      });
      this.transitionTo('mobils', point.mobil.feature.feature_id);
    },
    destroyPolygon(polygon) {
    //alert("entre al destroyPolygon de mobils.js");
      polygon.destroyRecord();
      this.transitionTo('mobils', polygon.mobil.feature.feature_id);
    },
    destroyLine(line) {
    //alert("entre al destroyLine de mobils.js");
      line.destroyRecord();
      this.transitionTo('mobils', line.mobil.feature.feature_id);
    },
    destroyEllipse(ellipse) {
    //alert("entre al destroyEllipse de mobils.js");
      ellipse.destroyRecord();
      this.transitionTo('mobils', ellipse.mobil.feature.feature_id);
    },
    destroyCube(rectangle) {
    //alert("entre al destroyEllipse de mobils.js");
      rectangle.destroyRecord();
      this.transitionTo('mobils', rectangle.mobil.feature.feature_id);
    },    
    saveDoc(params) {
      //alert("entre al saveDoc de projects.js");
      var newDoc = this.store.createRecord('doc', params);
      var point = params.point;      
      point.get('docs').addObject(newDoc);
      newDoc.save().then(function() {
        return point.save();
      });
      this.transitionTo('points', point);
    },
    updateDoc(doc, params) {            
      //update doc
      //alert("entre al updateDoc de projects.js");
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          doc.set(key,params[key]);
        }
      });
      doc.save();
      this.transitionTo('docs', doc);            
    },
    destroyDoc(doc) {
      //alert("entre al destroyDoc de projects.js");
      doc.destroyRecord();
      this.transitionTo('inproyectos');
    }     
  }
});
