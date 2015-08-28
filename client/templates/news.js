
Template.newsTemplate.helpers({
  showNews: function() {
    return News.find({});
  }
});
Template.newsTemplate.onRendered = function() {
  $('#loadingScreen').removeClass("active");
};
