Session.set("currentRoomID",'');
Session.set("name",'');
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
        document.getElementById("UserInfor").style.visibility = "hidden";
        document.getElementById("chatBox").style.visibility = "visible";
      }
    }
  });
  Template.infonewsTemplate.helpers({
    'showUserInfo':function(){
      if(Session.get("currentRoomID")!='') return false
      else return true;
    },
    isShowChatBox:function(){
      if(Session.get("currentRoomID")!=''|| Meteor.user()) return "visible"
      else return "hidden";
    }
  })

  Template.inputChat.events({
    'submit #inputChatMes': function(event) {
      event.preventDefault();
      if (Meteor.user()){
        _sendMessageLoggin();
      }else {
        _sendMessage();
      }
    },
  });
  _sendMessage = function() {
    var phone ='';
    if(Session.get("currentRoomID")=='')
    {    Session.set("name",document.getElementById("goName").value);
    phone = document.getElementById("goPhone").value;
  }
  var sendText = event.target.txtIput.value;
  if(!Session.get("currentRoomID"))
  {
    Meteor.call("insertRoom",{user: Session.get("name"),phone:phone, ts: new Date()},function(error,result){
      if(result)
      {
        Session.set("currentRoomID",result);
        Meteor.call("insertChat",{user:Session.get("name"),text: sendText,ts: new Date(),RoomID: Session.get("currentRoomID")});
      }
    });
  }
  else {
    Meteor.call("insertChat",{user:Session.get("name"),text: sendText,ts: new Date(),RoomID: Session.get("currentRoomID")});
  }
  txtIput.value = "";
};
_sendMessageLoggin=function(){
  var sendText = event.target.txtIput.value;
  if(!Session.get("currentRoomID"))
  {
    Meteor.call("insertRoom",{user: Meteor.user().profile.Name,phone:Meteor.user().profile.Phone, ts: new Date()},function(error,result){
      if(result)
      {
        Session.set("currentRoomID",result);
        // Session.set("currentRoomID",'');
        Meteor.call("insertChat",{user:Meteor.user().profile.Name,text: sendText,ts: new Date(),RoomID: Session.get("currentRoomID")});
      }
    });
  }
  else {
    Meteor.call("insertChat",{user:Meteor.user().profile.Name,text: sendText,ts: new Date(),RoomID: Session.get("currentRoomID")});
  }
  txtIput.value = "";

};
Template.messageCus.helpers({
  timestamp: function() {
    return this.ts.toLocaleString();
  },
});
Template.messagesCus.helpers({
  messagesCus: function() {
    return Messages.find({RoomID: Session.get("currentRoomID")}, {sort: {ts: -1}}).fetch();
  },
});
}
