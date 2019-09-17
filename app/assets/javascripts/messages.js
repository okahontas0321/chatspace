$(function(){
  function buildMessage(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="chat__main--list" data-message-id="${message.id}">
                    <div class="chat__main--list--g">
                        <div class="chat__main--list--g--roup">
                        ${message.user_name}
                        </div>
                        <div class="chat__main--list--g--day">
                        ${message.date}
                        </div>
                        <div class="chat__main--list--g--a">
                          <p class="lower-message__content">
                            ${content}
                          </p>
                          ${img}
                        </div>
                    </div>
                </div>`
    return html;
  }

  

  $('#new_message').on('submit',function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.chat__main--body').append(html)
      $("#new_message")[0].reset();
      $(".chat__main--send").prop('disabled', false);
      $('.chat__main--body').animate({scrollTop: $('.chat__main--body')[0].scrollHeight},'fasts')
      }
      )
    .fail(function(){
      alert('エラー');
    })
  })
  
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.chat__main--list').filter(":last").data('message-id')
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })

      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML += buildMessage(message);
          $('.chat__main--body').append(insertHTML);
          $('.chat__main--body').animate({scrollTop: $('.chat__main--body')[0].scrollHeight}, 'fast');
        })
      })
      
      .fail(function() {
        alert('自動更新に失敗しました');
      });

    }
  };
  setInterval(reloadMessages, 5000);
});
