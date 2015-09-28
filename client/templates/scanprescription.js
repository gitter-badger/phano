
Template.scanprescriptionTemplate.events({
   'click #capture': function(){
     MeteorCamera.getPicture({}, function(error, data){
      Session.set('photo', data);
    });
  },

  'click #btnSave': function() {
    var pic = Session.get('photo');
    // var path = pic.substr(0, 23);
    // var splitted = pic.slice(23,-22);
    // var value = path ;
    if(Meteor.userId()) {
      var userDetail = Meteor.users.findOne({_id: Meteor.userId()});
      var profile = userDetail.profile;
      var name = profile.Name;
      var phone = profile.Phone;
      Meteor.call('insertPrescriptionPhoto', pic, name, phone);
    } else {
      var name = $('#txtName').val();
      var phone = $('#txtPhone').val();
      Meteor.call('insertPrescriptionPhoto', pic, name, phone);
    }
  },
  'click #Cancel': function() {
    Session.set('photo', null);
    $('#txtName').val('');
    $('#txtPhone').val('');
    return Session.get('photo');
  },
 });

 Template.scanprescriptionTemplate.helpers({
  'photo': function(){
    return Session.get('photo');
  },
  'isUser': function() {
    if(Meteor.userId() != undefined ) {
      return true;
    }
    return false;
  },
  'text': function(){
    var re= new Date();
    // var d= date.substr(0,3);
    //lấy ngày
    var d=re.getDay();
    var h=re.getHours();
    var m=re.getMinutes();
    var time=(h-m);
    return time;
  }
});
