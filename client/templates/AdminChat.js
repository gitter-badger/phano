if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  Session.setDefault("RoomID","chưa chọn ai???");
  Meteor.subscribe("rooms");
  Meteor.subscribe("messages");


  Template.input.events({
    'click .sendMesg': function(e) {
      _sendMessage();
    },
    'keyup #msg': function(e) {
      if (e.type == "keyup" && e.which == 14) {
        _sendMessage();
      }
    }
  });

  _sendMessage = function() {
    var el = document.getElementById("msg");
    Messages.insert({user: Meteor.user().username, text: el.value, ts: new Date(), room: Session.get("RoomID")});
  };
  Template.messages.helpers({
    messages: function() {
      return Messages.find({RoomID: Session.get("RoomID")}, {sort: {ts: -1}});
    },
    name: function() {
      return Session.get("RoomID");
    }
  });

  Template.message.helpers({
    timestamp: function() {
      return this.ts.toLocaleString();
    }
  });

  Template.rooms.events({
    'click li': function(e) {
      Session.set("RoomID", e.target.innerText);
    },
  });

  Template.rooms.helpers({
    rooms: function() {
      return Rooms.find();
    }
  });

  Template.room.helpers({
    roomstyle: function() {
      return Session.equals("RoomID", this.name) ? "font-weight: bold" : "";
    }
  });
}
