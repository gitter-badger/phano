var photoDetails = {};
var photos = Meteor.subscribe("photos");
Template.tempalteManagerphoto.helpers({
  'showOrder': function(){
    if(photos.ready()){
      return PrescriptionPhoto.find({status:"ORDER"});
    }
  },
  convertToShowDate: function(thisDate) {
    function pad(s) {
      return (s < 10) ? '0' + s : s;
    }
    var d = new Date(thisDate);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
  },
  testPhoto: function() {
    if(photos.ready()){
      var res = PrescriptionPhoto.find({});
      if(res != null) {
        return true;
      }
    }
    return false;
  },
});

Template.tempalteManagerphoto.events({
  'click [data-action="xem"]' : function() {
    photoDetails = PrescriptionPhoto.findOne({_id: this._id});
    SemanticModal.generalModal('photoOrderPrescription');
  },

});
Template.photoOrderPrescription.helpers({
  'photoDetails': function() {
    return photoDetails;
  },
});
