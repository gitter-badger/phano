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
Meteor.publish("searchphama", function() {
  return SearchAllPhano.find({});
});
Meteor.publish("prescription", function(DeviceID) {
  check(DeviceID, String);
  return Prescription.find({
    "$or": [{
      UserId: this.userId
    },
      {
        DeviceId: DeviceID
      }]
  });

});
Meteor.publish("users", function() {
  return Meteor.users.find({
    UserID: this.userId
  });
})
