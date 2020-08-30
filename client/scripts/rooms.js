var Rooms = {
  knownRooms: ['general lobby'],
  myRooms: [],
  add: function(tag) {
    var $option = $('<option></option>');
    $option.text(tag);
    Rooms.knownRooms.push(tag);
    $('#rooms select').append($option);
    $('#message').val('');
  }
};