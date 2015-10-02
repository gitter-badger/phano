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
      console.log("insert Prescription" + data._id + " " + data.UserId);
      Prescription.upsert(data._id, data);
    },
    'RemovePrescription': function(data) {
      console.log("Remove Prescription" + data);
      Prescription.remove({
        _id: data
      });
    },
    'updatePrescription': function(data) {
      console.log("update Prescription" + data);
      Prescription.update(data._id, {
        $set: {
          Text: data.Text,
          Repeat: data.Repeat,
          StartDate: data.StartDate,
          StartTime: data.StartTime
        }
      });
    },

    'updateIsActivePrescription': function(data) {
      Prescription.update(data._id, {
        $set: {
          IsActive: !data.IsActive
        }
      });
    },

    'insertPrescriptionPhoto': function(photo, name, phone, namepres) {
      PrescriptionPhoto.insert({
        phone: phone,
        name: name,
        photo: photo,
        namepres: namepres,
      });
    },
    'updatePrescriptionPhoto': function(photoId) {
      PrescriptionPhoto.update(
        {_id: photoId },{
        $set:{status: "ORDER"}
      });
    },
    insertChat:function(chatMessage){
      Messages.insert(chatMessage);
    },
    insertRoom:function(newRoom){
      return Rooms.insert(newRoom);
    },
    deleteTask: function (roomsId) {
  Rooms.remove(roomsId);
},
  });
}
