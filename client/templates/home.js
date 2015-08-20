
Template.homeTemplate.events({
  'click #calendar': function() {
    Router.go("/calendar");
  },
  'click #news': function() {
    Router.go("/news");
  },
  'click #pharmacy': function() {
    Router.go("/pharmacy");
  },
  'click #logout': function() {
    console.log("log out click")
    Meteor.logout(function() {});
    Router.go("/login");
  }
});
Template.homeTemplate.rendered = function() {
  $('#loadingScreen').removeClass("active");
};
