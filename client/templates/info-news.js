Template.infonewsTemplate.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('giftinfo');
  });
});
Template.infonewsTemplate.helpers({
  showInfo: function() {
    return GiftInfo.find({});
  },
  currentPoint: function() {
    return Meteor.user().profile.Point;
  }
});
Template.infonewsTemplate.events({
  "click .btnProductName": function(event, template) {
    alert("btnclicked");
  }
});
