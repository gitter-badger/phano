
// Define some routes
Router.configure({
  layoutTemplate: 'layoutTemplate'
});

Router.map(function() {
  this.route('homeTemplate', {
    path: '/'
  });
  this.route('loginTemplate', {
    path: '/login'
  });
  this.route('calendarTemplate', {
    path: '/calendar'
  });
  this.route('newsTemplate', {
    path: '/news'
  });
  this.route('pharmacyTemplate', {
    path: '/pharmacy'
  });
});
