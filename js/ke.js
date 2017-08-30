ke={
	html:'<div class="dia"><div class="ke-tip-title"></div><div class="ke-tip-message"></div><ul class="ke-tip-btn-group"></ul></div>',
	xwh:function(d){
		var w=$(window).width()/2-d.width()/2;
		var h=$(window).height()/2-d.height()/2;
		d.css({left:0,top:h});
		d.animate({left:w+'px'},50);
	},
	close:function(index){
		$('html').find('#ke-tip-'+index).remove();
	},
	load:function(){
		var id=new Date().getTime();
		$('html').append('<div id="ke-tip-'+id+'" class="ke-tip">'+ke.html+'</div>');
		var $dom=$('#ke-tip-'+id+':last');
		$dom.find('.dia').remove();
		$dom.append('<i id="loading" class="fa fa-spinner fa-3x fa-spin" style="position:absolute;color:#00FF33"></i>');
		ke.xwh($dom.find('#loading'));
		$dom.css({display:'none'});
		$dom.fadeIn(200);
		return id;
	},
	confirm:function(content,ok,no){
		var id=new Date().getTime();
		$('html').append('<div id="ke-tip-'+id+'" class="ke-tip">'+ke.html+'</div>');
		var $dom=$('#ke-tip-'+id+':last');
		$dom.find('.ke-tip-title').html('询问');
		$dom.find('.ke-tip-message').html(content);
		ke.xwh($dom.find('.dia'));
		$dom.find('.ke-tip-btn-group').append('<li><span id="no" class="btn">取消</span></li>');
		$dom.find('.ke-tip-btn-group').append('<li><span id="ok" class="btn">确定</span></li>');
		$dom.css({display:'none'});
		$dom.fadeIn(200);
		$dom.find('#no').on('click',function(){
			$dom.remove();
			if(no!==undefined) no();
		});
		$dom.find('#ok').on('click',function(){
			$dom.remove();
			if(ok!==undefined) ok();
		});
		return id;
	},
	msg:function(content,btn){
		var id=new Date().getTime();
		$('html').append('<div id="ke-tip-'+id+'" class="ke-tip">'+ke.html+'</div>');
		var $dom=$('#ke-tip-'+id+':last');
		$dom.find('.ke-tip-title').html('提示');
		$dom.find('.ke-tip-message').html(content);
		ke.xwh($dom.find('.dia'));
		$dom.find('.ke-tip-btn-group').append('<li><span id="ok" class="btn">确定</span></li>');
		$dom.css({display:'none'});
		$dom.fadeIn(200);
		$dom.find('#ok').on('click',function(){
			$dom.remove();
			if(btn!==undefined) btn();
		});
		return id;
	},
	ajax:function(option){
		var load=ke.load();
		option.complete=function(){
			ke.close(load);
		};
	    option.datatype=option.datatype===undefined ? 'json' : option.datatype;
	    option.timeout=option.timeout===undefined ? 15000 : option.timeout;
		$.ajax(option);
	}
};
