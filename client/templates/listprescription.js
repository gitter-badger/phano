var photoDetails = {};
var salesDetail = {};
var photos = Meteor.subscribe("photos");
Meteor.subscribe("salesinfo");
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
      return PrescriptionPhoto.find({status:"NEW"});
    }
  },
  'showSalesInfo': function() {
    return SalesInfo.find({Status:"NEW"});
  },
  isUser: function() {
    if(Meteor.userId()) {
      return true;
    }
    return false;
  },
  testPhoto: function() {
    var res = PrescriptionPhoto.find({status:"NEW"}).fetch();
    if(res.length == 0) {
      return false;
    }
    return true;
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
Template.SalesPrescription.helpers({
  salesDetail: function() {
    return salesDetail;
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
  'click [data-action="xemdon"]' : function() {
    salesDetail = SalesInfo.findOne({_id: this._id});
    SemanticModal.generalModal('SalesPrescription');
  },
  'click [data-action="ReFill"]': function() {
    var r = confirm("Bạn muốn refill?");
    if(r == true){
      Meteor.call("updateSalesInfo",this._id);
    }
  },
});
