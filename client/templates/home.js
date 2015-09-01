
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
    $('#loadingScreen').addClass("active");
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
    Router.go("/prescription-list");
  },
  'click #logout': function() {
    console.log("log out click")
    Meteor.logout(function() {});
  }
});
Template.homeTemplate.onCreated = function() {
  $('#loadingScreen').removeClass("active");
};
