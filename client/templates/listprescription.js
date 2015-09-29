Template.listprescriptionTemplate.onRendered(function() {
  $('.menu .item').tab();
});
Template.listprescriptionTemplate.helpers({
  'showPhoto': function(){
    var photos = Meteor.subscribe("photos");
    if(photos.ready()){
      return PrescriptionPhoto.find({});
    }
  },
});
Template.listprescriptionTemplate.events({
  'click [data-action="xem"]' : function() {
    SemanticModal.generalModal('photoPrescription');
  },
});
