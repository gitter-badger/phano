

// Setup code for Slideout menu in MasterLayout

Template.screenLayoutTemplate.events({
  "click #btnMenu": function(event, template) {
    $('.ui.sidebar')
      .sidebar('toggle')
    ;
  },
  "click #back": function() {
    history.back();
  }
});
Template.layoutTemplate.events({
  "click #btnMenu": function(event, template) {
    $('.ui.sidebar')
      .sidebar('toggle')
    ;
  }
});
