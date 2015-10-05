var photoDetails = {};
var salesDetails = {};
Meteor.subscribe("photos");
Meteor.subscribe("salesinfo");
Template.templateManagerpres.onRendered(function() {
  $('.menu .item').tab();
  $('.history.example .menu .item')
  .tab({
    context : '.history.example',
    history : true
  })
;
});
Template.templateManagerpres.helpers({
  'showOrder': function(){
      return PrescriptionPhoto.find({status:"ORDER"});
  },
  showSalesInfo: function() {
    return SalesInfo.find({status:"ORDER"});
  },
  convertToShowDate: function(thisDate) {
    function pad(s) {
      return (s < 10) ? '0' + s : s;
    }
    var d = new Date(thisDate);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
  },
  testPhoto: function() {
      var res = PrescriptionPhoto.find({status:"ORDER"}).fetch();
      if(res.length == 0) {
        return false;
      }
    return true;
  },
  testSale: function() {
      var res = SalesInfo.find({status:"ORDER"}).fetch();
      if(res.length == 0) {
        return false;
      }
    return true;
  },
  isUser: function() {
    if(Meteor.userId()) {
      return true;
    }
    return false;
  },
});

Template.templateManagerpres.events({
  'click [data-action="xem"]' : function() {
    photoDetails = PrescriptionPhoto.findOne({_id: this._id});
    SemanticModal.generalModal('photoOrderPrescription');
  },
  'click [data-action="xemdon"]' : function() {
    salesDetails = SalesInfo.findOne({_id: this._id});
    SemanticModal.generalModal('ShowsalesPrescription');
  },
});
Template.photoOrderPrescription.helpers({
  'photoDetails': function() {
    return photoDetails;
  },
});
Template.ShowsalesPrescription.helpers({
  salesDetails: function() {
    return salesDetails;
  }
});
