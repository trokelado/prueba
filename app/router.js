import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('map');
  this.route('service');
  this.route('mision');
  this.route('features', {path: '/features/:feature_id'});
  this.route('grupos', {path: '/grupos/:grupo_id'});
  this.route('gruposales', {path: '/gruposales/:gruposale_id'});
  this.route('inprojects');
  this.route('inproyectos');
  this.route('insales');
  this.route('mobils', {path: '/mobils/:mobil_id'});
  this.route('movilsales', {path: '/movilsales/:movilsale_id'});
  this.route('projects', {path: '/projects/:project_id'});
  this.route('proyectos', {path: '/proyectos/:proyecto_id'});
  this.route('pros', {path: '/pros/:pro_id'});
  this.route('proyectosales', {path: '/proyectosales/:proyectosale_id'});
  this.route('tracks', {path: '/tracks/:track_id'});
  this.route('shipments', {path: '/shipments/:shipment_id'});
  this.route('toys', {path: '/toys/:toy_id'});
  this.route('login');
  this.route('intoys');
  this.route('inrols');
  this.route('shipment');
  this.route('intracks');
  this.route('link');
  this.route('track');
  this.route('inpro');    
});

export default Router;
