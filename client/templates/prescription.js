
var listMedicine = [{
  _id: Random.id(),
  Name: "Paracetamon",
  Total: 2,
  DrinkTimesPerDay: 2,
  DrinkTime: ['sang', 'toi'],
  QuantityPerDrink: 1,
  StartDate: Date()
}];

var thisMedicine ;
var _dep = new Deps.Dependency;

//============= MAIN TEMPLATE PRESCRIPTION====================//
// Template.prescriptionTemplate.onRendered(function() {
//   $('#loadingScreen').removeClass("active");
//   var now = new Date().getTime();
//   var schedule = [{
//     id: 0,
//     title: "Đến giờ uống thuốc test 1!",
//     text: "Xin hãy uống 2 viên thuốc X",
//     at: new Date(now + 5 * 1000)
//   }, {
//     id: 1,
//     title: "Đến giờ uống thuốc test 2!",
//     text: "Xin hãy uống 1 viên thuốc Y",
//     at: new Date(now + 1e5 * 1000)
//   }, {
//     id: 2,
//     title: "Đến giờ uống thuốc test 3!",
//     text: "Xin hãy uống 2 viên thuốc Z",
//     at: new Date(now + 25 * 1000)
//   }, {
//     id: 3,
//     title: "Đến giờ uống thuốc test 4!",
//     text: "Xin hãy uống 2 viên thuốc XX",
//     at: new Date(now + 35 * 1000)
//   }, {
//     id: 4,
//     title: "Đến giờ uống thuốc test 5!",
//     text: "Xin hãy uống 2 viên thuốc YY",
//     at: new Date(now + 45 * 1000)
//   }];
//   cordova.plugins.notification.local.hasPermission(function(granted) {
//     if (!granted) {
//       cordova.plugins.notification.local.registerPermission(function(per) {
//         if (per) {
//           alert('Chương trình đã có quyền gửi thông báo uống thuốc');
//           alert('Trong vòng 30s, app sẽ gửi 5 thông báo uống thuốc test!');
//           cordova.plugins.notification.local.schedule(schedule);
//         }
//
//       });
//     } else {
//       alert('Chương trình đã có quyền gửi thông báo uống thuốc');
//       alert('Trong vòng 30s, app sẽ gửi 5 thông báo uống thuốc test!');
//       cordova.plugins.notification.local.schedule(schedule);
//     }
//   });
// });

Template.prescriptionTemplate.helpers({
    listMedicine: function() {
    _dep.depend();
    return listMedicine;
  }
});

//bắt sự kiện form nhập tên đơn thuốc
Template.prescriptionTemplate.events({
  'click [data-action="nhaptenMedicine"]': function(event) {
    // call modal add new medicine
    var x = $("#txtTendonMedicine").val();
    if (x != "") {
      thisMedicine = {
        _id: Random.id(),
        Name: "",
        Total: '',
        DrinkTimesPerDay: '',
        DrinkTime: '',
        QuantityPerDrink: '',
        StartDate: new Date()
      };
      _dep.changed();
      SemanticModal.generalModal('InsertMedicine');
    } else {
      alert("Bạn chưa nhập tên đơn thuốc!!!");
    }
  },
  'submit #donMedicine': function(event) {
    //save Don thuoc
    event.preventDefault();
    var tendonthuoc = event.target.txtTendonMedicine.value;
    var prescriptionData = {
      _id: Random.id(),
      UserID: Meteor.userId(),
      Name: tendonthuoc,
      listMedicine: listMedicine,
      isAlarm: true,
      CreatedAt: new Date()
    }
    Meteor.call("insertPrescription", prescriptionData);
    Router.go("/prescription-list");
  }
});
//==============END MAIN TEMPLATE PRESCRIPTION===============//


//============= TEMPLATE INSERT MEDICINE FORM====================//

Template.InsertMedicine.onRendered(function() {
  $('#txtTime').dropdown('set exactly', thisMedicine.DrinkTime);
});

Template.InsertMedicine.helpers({
  thisMedicine: function() {
    _dep.depend();
    return thisMedicine;
  },
  convertToEditDate: function() {
    _dep.depend();
    return new Date(thisMedicine.StartDate).toISOString().slice(0, 10);
  }
});

//Bắt sự kiện form nhập thuốc
Template.InsertMedicine.events({
  'submit #newMedicine': function(event) {
    //medicine form post
    event.preventDefault();
    var timesPerDay = $('#txtTime').val();
    var dateStartDate = new Date(event.target.txtNgayBD.value);

    var updateMedicine = _.findWhere(listMedicine, {
      _id: this._id
    });
    if (updateMedicine) {
      //update medicne
      updateMedicine.Name = event.target.txtTenMedicine.value;
      updateMedicine.Total = event.target.txtSoluong.value;
      updateMedicine.DrinkTimesPerDay = timesPerDay.length;
      updateMedicine.DrinkTime = timesPerDay;
      updateMedicine.QuantityPerDrink = event.target.txtSoluong1lan.value;
      updateMedicine.StartDate = dateStartDate;

    } else {
      // add medicine
      var addMedicine = {
        _id: Random.id(),
        Name: event.target.txtTenMedicine.value,
        Total: event.target.txtSoluong.value,
        DrinkTimesPerDay: timesPerDay.length,
        DrinkTime: timesPerDay,
        QuantityPerDrink: event.target.txtSoluong1lan.value,
        StartDate: dateStartDate
      };
      listMedicine.push(addMedicine);
    }

    _dep.changed();
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
  'click #RemoveMedicine': function(event) {
    //click button Remove Medicine
    listMedicine = _.without(listMedicine, _.findWhere(listMedicine, {
      _id: this._id
    }));
    _dep.changed();
  },
  'click [data-action="updateInfo"]': function() {
    //click Update Medicine
    var x = $("#txtTendonthuoc").val();
    if (x != "") {
      thisMedicine = _.findWhere(listMedicine, {
        _id: this._id
      });
      _dep.changed();
      SemanticModal.generalModal('InsertMedicine');
    } else {
      alert("Bạn chưa có tên đơn thuốc!!!");
    }
  }
});
//============= END TEMPLATE lIST MEDICINE====================//
