var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    RoomsView.$button.on('click', function() {
      // Rooms.knownRooms.push($('#message').val());
      // var $option = $(`<option>${$('#message').val()}</option>`);
      // RoomsView.$select.append($option);
      // $('#message').val('');
      RoomsView.renderRoom($('#message').val());
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
    var $option = $('<option></option>');
    $option.text(tag);
    Rooms.knownRooms.push(tag);
    $('#rooms select').append($option);
    $('#message').val('');
  }

};

// click on add room
// update messages below to only show the messages with same roomname
// update add message roomname value to current room