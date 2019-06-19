import Ember from 'ember';

export default Ember.Component.extend({
addNewProject: false,

    actions: {
        projectFormShow() {
            this.set('addNewProject', true);
        },
        /*
        saveProject1() {
            var params = {
                name: this.get('name'),
                isActive: this.get('isActive'),
                minX: this.get('minX'),
                minY: this.get('minY'),
                maxX: this.get('maxX'),
                maxY: this.get('maxY'),
                spRef: this.get('spRef')            
            };
            this.set('addNewProject', false);
            this.sendAction('saveProject2', params);
        },
        */
        saveExtent(ext) {
            let geoExtent = this.get('geoExtent');
            console.log(geoExtent.xmin, geoExtent.ymin, geoExtent.xmax, geoExtent.ymax);             
            //console.log("mapExtent.spatialReference", geoExtent.spatialReference);
            var params = {
                name: this.get('name'),
                isActive: true,
                minX: geoExtent.xmin,
                minY: geoExtent.ymin,
                maxX: geoExtent.xmax,
                maxY: geoExtent.ymax,
                spRef: geoExtent.spatialReference            
            };
            this.set('addNewProject', false);
            this.sendAction('saveProject2', params);      
        },
    }
});
