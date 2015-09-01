Template.prescriptionListTemplate.onRendered = function() {
  $('#loadingScreen').removeClass("active");
};
Template.prescriptionListTemplate.helpers({
  listPrescription: function() {
    return Prescription.find({});
  },
  GotoCreate: function() {
    if (Prescription.find({}).fetch().length < 1)
      Router.go("/prescription/0");
  },
  convertToShowDate: function(thisDate) {
    function pad(s) {
      return (s < 10) ? '0' + s : s;
    }
    var d = new Date(thisDate);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
  }
});
Template.prescriptionListTemplate.events({
  "click #RemovePrescription": function(event) {
    Meteor.call("RemovePrescription", this._id);
  },
  "click [data-action='updatePrescription']": function(event) {
    Router.go("/prescription/" + this._id);
  }
});
