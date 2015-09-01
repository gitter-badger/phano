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
