var Friends = {

  list: [],

  render: function() {
  },

  init: function() {
    var $users = document.querySelector('.user');
    console.log(this);
    $('.user').on('click', Friends.addFriend(this));
  },

  addFriend: function(node) {
    Friends.list.push(this.text);
    console.log('hello======================');
  },

  toggleStatus: function(userName) {
    list.push(userName);
  }

};

