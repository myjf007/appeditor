function AppEdit (el){
    this._init_(el);
}

AppEdit.prototype = {
    constructor : AppEdit,
    _init_ : function(info) {
		this.barsbox = "<div class='bars-box ng-hide' class='addModulesBars'><div class=bars-box-justify style='top: auto; left: 726px;'><div class=bars-box-position><div class=bars-box-arrow></div><div class='cancleAdd' ng-click='cancleAdd()' class=cancleAdd></div><p class='bars-box-title ng-binding'>+添加模块</p><div class='select-modules-bars clear' id=select-modules-bars><ul class=add-module-box><li class='onClickAddText'><div class=add-text-btn></div>文字<li class=upload-button ng-click='onClickAddImage($event)'><input id=upImage type=file multiple><div class=add-image-btn></div>图片<!--<li ng-click='onClickAddVedio()'><div class=add-video-btn></div>视频<li class='onClickAddGoods'><div class=add-good-btn></div>商品<li class='onClickAddLine'><div class=add-line-gap-btn></div>分割线--></ul></div></div></div><div class=bars-box-back class='cancleAdd'></div></div>";
		this.emptycontent	 = "<div class='empty-content ng-hide' ng-show='diary.length == 0&amp;&amp;!model_tips'>详情目前为空</div>";
		this.itemstart = "<div class='click-item item ng-scope' ng-repeat='module in diary track by $index' ng-show='diary.length > 0'><div ng-switch=module.type id=module1507179294205na3cmjwug1l><div ng-switch-when=2 class='model-box ";
		this.itemstart_append = " ng-scope' ng-class='hover[module.id]?'hover':''' ng-mousedown='closeIn($event)' ng-mouseover='hoverIndex(module.id)' ng-mouseleave='hoverIndex(-1)'>";
		this.itemend = "<div class='note-ope ng-hide' ng-show='(hover[module.id]&amp;&amp;!move) || (opora[module.id]&amp;&amp;move)'><div class=add-btn ng-mousedown='model_insert($index,$event,module.id)'></div><div class=move-up ng-mousedown='model_move($index,$event,-1,module.id)' ng-show='$index>0'></div><div class='move-down ng-hide' ng-mousedown='model_move($index,$event,1,module.id)' ng-show='$index < diary.length-1'></div><div class=note-del ng-mousedown='model_delete($index)'></div></div></div><div class='choice-tips choice-bottom ng-hide' ng-mousedown='stopPro($event)' ng-show='$index == curInsertIndex'></div></div></div>";
		this.barsend = "<div ng-click='model_insert(-1,$event,diary[diary.length-1].id)' class='addModulesbtn'>+添加模块</div>";

    	var id = info.el || '#editor_id';
	    var name = info.name || 'appEdit' ;
		var json = info.data || '';

		var self = this;

		self.info = info;
		var data = [];
		this.name = name;
		this.id = id = (id + " ");
		
		if(json != '') {
		   json = json.replace("\r\n", "<br>");
		   json = json.replace(/\\r\n/g, "<br>");
		   json = json.replace(/\r/ig, "").replace(/\n/ig,"");
		   
		   data=eval("("+json+")");  
		}
		
		$(id).addClass('cpc-diary-edit ng-isolate-scope ng-not-empty ng-valid ng-dirty ng-valid-parse');
		
		var html = self.barsbox;
		html += '<div class="editor-list"><div id="ueditor" style="padding-bottom: 10px;"><div class="diary-list">' + self.emptycontent;
		
		for(var i=0;i<data.length;i++){
			if(data[i].text != undefined) {
				html += this.bytext(data[i].text);
			} else if(data[i].image != undefined) {
				html += this.byimage(data[i].image);
			}
		}
		
		html += "</div>";
		html += "</div>";
		html += self.barsend;
		html += "</div>";
		html += "</div>";
		html += "</div>";
		html += "</div>";
		html += "</div>";
		
		$(id).append(html);
		
		
		$(self.id + ".onClickAddText").click(function() {
			$(self.id + ".click-item .choice-bottom:not(.ng-hide)").parent().parent().parent('.click-item').replaceWith(self.bytext(" "))
			
			$(self.id + ".addModulesBars").addClass('ng-hide');
			$(self.id + '.bars-box').addClass('ng-hide');
			
			$("body").removeClass('modal-open');
			self.init();
			self.add_after();
		});

			
		$(self.id + ".addModulesbtn").click(function() {
			$("body").addClass('modal-open');
			$(this).after("<div class='mark addModulesBars' ng-show='addModulesBars'></div>");
			$(self.id + '.bars-box').removeClass('ng-hide');
			$(self.id + '.empty-content').addClass('ng-hide');


			var append = self.itemstart + " text-model-wrapper " + self.itemstart_append + "<div class='choice-tips choice-bottom' ng-mousedown='stopPro($event)' ></div>" +  self.itemend;
			$(self.id + ".diary-list").append(append);

			self.set_top(0);
		});
		
		$(self.id + ".cancleAdd").click(function() {
			$(self.id + ".bars-box-back").mousedown();
		});		

		$(self.id + ".model-box").hover(function() {
			$(this).addClass('hover');
			if($(self.id + '.click-item').length == 1) {
				$(self.id + '.click-item').first().find('.note-ope').find('.move-down').addClass('ng-hide');
				$(self.id + '.click-item').first().find('.note-ope').find('.move-up').addClass('ng-hide');
			} else {
				$(self.id + '.click-item').first().find('.note-ope').find('.move-down').removeClass('ng-hide');
				$(self.id + '.click-item').first().find('.note-ope').find('.move-up').addClass('ng-hide');
				$(self.id + '.click-item').not($('.click-item').first()).not($('.click-item').last()).find('.note-ope').find('.move-down').removeClass('ng-hide');
				$(self.id + '.click-item').not($('.click-item').first()).not($('.click-item').last()).find('.note-ope').find('.move-up').removeClass('ng-hide');
				$(self.id + '.click-item').last().find('.note-ope').find('.move-up').removeClass('ng-hide');
				$(self.id + '.click-item').last().find('.note-ope').find('.move-down').addClass('ng-hide');
			}

			$(this).find('.note-ope').removeClass('ng-hide');	
		});
		
		$(self.id + ".move-down").mousedown(function() {
			var current = $(this).parent().parent().parent().parent('.click-item');
			var next = $(current).next(".click-item");
	
			$(next).insertBefore(current);
		});
		
		$(self.id + ".move-up").mousedown(function() {
			var current = $(this).parent().parent().parent().parent('.click-item');
			var prev = $(current).prev(".click-item");
			
			$(prev).insertAfter(current);
		});
		
		$(self.id + ".model-box").mouseleave(function() {
			$(this).find('.note-ope').addClass('ng-hide');
			$(this).removeClass('hover');
		});
		
		$(self.id + ".note-del").mousedown(function() {
			if(self.info.del != undefined) {
				if(self.info.del()) 
				  $(this).parent().parent().parent().parent('.click-item').remove();	
			} else if(confirm("是否删除该模块")) 
				$(this).parent().parent().parent().parent('.click-item').remove();

			if($(".click-item").length <= 0) {$('.empty-content').removeClass('ng-hide');}
			self.add_after();
		});
		
		$(self.id + ".bars-box-back").mousedown(function() {
			$(".click-item .choice-bottom:not(.ng-hide)").parent().parent().parent('.click-item').remove()
			$(".addModulesBars").addClass('ng-hide');
			$('.bars-box').addClass('ng-hide');
			
			$("body").removeClass('modal-open');
		});
		
		$(self.id + ".textarea").removeClass('txt-show-area');
		$(self.id + ".textarea").blur(function() {
			$(this).removeClass('removeClass');	
			$(this).prev('.moni-textarea').text($(this).val());
			$(this).next('input').val($(this).val());
		});
			
		$(self.id + ".moni-textarea").click(function() {
			$(this).next('.textarea').addClass('txt-show-area');	
			$(this).next('.textarea').val($(this).text());
			$(this).next('input').val($(this).text());
		});
		
		$(self.id + ".add-btn").mousedown(function() {
			var current = $(this).parent().parent().parent().parent('.click-item');
			$("body").addClass('modal-open');
			$(this).after("<div class='mark addModulesBars' ng-show='addModulesBars'></div>");
			$('.bars-box').removeClass('ng-hide');
			$('.empty-content').addClass('ng-hide');

			

			var append = self.itemstart + " text-model-wrapper " + self.itemstart_append + "<div class='choice-tips choice-bottom' ng-mousedown='stopPro($event)' ></div>" +  self.itemend;
			$(current).after(append);

			self.set_top(current);
		});
		
		

		$(id + '#ueditor').hover(function(e) {
			self.unScroll();
			//$('body').addClass("modal-open-1");
		},function(e){
			self.removeUnScroll();
			//$('body').removeClass("modal-open-1");	
		});

		if(data.length <= 0) {$(self.id + '.empty-content').removeClass('ng-hide');}	
    },
    unScroll : function() {
        var top = $(document).scrollTop();
        $(document).on('scroll.unable',function (e) {
            $(document).scrollTop(top);
        })
    },
    removeUnScroll : function() {
    	$(document).unbind("scroll.unable");
    },
	byimage : function($val) {
		var hidden = "<input name='" + this.name + "[][image]" + "' value='" + $val + "' type='hidden'/>";
		if(this.info.debug == undefined || this.info.debug == true)
			console.log(hidden);
		return this.itemstart + " image-model-wrapper " + this.itemstart_append + "<div class='img-loading ng-hide' ng-show='diary[$index].loading'><img src=https://s.geilicdn.com/CPC/item/201709/images/loading.50c5e3e7.gif></div>" + "<img ng-src='https://si.geilicdn.com/bj-pc_diary-900906851-1507182255641-1819123877_222_222.jpg?w=222&amp;h=222' onerror='imgOnError(this)' ondragstart='return false' src='" + $val + "'>" + hidden+ this.itemend;
	},
	bytext : function($val) {
		var hidden = "<input name='" + this.name + "[][text]" + "' value='" + $val + "' type='hidden'/>";
		if(this.info.debug != undefined || this.info.debug == true)
			console.log(hidden);
		return this.itemstart + " text-model-wrapper " + this.itemstart_append +  "<div class='moni-textarea ng-binding' data-id=0 ng-bind-html='htmlDecode(module.text)'>" + $val + '</div>' + "<textarea id='textareaNumber0' class='textarea ng-pristine ng-valid ng-not-empty ng-touched' ng-class='txt-show-area' ng-blur='noEdit($index)' ng-mousedown='stopPro($event)' ng-model='module.text'>" + $val + "</textarea>" + hidden + this.itemend;
	},
	textafter : function() {
		$(self.id + ".click-item .choice-bottom:not(.ng-hide)").parent().parent().parent('.click-item').replaceWith(this.bytext($val))

		$(self.id + ".addModulesBars").addClass('ng-hide');
		$(self.id + '.bars-box').addClass('ng-hide');
		$("body").removeClass('modal-open');

		this.init();
		this.add_after();
	},
	uploadafter : function($val) {
		var self = this;
		$(self.id + ".click-item .choice-bottom:not(.ng-hide)").parent().parent().parent('.click-item').replaceWith(this.byimage($val))

		$(self.id + ".addModulesBars").addClass('ng-hide');
		$(self.id + '.bars-box').addClass('ng-hide');
		$("body").removeClass('modal-open');

		this.init();
		this.add_after();


	},
	uploadbutton : function(obj) {
		return $(this.id + ".add-image-btn")
	},
	init : function() {
	 	var self = this;
		$(self.id + ".model-box").unbind('hover');
		$(self.id + ".model-box").unbind('mouseleave');
		$(self.id + ".note-del").unbind('mousedown');
		
		$(self.id + ".model-box").hover(function() {
			$(this).find('.note-ope').removeClass('ng-hide');
			$(this).addClass('hover');
			
			self.init();
		});
		
		$(self.id + ".model-box").mouseleave(function() {
			$(this).find('.note-ope').addClass('ng-hide');
			$(this).removeClass('hover');
			
			self.init();
		});
		
		$(self.id + ".note-del").mousedown(function() {
			if(self.info.del != undefined) {
				if(self.info.del())
				  $(this).parent().parent().parent().parent('.click-item').remove();
			} else if(confirm("是否删除该模块")) 
				$(this).parent().parent().parent().parent('.click-item').remove();
			
			self.init();
			self.add_after();
			if($(self.id + ".click-item").length <= 0) {$('.empty-content').removeClass('ng-hide');}
		});
		
		
	},
	set_top : function(current) {

		var self = this;
		var has = 1;
		if(current) {
			var top = 0;
			$(self.id + ".click-item").each(function() {
				top += $(this).height() 
				has++;
				if($(this).is(current)) {
				   return false;	
				}
			});
			top += 30;
		} else {
			var top = $(self.id + ".diary-list").height() - 100;	
			$("#ueditor").animate({scrollTop: top}, 0);
		}
		
		if(top >= $("#ueditor")[0].offsetHeight) {

			if($(self.id + ".click-item").length == has) {
				var scrollTop = $("#ueditor").scrollTop() + $(".click-item .choice-bottom:not(.ng-hide)").parent().parent().parent('.click-item').height() + 20;
				$("#ueditor").animate({scrollTop: scrollTop}, 0);
			}			
			top = top - $("#ueditor").scrollTop() + 30;
		} else {
			$("#ueditor").animate({scrollTop: 0}, 0);
		}

		$(self.id + ".bars-box-justify").attr('style',"top: " + top + "px;left: " + ($("#ueditor").offset().left + $("#ueditor").width()) + "px;");
	},		
	add_after : function() {
		var self = this;
		$(self.id + ".add-btn").unbind('mousedown');
		$(self.id + ".move-up").unbind('mousedown');
		$(self.id + ".move-down").unbind('mousedown');
		$(self.id + ".textarea").unbind('blur');
		$(self.id + ".moni-textarea").unbind('click');
		
		if($(self.id + '.click-item').length == 1) {
			$(self.id + '.click-item').first().find('.note-ope').find('.move-down').addClass('ng-hide');
			$(self.id + '.click-item').first().find('.note-ope').find('.move-up').addClass('ng-hide');
		} else {
			$(self.id + '.click-item').first().find('.note-ope').find('.move-down').removeClass('ng-hide');
			$(self.id + '.click-item').first().find('.note-ope').find('.move-up').addClass('ng-hide');
			$(self.id + '.click-item').not($('.click-item').first()).not($('.click-item').last()).find('.note-ope').find('.move-down').removeClass('ng-hide');
			$(self.id + '.click-item').not($('.click-item').first()).not($('.click-item').last()).find('.note-ope').find('.move-up').removeClass('ng-hide');
			$(self.id + '.click-item').last().find('.note-ope').find('.move-up').removeClass('ng-hide');
			$(self.id + '.click-item').last().find('.note-ope').find('.move-down').addClass('ng-hide');
		}

		$(self.id + ".move-down").mousedown(function() {
			var current = $(this).parent().parent().parent().parent('.click-item');
			var next = $(current).next(".click-item");
			$(next).insertBefore(current);
			
			
			self.add_after();

		});
		
		$(".move-up").mousedown(function() {
			var current = $(this).parent().parent().parent().parent('.click-item');
			var prev = $(current).prev(".click-item");
			$(prev).insertAfter(current);
			
			
			
			self.add_after();
	
		});
		
		$(self.id + ".add-btn").mousedown(function() {
			var current = $(this).parent().parent().parent().parent('.click-item');
			
			$("body").addClass('modal-open');
			$(this).after("<div class='mark addModulesBars' ng-show='addModulesBars'></div>");
			$(self.id + '.bars-box').removeClass('ng-hide');
			$(self.id + '.empty-content').addClass('ng-hide');
			
			

			var append = self.itemstart + " text-model-wrapper " + self.itemstart_append + "<div class='choice-tips choice-bottom' ng-mousedown='stopPro($event)' ></div>" +  self.itemend;
			$(current).after(append);
				
			self.add_after();
		
			self.set_top(current);

		});
		
		$(self.id + ".textarea").blur(function() {
			$(this).removeClass('txt-show-area');
			
			$(this).prev('.moni-textarea').text($(this).val());
			$(this).next('input').val($(this).val());
			self.add_after();	
		});
		
		$(self.id + ".moni-textarea").click(function() {
			$(this).next('.textarea').addClass('txt-show-area');	
			$(this).next('.textarea').val($(this).text());
			
			self.add_after();	
		});
		
	}
}