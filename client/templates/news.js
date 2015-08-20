
Template.newsTemplate.helpers({
  showNews: function() {
    return News.find({});
  }
});
