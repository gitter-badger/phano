var photoDetails = {};
var photos = Meteor.subscribe("photos");
Template.listprescriptionTemplate.onRendered(function() {
  $('.menu .item').tab();
  $('.history.example .menu .item')
  .tab({
    context : '.history.example',
    history : true
  })
;
});
Template.listprescriptionTemplate.helpers({
  'showPhoto': function(){
    if(photos.ready()){
      return PrescriptionPhoto.find({status:"null"});
    }
  },
  isUser: function() {
    if(Meteor.userId()) {
      return true;
    }
    return false;
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
  convertToShowDate: function(thisDate) {
    function pad(s) {
      return (s < 10) ? '0' + s : s;
    }
    var d = new Date(thisDate);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
  },
});
Template.photoPrescription.helpers({
  photoDetails: function() {
    return photoDetails;
  }
});
Template.photoPrescription.events({
  'click [data-action="Order"]': function() {
    Meteor.call("updatePrescriptionPhoto",this._id);
  },
});
Template.listprescriptionTemplate.events({
  'click [data-action="xem"]' : function() {
    photoDetails = PrescriptionPhoto.findOne({_id: this._id});
    SemanticModal.generalModal('photoPrescription');
  },
  'click #photo': function() {
    Router.go("/scanprescription");
  },
});
