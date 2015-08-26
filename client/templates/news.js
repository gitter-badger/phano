Template.newsTemplate.onCreated(function() {
  $('#loadingScreen').addClass("active");
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
Template.newsTemplate.onRendered = function() {
  $('#loadingScreen').removeClass("active");
};
