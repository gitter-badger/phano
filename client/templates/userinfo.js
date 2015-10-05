Meteor.subscribe("users");
Meteor.subscribe("giftinfo");
Template.userinfoTemplate.helpers({
  showUserInfo: function() {
    $('#loadingScreen').addClass("active");
    var CurrentUser = Meteor.user();
    $('#loadingScreen').removeClass("active");
    return CurrentUser.profile;
  }
});
Template.userinfoTemplate.onRendered = function() {
  $('#loadingScreen').removeClass("active");
};

Template.giftInfoTemplate.helpers({
  showGiftInfo: function() {
    var result = GiftInfo.find({});
    return result;
  }
});
Template.giftInfoTemplate.onRendered = function() {
  $('#loadingScreen').removeClass("active");
};
