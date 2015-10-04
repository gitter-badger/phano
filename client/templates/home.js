
Template.homeTemplate.events({
  'click #calendar': function() {
    $('#loadingScreen').addClass("active");
    Router.go("/calendar");
  },
  'click #news': function() {
    $('#loadingScreen').addClass("active");
    Router.go("/news");
  },
  'click #user': function() {
    // $('#loadingScreen').addClass("active");
    Router.go("/userinfo");
  },
  'click #infonews': function() {
    $('#loadingScreen').addClass("active");
    Router.go("/infonews");
  },
  'click #pharmacy': function() {
    $('#loadingScreen').addClass("active");
    Router.go("/pharmacy");
  },
  'click #prescription': function() {
    $('#loadingScreen').addClass("active");
    Router.go("/prescription");
  },
  'click #logout': function() {
    console.log("log out click")
    Meteor.logout();
  },
  'click #photo': function() {
    $('#loadingScreen').addClass("active");
    Router.go("/scanprescription");
  },
  'click #list': function() {
    $('#loadingScreen').addClass("active");
    Router.go("/listprescription");
  }
});
Template.homeTemplate.onRendered(function(){
  // console.log("call update News");
  Meteor.call("updateNews");
  // console.log("call update GiftInfo");
  Meteor.call("updateGiftInfo");
  // console.log("call update SearchAllPhano");
  Meteor.call("ShowPhama");

  Meteor.call("updateGiftInfo");

});
Template.homeTemplate.onCreated = function() {
  $('#loadingScreen').removeClass("active");
};
