

// Setup code for Slideout menu in MasterLayout

Template.screenLayoutTemplate.events({
  "click #btnMenu": function(event, template) {
    $('.ui.sidebar')
      .sidebar('toggle')
    ;
  }
});
Template.layoutTemplate.events({
  "click #btnMenu": function(event, template) {
    $('.ui.sidebar')
      .sidebar('toggle')
    ;
  }
});
