if (Meteor.isServer) {
  Meteor.methods({
    'insertNews': function(data) {
      console.log("insert news");
      data.forEach(function(news) {
        News.insert(news);
      })
    },
    'insertGift': function(data) {
      console.log("insert gift");
      data.forEach(function(gift) {
        GiftInfo.insert(news);
      })
    },
    'insertPhama': function(data) {
      console.log("insert phama");
      data.forEach(function(phama) {
        SearchAllPhano.insert(phama);
      })
    },
    'insertPrescription': function(data) {
      console.log("insert Prescription" + data._id + " " + data.UserID);
      Prescription.upsert(data._id, data);
    },
    'RemovePrescription': function(data) {
      console.log("Remove Prescription" + data);
      Prescription.remove({
        _id: data
      });
    }
  });
}
