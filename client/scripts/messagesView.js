var MessagesView = {

  $chats: $('#chats'),



  renderMessage: (message) => {

    var room = RoomsView.$select.val() === 'general lobby' ? message.roomname : RoomsView.$select.val();

    if (message.roomname === room) {
      if (!Messages.saved.includes(message.objectId)) {
        Messages.saved.push(message.objectId);
        if (Messages.saved.length > 100) {
          Messages.saved.splice(0, 10);
        }
        var $messageBox = $('<div class="box"></div>');
        // var $message = $(`<div class="text">${message.text}</div>`);
        var $message = $('<div class="text"></div>');
        $message.text(message.text);
        var $user = $('<button class="user"></button>');
        $user.text(message.username);
        var $room = $('<div class="room"></div>');
        $room.text(message.roomname);
        var $time = $(`<div class="time">${message.createdAt}</div>`);
        $messageBox.append($user);
        $messageBox.append($message);
        $messageBox.append($room);
        $('#chats').prepend($messageBox);
      }
    }

  },

  initialize: function() {
    $('.submit').on('click', function() {
      console.log('it got clicked!');
      let obj = {};
      obj.username = App.username;
      obj.roomname = RoomsView.$select.val();
      obj.text = $('#message').val();
      Parse.create(obj);
      console.log('clicked');
      $('#message').val('');
    });


  },

  render: function(messages) {
    for (let x = 0; x < messages.length; x++) {
      // console.log('render with this message', messages[x].text);
      let message = messages[x];
      message.username = MessagesView.encode(message.username);
      message.text = MessagesView.encode(message.text);
      message.roomname = MessagesView.encode(message.roomname);
      MessagesView.renderMessage(message);
    }

    console.log(Messages.saved);

    var checker = function() {
      setInterval(function() {
        Parse.readAll((data) => {
          for (let x = 0; x <= 10; x++) {
            let message = data.results[x];
            message.username = MessagesView.encode(message.username);
            message.text = MessagesView.encode(message.text);
            message.roomname = MessagesView.encode(message.roomname);
            MessagesView.renderMessage(message);
          }
        });
      }, 1000);
    };

    checker();
  },

  encode: function(string) {
    // console.log(typeof string);
    if (typeof string !== 'string') {
      return 'you are a string now';
    }
    let arr = string.split('');
    arr = arr.map((char) => {
      if (char === '&') {
        return 'not today';
      } else if (char === '<') {
        return 'not today';
      } else if (char === '') {
        return 'not today';
      } else if (char === '%') {
        return 'not today';
      } else {
        return char;
      }
    });
    return arr.join('');
  }

};

//MessagesView.renderMessage(messages[x]);

/*Encode the following characters with HTML entity encoding to prevent switching into any execution context, such as script, style, or event handlers. Using hex entities is recommended in the spec. In addition to the 5 characters significant in XML (&, <, >, ", '), the forward slash is included as it helps to end an HTML entity.


 & --> &amp;
 < --> &lt;
 > --> &gt;
 " --> &quot;
 ' --> &#x27;
 / --> &#x2F; */