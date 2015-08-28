
// Define some routes
Router.configure({
  layoutTemplate: 'layoutTemplate',
  loadingTemplate: 'loadingTemplate'
});
Router.route('/', {
  name: 'home',
  template: 'homeTemplate',
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    if (currentUser) {
      this.next();
    } else {
      this.render("loginTemplate");
    }
  }
});
Router.route('/login', {
  name: 'login',
  template: 'loginTemplate',
  layoutTemplate: 'loginLayoutTemplate'
});
Router.route('/calendar', {
  name: 'calendar',
  template: 'calendarTemplate',
  layoutTemplate: 'screenLayoutTemplate'
});
Router.route('/news', {
  name: 'news',
  template: 'newsTemplate',
  waitOn: function() {
    return Meteor.subscribe('news');
  },
  layoutTemplate: 'screenLayoutTemplate'
});
Router.route('/infonews', {
  name: 'infonews',
  template: 'infonewsTemplate',
  waitOn: function() {
    return Meteor.subscribe('giftinfo');
  },
  layoutTemplate: 'screenLayoutTemplate'
});
Router.route('/pharmacy', {
  name: 'pharmacy',
  template: 'pharmacy',
  waitOn: function() {
    return Meteor.subscribe('searchphama');
  },
  layoutTemplate: 'screenLayoutTemplate'
});
Router.route('/userinfo', {
  name: 'userinfo',
  template: 'userinfoTemplate',
  layoutTemplate: 'screenLayoutTemplate'
});
Router.route('/prescription', {
  name: 'prescription',
  template: 'prescriptionTemplate',
  layoutTemplate: 'screenLayoutTemplate'
});
Router.route('/prescription-list', {
  name: 'prescriptionlist',
  template: 'prescriptionListTemplate',
  waitOn: function() {
    return Meteor.subscribe('prescription');
  },
  layoutTemplate: 'screenLayoutTemplate'
});
