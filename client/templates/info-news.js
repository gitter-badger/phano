Template.infonewsTemplate.onCreated(function() {
  $('#loadingScreen').addClass("active");
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
Template.infonewsTemplate.onRendered = function() {
  $('#loadingScreen').removeClass("active");
};
