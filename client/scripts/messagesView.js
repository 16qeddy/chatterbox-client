var MessagesView = {

  $chats: $('#chats'),



  renderMessage: (message) => {
    // MessagesView.$chats.append(`<div class="message">${message}</div>`);
    var $messageBox = $('<div class="box"></div>');
    var $message = $(`<div class="text">${message.text}</div>`);
    var $user = $(`<div class="user">${message.username}</div>`);
    var $room = $(`<div class="room">${message.roomname}</div>`);
    var $time = $(`<div class="time">${message.createdAt}</div>`);
    $messageBox.append($user);
    $messageBox.append($message);
    $messageBox.append($room);
    $('#chats').append($messageBox);
  },

  initialize: function() {
    $('.submit').on('click', function() {
      let obj = {};
      obj.username = App.username;
      obj.roomname = 'fill_me_in';
      obj.text = $('#message').val();
      Parse.create(obj);
    });
  },

  render: function(messages) {
    // iterate over the messages
    for (let x = 0; x < messages.length; x++) {
      if (messages[x].username !== undefined && messages[x].text !== undefined) {
        if (messages[x].text[0] !== '<' && messages[x].username[0] !== '<' && (messages[x].roomname === null || messages[x].roomname[0] !== '<')) {
          MessagesView.renderMessage(messages[x]);
        }
      }
    }
    // renderMessage on every message
  }

};

