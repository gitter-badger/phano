<<<<<<< HEAD
if (Meteor.isClient) {
  Meteor.subscribe("rooms");
  Meteor.subscribe("messages");
  Session.setDefault("room");

Template.inputChat.events({
    'click .sendMsg': function(e) {
      _sendMessage();
    },
  });
  _sendMessage = function() {
    var name = document.getElementById("goName");
    var phone = document.getElementById("goPhone");
    var sendText = document.getElementById("txtIput");
    const roomId = Rooms.insert({name: name.value,phone:phone.value, ts: new Date()});
    Messages.insert({text: sendText.value,ts: new Date(),RoomID: roomId});
    // sendText.value = "";
    // sendText.focus();
  };
  Template.messageCus.helpers({
    timestamp: function() {
      return this.ts.toLocaleString();
    }
  });
}
=======
>>>>>>> 72fcd970b271c4c75db360d9e76b0c450cc7be98
