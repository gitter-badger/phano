Template.newsTemplate.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('news');
  });
});
Template.newsTemplate.helpers({
  showNews: function() {
    return News.find({});
  }
});
