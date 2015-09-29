if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  Session.setDefault("RoomID","chưa chọn ai???");
  Meteor.subscribe("rooms");
  Meteor.subscribe("messages");


  Template.input.events({
    'submit #NewTextForm': function(event) {
      event.preventDefault();
      var text = event.target.msg.value;
      Messages.insert({user: Meteor.user().username, text: text, ts: new Date(), RoomID: Session.get("RoomID")});
      msg.value = "";
      msg.focus();
    }
  });

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
      Session.set("RoomID", this._id);

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
