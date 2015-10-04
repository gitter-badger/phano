
var listMedicine = [];
var currentPrescription = {};
var thisMedicine = {} ;
var currentID;
//var DeviceId;
var DeviceId = '';
//============= MAIN TEMPLATE PRESCRIPTION====================//
Template.prescriptionTemplate.onRendered(function() {
  $('#loadingScreen').removeClass("active");
  var date = new Date();
  var weekday = new Array(7);
  weekday[0]=  "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thur";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  var d = weekday[date.getDay()];
  var h = date.getHours();
  var m = date.getMinutes();
  if(m<10)
    m = '0' + m;
  var time = h + ":" + m;
  var arr = Prescription.find({IsActive:{$in:[true,1]}}).fetch();

  if(Meteor.isCordova){
  cordova.plugins.notification.local.hasPermission(function(granted) {
    if (!granted) {
      cordova.plugins.notification.local.registerPermission(function(per) {
        if (per) {
          var id = 1;
          if(arr.length != 0){
          arr.forEach(function(res){
            var timeRepeat = res.Repeat;
            timeRepeat.forEach(function(day){
              if(d == day && time == res.StartTime){
                cordova.plugins.notification.local.schedule({
                  id:id,
                  title: "Phano care",
                  message: res.Text,
                  at: new Date(Date.now()),
                });
              }
            });
            id = id +1;
          });
        }
          // cordova.plugins.notification.local.schedule(schedule);
        }

      });
    } else {
      var id = 1;
      if(arr.length != 0){
      arr.forEach(function(res){
        var timeRepeat = res.Repeat;
        timeRepeat.forEach(function(day){
          if(d == day && time == res.StartTime){
            cordova.plugins.notification.local.schedule({
              id:id,
              title: "Phano care",
              message: res.Text,
              at: new Date(),
            });
          }
        });
        id = id +1;
      });
    }
      // cordova.plugins.notification.local.schedule(schedule);
    }
  });
}

});
//
Template.prescriptionTemplate.helpers({
  currentPrescription: function() {
    if (Meteor.isCordova) {
      DeviceId = device.uuid;
    } else {
      DeviceId = "Browser";
    }
    Meteor.subscribe('prescription', DeviceId);
    listMedicine = Prescription.find().fetch();
    return listMedicine;
  }
});
//
// //bắt sự kiện form nhập tên đơn thuốc
Template.prescriptionTemplate.events({
  'click [data-action="addNew"]': function(event) {
    if (Meteor.userId()) {
      thisMedicine = {
        _id: Random.id(),
        UserId: Meteor.userId(),
        DeviceId: DeviceId,
        Text: '',
        Repeat: '',
        StartTime: '00:00',
        StartDate: new Date(),
        IsActive: true,
      };
    } else {
      thisMedicine = {
        _id: Random.id(),
        UserId: 'N/A',
        DeviceId: DeviceId,
        Text: '',
        Repeat: '',
        StartTime: '00:00',
        StartDate: new Date(),
        IsActive: true,
      };
    }
    // call modal add new medicine

    SemanticModal.generalModal('InsertMedicine');
  }
});
//==============END MAIN TEMPLATE PRESCRIPTION===============//


//============= TEMPLATE INSERT MEDICINE FORM====================//

Template.InsertMedicine.onRendered(function() {
  $('#txtRepeat').dropdown('set exactly', thisMedicine.Repeat);
});

Template.InsertMedicine.helpers({
  thisMedicine: function() {
    return thisMedicine;
  },
  convertToEditDate: function() {
    return new Date(thisMedicine.StartDate).toISOString().slice(0, 10);
  },
  convertToEditTime: function() {
    return "00:00"
  }
});

//Bắt sự kiện form nhập thuốc
Template.InsertMedicine.events({
  'submit #newMedicine': function(event) {
    //medicine form post
    event.preventDefault();
    var Repeat = $('#txtRepeat').val();
    var dateStartDate = new Date(event.target.txtDate.value + " " + event.target.txtTime.value);
    var updateMedicine = _.findWhere(listMedicine, {
      _id: this._id
    });
    if (updateMedicine) {
      //update medicne
      if (Meteor.userId())
        updateMedicine.UserId = Meteor.userId();
        updateMedicine.StartTime = event.target.txtTime.value;
        updateMedicine.Text = event.target.txtText.value;
        updateMedicine.Repeat = Repeat;
        updateMedicine.StartDate = dateStartDate;
        Meteor.call("updatePrescription", updateMedicine);
    } else {
      // add medicine
      var addMedicine = {
        _id: Random.id(),
        UserId: 'N/A',
        DeviceId: DeviceId,
        Text: event.target.txtText.value,
        Repeat: Repeat,
        StartTime: event.target.txtTime.value,
        StartDate: dateStartDate,
        IsActive: true,
      }
      if (Meteor.userId())
        addMedicine.UserId = Meteor.userId();
      Meteor.call("insertPrescription", addMedicine);
    }
  }
});

//==============END TEMPLATE INSERT MEDICINE FORM===============//

//============= TEMPLATE lIST MEDICINE====================//
Template.medicineTemplate.helpers({
  convertToShowDate: function(thisDate) {
    function pad(s) {
      return (s < 10) ? '0' + s : s;
    }
    var d = new Date(thisDate);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
  }
});

Template.medicineTemplate.events({
  'click [data-action="removeMedicine"]': function(event) {
    //click button Remove Medicine
    Meteor.call("RemovePrescription", this._id);
  },
  'click [data-action="updateInfo"]': function() {
    //click Update Medicine
    thisMedicine = Prescription.findOne({
      _id: this._id
    });

    SemanticModal.generalModal('InsertMedicine');
  },
  'click [data-action="toggleChecked"]': function() {
    Meteor.call("updateIsActivePrescription", this);
  }
});
//============= END TEMPLATE lIST MEDICINE====================//
