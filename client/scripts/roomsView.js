var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    RoomsView.$button.on('click', function() {
      RoomsView.renderRoom($('#message').val());
    });

    RoomsView.$select.on('change', function() {
      $('#chats').empty();
      console.log(RoomsView.$select.val());
      Parse.readAll(function(data) {
        console.log(data, 'this is data!!!!!!!!!!');
        Messages.saved = [];
        MessagesView.render(data.results);
      });
    });

  },

  render: function(data) {
    for (var i = 0; i < data.length; i++) {
      //if knownrooms does not contain current room name
      if (data[i].roomname !== undefined) {
        if (!Rooms.knownRooms.includes(data[i].roomname)) {
          //push current roomname into known rooms.
          Rooms.knownRooms.push(data[i].roomname);
          var $option = $(`<option class = ${i}</option>`);
          $option.text(data[i].roomname);
          RoomsView.$select.append($option);
        }
      }
    }
  },

  renderRoom: tag => {
    //moved previous functionality to the rooms object.
    Rooms.add(tag);
  }
};

// click on add room
// update messages below to only show the messages with same roomname
// update add message roomname value to current room