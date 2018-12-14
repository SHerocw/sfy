$(function(){
	/*加载头部*/
	$('header').load('common.html header');
	/*加载底部*/
	$('footer').load('common.html footer');
	/*加载固定定位*/
	$('.side_nav').load('common.html .side_nav', function() {
		$('body').append('<script src="js/common.js"><\/script>')
	});

	/*小屏右上角显示*/
	setTimeout(function() {
		$('.navx b').html('投资者关系');
		$('.nav_bottom>div').eq(4).find('.nav_text').addClass('cur').parent().siblings().removeClass('cur');
	}, 0);
	
	/*分页显示*/
	(function(){
		if($('.info_main').attr('post')=='ajax'){
			/*临时报告数据*/
			$.ajax({
				url:"casual_report.json",
				success : function(res){
					require($('#page1'),res,$('.info_list1'),true)
				}
			});
			/*定时报告数据*/
			$.ajax({
				url:"termly_report.json",
				success : function(res){
					require($('#page2'),res,$('.info_list2'),true)
					$('.page input').before('跳转到')
					$('.page input').after('页')		
				}
			});
			/*公司治理数据*/
			$.ajax({
				url:"rules.json",
				success : function(res){
					require($('#page3'),res,$('.info_list3'),false)
				}
			});
			/*投资者保护数据*/
			$.ajax({
				url:"protect_case.json",
				success : function(res){
					require($('#page4'),res,$('.info_list4'),false)
				}
			});
		}
				
		function require(id,res,addel,isJump){
			var con = '';
			res.slice(0,12).forEach(function(c,i){
				con += `<li><a href="${c.href}" target="_blank">${c.title}</a><p>${c.time}</p></li>`
			})
			addel.html(con)

			id.pagination({
				totalData : res.length,
				showData : 12,
				pageCount : res.length/12,
				current: 1,
				prevContent : '上一页',
				nextContent : '下一页',
				keepShowPN: true,
				mode: 'fixed',
				count: 4,
				jump: isJump,
				jumpBtn:'确定',
				callback : function(i){
					var arr = res.slice((i.getCurrent()-1)*12,i.getCurrent()*12)
					id.prepend(`<b>共${res.length}项</b><b>共${Math.ceil(res.length/12)}页</b>`)
					$('.page input').before('跳转到')
					$('.page input').after('页')
					con = ''
					arr.forEach(function(c,i){
						con += `<li><a href="${c.href}" target="_blank">${c.title}</a><p>${c.time}</p></li>` 
					})
					addel.html(con)
				}
			})
			
			id.prepend(`<b>共${res.length}项</b><b>共${Math.ceil(res.length/12)}页</b>`)
		}
		/*两者切换*/
		$('.info_nav span').click(function(){
			if($(this).index() == 0){
				$(this).parent().removeClass('fcur')
			}else{
				$(this).parent().addClass('fcur')
			}
			$(this).addClass('cur').siblings().removeClass('cur')
			$('.info_main>div').eq($(this).index()).show().siblings().hide()
		})
	})();
	/*基本数据*/
	(function(){
		$('.tnext').hide()
		var num = 0;
		$('.tprev').click(function(){
			var shownum = Math.round($(this).siblings('.twrap').find('ul').length/($(this).siblings('.twrap').width()/$(this).parent().width()))
			num = num >= $(this).siblings('.twrap').find('ul').length -shownum ?   $(this).siblings('.twrap').find('ul').length-shownum:++num
			var left =  num * -$(this).siblings('.twrap').width()/$(this).siblings('.twrap').find('ul').length
			$(this).siblings('.twrap').animate({marginLeft:left})
			if(num==0){
				$(this).parent().find('.tnext').hide()
			}else{
				$(this).parent().find('.tnext').show()
			}
   			if(num == $(this).siblings('.twrap').find('ul').length-shownum){
				$(this).parent().find('.tprev').hide()
			}else{
				$(this).parent().find('.tprev').show()
			}
		})
		$('.tnext').click(function(){
			var shownum = Math.round($(this).siblings('.twrap').find('ul').length/($(this).siblings('.twrap').width()/$(this).parent().width()))
			num = num <= 0 ?  0 : -- num
			var left =  num * -$(this).siblings('.twrap').width()/$(this).siblings('.twrap').find('ul').length
			$(this).siblings('.twrap').animate({marginLeft:left})
			if(num==0){
				$(this).siblings('.tnext').hide()
			}else{
				$(this).siblings('.tnext').show()
			}
   			if(num == $(this).siblings('.twrap').find('ul').length-shownum){
				$(this).parent().find('.tprev').hide()
			}else{
				$(this).parent().find('.tprev').show()
			}
		})
	})();
	
	/*固定导航的出现与消失*/
	$(window).scroll(function(){
		if($(window).scrollTop() >= 300){
			$('.fix_nav').fadeIn(1000)
		}else{
			$('.fix_nav').fadeOut(1000)
		}
	});
	
	/*投资者问答*/
	(function(){
		var point = location.search.substr(-1,1)
		$.ajax({
			url : 'question.json',
			async : true,
			success : function(res){
				var keys = ''
				res.slice(1).forEach(function(o,i){
					keys += `<a href="investor_ask.html?type=${i+1}">${o.type}</a>`
				})
				$('.ask_keys').append(keys)
				if(point==''){
					var li = ''
					res[0].question.forEach(function(v,i){
						li += `<li><h5>${v.ask}</h5><p>${v.answer}</p></li>`
					})
					$('.ask_bottom').html(`<h2>${res[0].type}</h2><ul>${li}</ul>`)
				}else{
					var li = ''
					res[point].question.forEach(function(v,i){
						li += `<li><h5>${v.ask}</h5><p>${v.answer}</p></li>`
					})
					$('.ask_bottom').html(`<h2>${res[point].type}</h2><ul>${li}</ul>`)
				}
				$('.ask h5').click(function(){
					$(this).siblings('p').slideToggle().parent().siblings().find('p').slideUp()
				})
				$('.ask_keys a').click(function(){
					$('.ask_search input').val($(this).html())
				})
				$('.ask_search button').click(function(){
					var result = res.slice(1).some(function(o,i){
						return $('.ask_search input').val() == o.type
					})
					if(result){
						window.location.href = `investor_ask.html?type=${i+1}`
					}else if($('.ask_search input').val() == ''){
						window.location.href = 'investor_ask.html'
					}else{
						$('.ask_bottom').html(`<h2>${$('.ask_search input').val()}</h2>`)
					}
				})
			}
		})
	})();
})