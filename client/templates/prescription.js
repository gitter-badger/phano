


Template.InsertThuoc.onRendered(function() {
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
    at: new Date(now + 15 * 1000)
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
Template.InsertThuoc.events({
  'click #btnLuuthuoc': function(event) {}
});
//bắt sự kiện form nhập tên đơn thuốc
Template.prescriptionTemplate.events({

  'click [data-action="nhaptenthuoc"]': function() {
    SemanticModal.generalModal('InsertThuoc', {
      foo: 'bar'
    });
  }
});
