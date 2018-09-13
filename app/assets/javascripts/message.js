$(document).on('turbolinks:load', function() {
	function buildHTML(message){
		var image = "";
		image = (message.image) ? `<image class="lower-message__image" src="${message.image}">` : "";
		var html = `<div class="message" id = ${ message.id }>
									<div class="upper-message">
										<div class="upper-message__user-name">
											${ message.name }
										</div>
										<div class="upper-message__date">
											${ message.created_at }
										</div>
									</div>
									<div class="lower-message">
										<p class="lower-message__comment">
											${ message.content }
											${ image }
										</p>
									</div>
								</div>`
		return html;
	}
	$('#new_message').on('submit', function(e) {
		e.preventDefault();		
		var formData = new FormData($(this).get(0));
		var url = $(this).attr('action');
		$.ajax({
			url: url,
			type: "POST",
			data: formData,
			dataType: 'json',
			processData: false,
			contentType: false
		})
		.done(function(data){
			var html = buildHTML(data);
			$('.messages').append(html);
			$('#new_message')[0].reset();
			$('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
		})
		.fail(function(){
			alert('メッセージの送信に失敗しました');
		})
		.always(function(){
			$(".message-box__submit").removeAttr("disabled");
		});
	});
	var interval = setInterval(function() {
		if (window.location.href.match(/\/groups\/\d+\/messages/)) {
			var message_id = ($('.message')[0]) ? $('.message:last').data('id') : "";
		$.ajax({
			url: location.href,
			type: "GET",
			data: { id: message_id },
			dataType: 'json'
		})
		.done(function(data) {
			var insertHTML = '';
			data.forEach(function(message) {
					insertHTML += buildHTML(message);
					console.log("自動更新中");
			});
			$('.messages').append(insertHTML);
			$('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
		})
		.fail(function(data) {
			alert('自動更新に失敗しました');
			console.log("失敗")
		});
		}
	else {
	clearInterval(interval);
	}} , 5000 );
});
