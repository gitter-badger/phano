Template.screenLayoutTemplate.events({
  "click #btnMenu": function(event, template) {
    $('.ui.sidebar')
    .sidebar('toggle')
    ;
  },
  "click #btnLogout": function(event, template) {
    var r = confirm("Bạn muốn Đăng Xuất");
    if (r == true) {
      Meteor.logout();
      Session.set("currentRoomID",'');
      Session.set("name",'');
      Router.go("/");
    }
  },
  "click #back": function() {
    history.back();
  }
});
Template.layoutTemplate.events({
  "click #btnMenu": function(event, template) {
    $('.ui.sidebar')
    .sidebar('toggle');
  },
  "click #btnLogout": function(event, template) {
    var r = confirm("Bạn muốn Đăng Xuất");
    if (r == true) {
      Meteor.logout();
      Session.set("currentRoomID",'');
      Session.set("name",'');
      Router.go("/");
    }
  },
});
