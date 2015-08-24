Template.userinfoTemplate.helpers({
  showUserInfo: function() {
    var CurrentUser = Meteor.user();
    console.log(CurrentUser.profile);
    return CurrentUser.profile;
  }
});
