


Template.InsertThuoc.onRendered(function() {
  $('#txtTime').dropdown();
});

Template.prescriptionTemplate.onRendered(function() {
  $('#loadingScreen').removeClass("active");

  cordova.plugins.notification.local.registerPermission(function(granted) {
    alert('Permission has been granted: ' + granted);
    if (granted) {
      alert('Permission has been granted, set notification in 15 second from now~!');
      var now = new Date().getTime();
      var schedule = [{
        id: 0,
        title: "Schedule 1!",
        text: "Delayed Notification",
        at: new Date(now + 5 * 1000)
      }, {
        id: 1,
        title: "Schedule 2!",
        text: "Delayed Notification",
        at: new Date(now + 15 * 1000)
      }, {
        id: 2,
        title: "Schedule 3!",
        text: "Delayed Notification",
        at: new Date(now + 25 * 1000)
      }, {
        id: 3,
        title: "Schedule 4!",
        text: "Delayed Notification",
        at: new Date(now + 35 * 1000)
      }, {
        id: 4,
        title: "Schedule 5!",
        text: "Delayed Notification",
        at: new Date(now + 45 * 1000)
      }];
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
