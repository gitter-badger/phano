if (Meteor.isServer) {
  Meteor.methods({
    'createNewUser': function(data) {
      return Accounts.createUser({
        username: data.username,
        password: data.password,
        profile: data.profile
      });
    }
  });
}
