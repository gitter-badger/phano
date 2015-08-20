/**
 * @Discription: Publish the data
 * @Author: HungHH
 */

Meteor.publish("news", function() {
  return News.find({
  });
});

Meteor.publish("giftinfo", function() {
  return GiftInfo.find({
  });
});
