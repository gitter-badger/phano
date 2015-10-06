Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  Meteor.subscribe("users");
  Session.setDefault("RoomID","Thông báo toàn bộ!!");
  Meteor.subscribe("rooms");
  Meteor.subscribe("messages");

  Template.input.events({
    'submit #NewTextForm': function(event) {
      event.preventDefault();
      var text = event.target.msg.value;
      Meteor.call("insertChat",{user: Meteor.user().username, text: text, ts: new Date(), RoomID: Session.get("RoomID")})
      msg.value = "";
      msg.focus();
    }
  });

  Template.messages.helpers({
    messages: function() {
      return Messages.find({RoomID: Session.get("RoomID")}, {sort: {ts: 1}});
    },
    name: function() {
      return Session.get("RoomID",this.name);
    }
  });

  Template.message.helpers({
    timestamp: function() {
      return this.ts.toLocaleString();
    }
  });

  Template.rooms.events({
    'click div': function(e) {
      Session.set("RoomID", this._id);
    },
    "click .delete": function () {
      Meteor.call("deleteTask", this._id);
    }
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
  Template.LoginForm.events({
    'submit #login': function(event){
      event.preventDefault();
      var name = event.target.txtName.value;
      var pass = event.target.txtPass.value;
      var result = Meteor.users.findOne({username: name});
      if (result != undefined) {
          Meteor.loginWithPassword(name, pass,function(err){
            if(err){
              alert("Password wrong")
            }
          });
      }
      else {
        alert("Username wrong")
      }
  }
});
