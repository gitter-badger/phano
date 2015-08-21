
Template.homeTemplate.events({
  'click #calendar': function() {
    $('#loadingScreen').addClass("active");
    Router.go("/calendar");
  },
  'click #news': function() {
    $('#loadingScreen').addClass("active");
    Router.go("/news");
  },
  'click #infonews': function() {
    $('#loadingScreen').addClass("active");
    Router.go("/infonews");
  },
  'click #pharmacy': function() {
    $('#loadingScreen').addClass("active");
    Router.go("/pharmacy");
  },
  'click #logout': function() {
    $('#loadingScreen').addClass("active");
    console.log("log out click")
    Meteor.logout(function() {});
    Router.go("/login");
  }
});
Template.homeTemplate.rendered = function() {
  $('#loadingScreen').removeClass("active");
};
