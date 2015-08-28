
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
