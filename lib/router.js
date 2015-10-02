
// Define some routes
Router.configure({
  layoutTemplate: 'layoutTemplate',
  loadingTemplate: 'loadingTemplate'
});
Router.route('/', {
  name: 'home',
  template: 'homeTemplate'
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
    // return Meteor.subscribe('giftinfo');
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
Router.route('/chat', {
  name: 'AdminChat',
  template: 'AdminChat',
  waitOn: function() {
    return Meteor.subscribe("users");
  },
  layoutTemplate: 'screenLayoutTemplate'
});
Router.route('/userinfo', {
  name: 'userinfo',
  template: 'userinfoTemplate',
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    if (currentUser) {
      this.next();
    } else {
      this.render("loginTemplate");
    }
  },
  waitOn: function() {
    return Meteor.subscribe("users");
  },
  layoutTemplate: 'screenLayoutTemplate'
});
Router.route('/prescription', {
  name: 'prescription',
  template: 'prescriptionTemplate',
  waitOn: function() {
    var DeviceID = '';
    if (Meteor.isCordova) {
      DeviceID = cordova.plugins.device.uuid;
    } else {
      DeviceID = "Browser";
    }
    return Meteor.subscribe('prescription', DeviceID);
  },
  layoutTemplate: 'screenLayoutTemplate'
});
Router.route('/scanprescription', {
  name: 'scanprescription',
  template: 'scanprescriptionTemplate',
  layoutTemplate: 'screenLayoutTemplate'
});
Router.route('/listprescription', {
  name: 'listprescription',
  template: 'listprescriptionTemplate',
  layoutTemplate: 'screenLayoutTemplate'
});
Router.route('/managerphoto', {
  name: 'managerphoto',
  template: 'tempalteManagerphoto',
  layoutTemplate: 'screenLayoutTemplate'
});
Router.route('/giftinfo', {
  name: 'giftinfo',
  template: 'giftInfoTemplate',
  layoutTemplate: 'screenLayoutTemplate'
});
