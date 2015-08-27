

var listMedicine = [{
  Name: "Paracetamon",
  Total: 2,
  DrinkTimesPerDay: 2,
  DrinkTime: ['sang', 'toi'],
  QuantityPerDrink: 1,
  StartDate: Date()
}];
var _dep = new Deps.Dependency;

Template.InsertMedicine.onRendered(function() {
  $('#txtTime').dropdown();
});

Template.prescriptionTemplate.onRendered(function() {
  $('#loadingScreen').removeClass("active");
  var now = new Date().getTime();
  var schedule = [{
    id: 0,
    title: "Đến giờ uống thuốc test 1!",
    text: "Xin hãy uống 2 viên thuốc X",
    at: new Date(now + 5 * 1000)
  }, {
    id: 1,
    title: "Đến giờ uống thuốc test 2!",
    text: "Xin hãy uống 1 viên thuốc Y",
    at: new Date(now + 1e5 * 1000)
  }, {
    id: 2,
    title: "Đến giờ uống thuốc test 3!",
    text: "Xin hãy uống 2 viên thuốc Z",
    at: new Date(now + 25 * 1000)
  }, {
    id: 3,
    title: "Đến giờ uống thuốc test 4!",
    text: "Xin hãy uống 2 viên thuốc XX",
    at: new Date(now + 35 * 1000)
  }, {
    id: 4,
    title: "Đến giờ uống thuốc test 5!",
    text: "Xin hãy uống 2 viên thuốc YY",
    at: new Date(now + 45 * 1000)
  }];
  cordova.plugins.notification.local.hasPermission(function(granted) {
    if (!granted) {
      cordova.plugins.notification.local.registerPermission(function(per) {
        if (per) {
          alert('Chương trình đã có quyền gửi thông báo uống thuốc');
          alert('Trong vòng 30s, app sẽ gửi 5 thông báo uống thuốc test!');
          cordova.plugins.notification.local.schedule(schedule);
        }

      });
    } else {
      alert('Chương trình đã có quyền gửi thông báo uống thuốc');
      alert('Trong vòng 30s, app sẽ gửi 5 thông báo uống thuốc test!');
      cordova.plugins.notification.local.schedule(schedule);
    }
  });
});


//Bắt sự kiện form nhập thuốc
Template.InsertMedicine.events({
  'submit #newMedicine': function(event) {
    event.preventDefault();
    var timesPerDay = $('#txtTime').val();
    var addMedicine = {
      Name: event.target.txtTenMedicine.value,
      Total: event.target.txtSoluong.value,
      DrinkTimesPerDay: timesPerDay.length,
      DrinkTime: timesPerDay,
      QuantityPerDrink: event.target.txtSoluong1lan.value,
      StartDate: event.target.txtNgayBD.value
    };
    listMedicine.push(addMedicine);
    console.log(listMedicine);
    _dep.changed();
  }
});
//bắt sự kiện form nhập tên đơn thuốc
Template.prescriptionTemplate.events({
  'click [data-action="nhaptenMedicine"]': function() {
    SemanticModal.generalModal('InsertMedicine');
  }
});
Template.prescriptionTemplate.helpers({
  listMedicine: function() {
    _dep.depend();
    return listMedicine;
  }
});
