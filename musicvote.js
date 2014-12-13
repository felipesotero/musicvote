Songs = new Mongo.Collection("songs");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    songs: function () {
      // Show newest tasks first
      return Songs.find({}, {sort: {votes: -1}});
    }
  });

  Template.body.events({
    "submit .new-song": function (event) {
      // This function is called when the new song form is submitted

      var text = event.target.text.value;
      songFound = Songs.findOne({text: text})

      alert(songFound);

      if (songFound == null) {
        Songs.insert({
          text: text,
          createdAt: new Date(), // current time
          votes: 1,
        });

      } else {
        Songs.update(songFound, {$set: {votes: songFound.votes + 1}});        
      }

      // Clear form
      event.target.text.value = "";
      // Prevent default form submit
      return false;
    }
  });

  Template.song.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Songs.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function () {
      Songs.remove(this._id);
    },
    "click .up": function () {
      Songs.update(this._id, {$set: {votes: this.votes + 1}});
      console.log("blabla")
    },
    "click .down": function () {
      Songs.update(this._id, {$set: {votes: this.votes - 1}});
    }
  });

}

