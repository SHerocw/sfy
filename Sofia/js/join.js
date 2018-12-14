$(function(){
	/*加载头部*/
	$('header').load('common.html header');
	/*加载底部*/
	$('footer').load('common.html footer');
	/*加载固定定位*/
	$('.side_nav').load('common.html .side_nav', function() {
		$('body').append('<script src="js/common.js"><\/script>')
	});
	
	(function(){
		var num = location.hash.substr(1,1)
		$.ajax({
			type:"get",
			url:"jobs.json",
			success : function(res){
				if($('.common').attr('design')=='ajax'){
					$('.post_name').append(res[num].post)
					$('.post_info li:nth-child(1)').append(res[num].company)
					$('.post_info li:nth-child(2)').append(res[num].depart)
					$('.post_info li:nth-child(3)').append(res[num].address)
					$('.post_info li:nth-child(4)').append(res[num].jobtype)
					$('.post_info li:nth-child(5)').append(res[num].time)
					var con = ''
					res[num].content.forEach(function(p,i){
						con += `<p><b>${i+1}.</b>${p}</p>`
					})
					$('.post_con').append(con)
					var req = ''
					res[num].require.forEach(function(p,i){
						req += `<p><b>${i+1}.</b>${p}</p>`
					})
					$('.post_req').append(req)
				}	
				if($('.table_info').attr('design')=='ajax1'){
					page(res)
					function page(arr){
						var info = '';
						arr.slice(0,10).forEach(function(o,i){
							info += `<ul class="row"><a href="join_post.html#${i}">
								<li class="col-xs-2">${o.type}</li>
								<li class="col-xs-3">${o.post}</li>
								<li class="col-xs-3">${o.company}</li>
								<li class="col-xs-2">${o.neednum}</li>
								<li class="col-xs-2">${o.address}</li>
							<a></ul>`
						})
						$('.each_info').html(info)
						$('#page9').pagination({
							totalData : arr.length,
							showData : 10,
							pageCount : arr.length/10,
							current: 1,
							prevContent : '上一页',
							nextContent : '下一页',
							keepShowPN: true,
							mode: 'fixed',
							count: 4,
							callback : function(i){
								$('#page9').prepend(`<b>共${arr.length}项</b><b>共${Math.ceil(arr.length/12)}页</b>`)
								var anotherarr = res.slice((i.getCurrent()-1)*10,i.getCurrent()*10)
								info = ''
								anotherarr.forEach(function(o,d){
									info += `<ul class="row"><a href="join_post.html#${10*(i.getCurrent()-1)+d+1}" target="_blank">
										<li class="col-xs-2">${o.type}</li>
										<li class="col-xs-3">${o.post}</li>
										<li class="col-xs-3">${o.company}</li>
										<li class="col-xs-2">${o.neednum}</li>
										<li class="col-xs-2">${o.address}</li>
									<a></ul>`
								})
								$('.each_info').html(info)
							}
						})
						$('#page9').prepend(`<b>共${arr.length}项</b><b>共${Math.ceil(arr.length/12)}页</b>`)
					}
					$('.ask_search span').click(function(){
						if($(this).html() == "全部"){
							page(res)
						}else{
							var index = []
							var arr1 = res.filter((o,i) =>{
								if($(this).html() == o.type){
									index.push(i)
								}
								return $(this).html() == o.type
							})
							page(arr1)
							index.forEach(function(n,i){
								$('.each_info ul').eq(i).find('a').attr('href','join_post.html#'+n)
							})
							
						}
					})
					$('.ask_search button').click(function(){
						var result = res.some(function(o,i){
							return $('.ask_search input').val() == o.type
						})
						if(result){
							var arr1 = res.filter((o,i) =>{
								return $(this).html() == o.type
							})
							page(arr1)
						}else{
							$('.each_info').html('')
							$('.page').html('')
						}
					})
				}
			}
		});
	})();
	
	$('.job_campus .left_nav p').click(function(){
		$(this).addClass('cur').siblings('p').removeClass('cur')
		$('.rea_detail>div').eq($(this).index()).show().siblings().hide()
	});
	
	$('.bus_nav li').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur')
		if($(this).index()<=1){
			$('.bus_area').show().find('img').eq($(this).index()).show().siblings().hide()
			$('.better span').html('')
			$('.bus_pro').hide().siblings('.bus').show()
			$('.fix_nav').removeClass('hide')
		}else if($(this).index()==2){
			$('.bus_pro').hide().siblings('.bus').show()
			$('.better span').html('招商加盟信息即将更新，敬请关注')
			$('.fix_nav').removeClass('hide')
		}else{
			$('.bus_pro').show().siblings('.bus').hide()
			$('.fix_nav').addClass('hide')
		}
	})
	
	/*表单*/
	$('.form_pro input').focus(function(){
		$(this).siblings('.first').attr('checked','checked');
		$(this).parent().siblings().find('input').attr('checked',false)
	})
	
	/*招商固定导航*/
	$(window).scroll(function(){
		if($(window).scrollTop() >= 300){
			$('.fix_nav').fadeIn(1000)
		}else{
			$('.fix_nav').fadeOut(1000)
		}
	});
})