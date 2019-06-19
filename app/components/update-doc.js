import Ember from 'ember';

export default Ember.Component.extend({
  formats: Ember.String.w('Acta Acuerdo Bitácora Carta Contrato Dictamen Email Estatuto Estudio Factura Ficha_Técnica Formato Fotografía Informe Ley Manifiesto Nota Norma Oficio Orden_de_compra Orden_de_servicio Plan Portal Presentación Propuesta Reclamación Reglamento Reporte Requisición Resolutivo Solicitud Vídeo'),
  updateDocForm: false,
  docIsImage: true,
  
  actions: {
    updateDocForm() {
      this.set('updateDocForm', true);
    },
    chooseFormat(format) {     
      this.set('selectedFormat', format);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    updateDoc(doc) {
      //alert("entre a updateDoc de update-doc.js");
      var params = {
        //id: this.get('doc.id'),
        name: this.get('doc.name'),
        isActive: this.get('doc.isActive'),
        path: this.get('doc.path'),
        dateIn: this.get('doc.dateIn'),
        format: this.get('selectedFormat')
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateDocForm', false);
      this.sendAction('updateDoc', doc, params);
    },    
  }
});


