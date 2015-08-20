
Template.layoutTemplate.helpers({
  'toLoginTemplate': function() {
    console.log("chay cai else");
    Router.go("/login");
  },
  'isLogin': function() {
    if (Meteor.userId()) {
      console.log(Meteor.userId());
      return true;
    }
    return false;
  }
});
