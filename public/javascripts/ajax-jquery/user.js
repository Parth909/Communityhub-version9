$('#followUser').on('submit', function(e){
	e.preventDefault();

	var actionUrl = $(this).attr('action');
	var $btn = $('.follow-user-btn');
	var $loader = $btn.find('.disp-loader');
	$loader.html(`
                <div class="loader button-loader loading-div">Loading..</div>
		`); 


	$.ajax({
		url:actionUrl,
		btn:$btn,
		loader:$loader,
		contentType:false,
    	processData: false,
		type:'POST',
		success:function(data){
			if(data.err){
				this.loader.html('');
			}else{
//seeing wether loader works
// var loader = this.loader;
// var btn = this.btn;

// 				setTimeout(function(){
// 					loader.html('');
					
// 					if(data === 'removed'){
// 						btn.html(`
// 							Follow
// 							<div class="disp-loader d-inline-block"></div>
// 							`);
// 					}else if(data === 'added'){
// 						btn.html(`
// 							Following
// 							<div class="disp-loader d-inline-block"></div>
// 							`);
// 					}
// 				}, 2000);

				this.loader.html('');					
				if(data === 'removed'){
					this.btn.html(`
						Follow
						<div class="disp-loader d-inline-block"></div>
						`);
				}else if(data === 'added'){
					this.btn.html(`
						Following
						<div class="disp-loader d-inline-block"></div>
						`);
				}


			}//cond end
		}//success end
	});

});