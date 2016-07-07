$(function(){

  // Send message
  function sendMessage(msg, callback){
    // Send msg to API
    $.ajax({
      url : '/api/message',
      type : 'POST',
      dataType : 'json',
      data: {msg: msg},
      success : function(data, status, jqXHR){
        callback(null);
      },
      error : function(jqXHR, status, err){
          console.log("cannot send message");
          console.log(err);
      },
      complete : function(jqXHR, status){
      }
    });
  }

  // Get all messages
  function getMessages(){
    // Send msg to API
    $.ajax({
      url : '/api/message',
      type : 'GET',
      success : function(data, status, jqXHR){
        var messages = JSON.parse(data);

        // Default messages in none in the list
        if(messages.length == 0){
          $('.list-group').append($('<li>').attr('class', 'list-group-item').append("No message sent..."));
        } else {
          $('.list-group').empty();

          // Otherwise populate list with existing messages
          for(var i=0; i<messages.length; i++){
            var message = messages[i];
            $('.list-group').prepend($('<li>').attr('class', 'list-group-item').append("Sent on " + new Date(message.createdAt) + ' -> ' + message.msg)); 
          }
        }
      },
      error : function(jqXHR, status, err){
      },
      complete : function(jqXHR, status){
      }
    });
  }

  // Add event on send button
  $('#send_button').click(function(e){
    e.preventDefault();
    var msg = $('#message').val();
    if(msg){
      sendMessage(msg, function(err){
        if(!err){
          getMessages();
          $('#message').val('');
        } else {
          console.log("cannot get messages");
          console.log(err);
        }
      });
    } 
  });

  // Load current list of messages
  getMessages();

});
