
Template.scanprescriptionTemplate.events({
   'click #capture': function(){
     MeteorCamera.getPicture({}, function(error, data){
      Session.set('photo', data);
    });
  },
  'vali': function(phone) {
    var a = /^[0][1|9]\d{8,9}$/;
    return a.test(phone);
  },

  'click #btnSave': function() {
    var pic = Session.get('photo');
    // var path = pic.substr(0, 23);
    // var splitted = pic.slice(23,-22);
    // var value = path ;

    if(Meteor.userId()) {
      var userDetail = Meteor.users.findOne({_id: Meteor.userId()});
      if(userDetail.username != "Admin"){
        var profile = userDetail.profile;
        var name = profile.Name;
        var phone = profile.Phone;
        var namepres = $('#txtPres').val();
        Meteor.call('insertPrescriptionPhoto', pic, name, phone,namepres);
        $('#txtName').val('');
        $('#txtPhone').val('');
        $('#txtPres').val('');
        Session.set('photo', null);
      }
      else {
        Meteor.logout();
      }
    } else {
      var name = $('#txtName').val();
      var phone = $('#txtPhone').val();
      // if(vali(phone)) {
      //   Meteor.call('insertPrescriptionPhoto', pic, name, phone);
      // }
      // else {
      //   console.log('So dien thoai sai');
      // }
      var namepres = $('#txtPres').val();
      Meteor.call('insertPrescriptionPhoto', pic, name, phone,namepres);
      $('#txtName').val('');
      $('#txtPhone').val('');
      $('#txtPres').val('');
      Session.set('photo', null);
    }
  },
  'click #Cancel': function() {
    Session.set('photo', null);
    $('#txtName').val('');
    $('#txtPhone').val('');
    $('#txtPres').val('');
    return Session.get('photo');
  },
 });

 Template.scanprescriptionTemplate.helpers({
  'photo': function(){
    return Session.get('photo');
  },
  // 'text': function() {
  //   var DeviceId = '';
  //   if (Meteor.isCordova) {
  //     DeviceId = device.uuid;
  //   } else {
  //     DeviceId = "Browser";
  //   }
  //   Meteor.subscribe('prescription', DeviceId);
  //   var arr = Prescription.find({IsActive:{$in:[true,1]}}).fetch();
  //   var date = new Date();
  //   var weekday = new Array(7);
  //   weekday[0]=  "Sun";
  //   weekday[1] = "Mon";
  //   weekday[2] = "Tue";
  //   weekday[3] = "Wed";
  //   weekday[4] = "Thur";
  //   weekday[5] = "Fri";
  //   weekday[6] = "Sat";
  //
  //   var d = weekday[date.getDay()];
  //   var h = date.getHours();
  //   var m = date.getMinutes();
  //   if(m<10)
  //     m='0'+ m;
  //   var time = h + ":" + m;
  //   if(time == "19:17")
  //     return "tuan";
  //   return "khong được";
  // },
  'isUser': function() {
    if(Meteor.userId() != undefined ) {
      return true;
    }
    return false;
  },

});
