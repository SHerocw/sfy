$(function(){
	/*搜索框的点击出现与消失*/
	(function(){
		var flag = false;
		$('.search i').click(function(){
			flag = !flag
			if(flag){
				$('.search input').stop().animate({width:230})
			}else{
				$('.search input').stop().animate({width:0})
			}
		})
	})();
	/*导航内容*/
	$.ajax({
		url:"common_nav.json",
		async:false,
		success : function(res){
			/*顶部导航*/
			res.slice(0,-1).forEach(function(v,i){
				var div = '';
				var ul = '';
				var li = '';
				var dd = '';
				var dl = ''
				if(v.main){
					v.main.forEach(function(sub,i){
						 li += `<li><i></i><b></b><a href="${sub.href}" class="each_link">${sub.subtitle}</a></li>`
						 dd += `<dd><a href=${sub.href}>${sub.subtitle}</a><dd>`
					})
					ul = `<ul>${li}</ul>`
					dl = `<dl>${dd}</dl>`
				}
				div = `<div><a href="${v.path}" class="nav_text">${v.title}<span></span></a>${ul}</div>`
				$('.nav_bottom').append(div)
				var menu = `<li><div class="list-group-item">${v.title}</div>${dl}</li>`;
				$('.menu').append(menu)
			})
			$('.navx .menu_btn').click(function(){
				$('.menu_wrap').show()
				$('.menu_wrap .menu').animate({width:'93%'})
			})
			$('.menu_wrap img').click(function(){
				$('.menu_wrap').hide(300)
			})
			/*底部循环*/
			res.slice(1).forEach(function(v,i){
				var dd = '';
				var dl = '';
				v.main.forEach(function(sub,i){
					 dd += `<dd><a href="${sub.href}">${sub.subtitle}</a></dd>`
				})
				dl = `<dl><dt>${v.title}</dt>${dd}</dl>`
				$('.footer').append(dl)
			})
			$('.menu .list-group-item').click(function(){
				$(this).siblings().slideToggle().parents('li').siblings().find('dl').hide()
			})
			$('.menu li:first').find('.list-group-item').wrap('<a href="index.html"><a>')
		}
	});
	
	/*右侧固定导航*/
	(function(){
		/*联系鼠标经过效果*/
		$('.tel').hover(function(){
			$('.telway').fadeIn()
		},function(){
			$('.telway').fadeOut()
		});
		/*置顶效果*/
		$('.gotop').click(function(){
			$('html,body').animate({scrollTop:0})
		})
	})();
	
	/*初始化wow*/
	var wow = new WOW({
	 　　animateClass: 'animated',
	 	offset: 200
	 });
	 wow.init();
})
