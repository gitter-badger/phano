Session.set("currentRoomID",'');
if (Meteor.isClient) {
  Meteor.subscribe("rooms");
  Meteor.subscribe("messages");
  Template.createNewRoom.events({
    'submit #createRoomName': function(event){
      event.preventDefault();
      var txtname = event.target.goName.value;
      var txtphone = event.target.goPhone.value;
      if (txtname==''||txtphone=='') {
        alert("không được để trống thông tin");
      }else {
        document.getElementById("hidden").style.visibility = "hidden";
      }
    }
  });
  Template.inputChat.events({
    'submit #inputChatMes': function(event) {
        event.preventDefault();
      var name = document.getElementById("goName").value;
      var phone = document.getElementById("goPhone").value;
      var sendText = event.target.txtIput.value;
      if(!Session.get("currentRoomID"))
      {
        const roomId = Rooms.insert({user: name,phone:phone, ts: new Date()});
        Session.set("currentRoomID",roomId);
      }else {
        Messages.insert({user:name,text: sendText,ts: new Date(),RoomID: Session.get("currentRoomID")});
        txtIput.value = "";
      }
    },
  });
  // _sendMessage = function() {
  //
  // };
  Template.messageCus.helpers({
    timestamp: function() {
      return this.ts.toLocaleString();
    },
  });
  Template.messagesCus.helpers({
    messagesCus: function() {
      return Messages.find({}, {sort: {ts: -1}}).fetch();
    },
  });
}
