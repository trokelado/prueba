import Ember from 'ember';

export default Ember.Component.extend({
  formats: Ember.String.w('Acta Acuerdo Bitácora Carta Contrato Dictamen Email Estatuto Estudio Factura Ficha_Técnica Formato Fotografía Informe Ley Manifiesto Nota Norma Oficio Orden_de_compra Orden_de_servicio Plan Portal Presentación Propuesta Reclamación Reglamento Reporte Requisición Resolutivo Solicitud Vídeo'),
  addNewDoc: false,

  actions: {

    docFormShow() {
      this.set('addNewDoc', true);
    },
    chooseFormat(format) {     
      this.set('selectedFormat', format);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    saveDoc() {
      var date = new Date();
      //lo encontre en http://jsfiddle.net/simo/sapuhzmm/
      function toJSONLocal (date) {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
      }            
      var dateIn = toJSONLocal(date);
      var params = {
        name: this.get('name'),
        isActive: this.get('isActive'),
        path: this.get('path'),
        dateIn: dateIn,
        format: this.get('selectedFormat'),       
        point: this.get('point')
      };
      this.set('addNewDoc', false);
      this.sendAction('saveDoc', params);
   }
  }
});

