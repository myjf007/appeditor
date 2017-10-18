/*! AppEdit v1.1.0 github https://github.com/chenbei360/appeditor */
function AppEdit (el){
    this._init_(el);
}

AppEdit.prototype = {
    constructor : AppEdit,
    _init_ : function(info) {
		this.barsbox = "<div class='bars-box ng-hide' class='addModulesBars'><div class=bars-box-justify style='top: auto; left: 726px;'><div class=bars-box-position><div class=bars-box-arrow></div><div class='cancleAdd' class=cancleAdd></div><p class='bars-box-title ng-binding'>+添加模块</p><div class='select-modules-bars clear' id=select-modules-bars><ul class=add-module-box><li class='onClickAddText'><div class=add-text-btn></div>文字<li class=upload-button><form enctype='multipart/form-data' id='uploadForm' style='margin: 0em;'><input id=upImage type=file multiple></form><div class=add-image-btn></div>图片<!--<li ng-click='onClickAddVedio()'><div class=add-video-btn></div>视频<li class='onClickAddGoods'><div class=add-good-btn></div>商品<li class='onClickAddLine'><div class=add-line-gap-btn></div>分割线--></ul></div></div></div><div class=bars-box-back class='cancleAdd'></div></div>";
		this.emptycontent	 = "<div class='empty-content ng-hide'>详情目前为空</div>";
		this.itemstart = "<div class='click-item item ng-scope'><div><div class='model-box ";
		this.itemstart_append = " ng-scope'>";
		this.itemend = "<div class='note-ope ng-hide'><div class=add-btn></div><div class=move-up></div><div class='move-down ng-hide'></div><div class=note-del></div></div></div><div class='choice-tips choice-bottom ng-hide'></div></div></div>";
		this.barsend = "<div class='addModulesbtn'>+添加模块</div>";

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
			var current = $(self.id + ".click-item .choice-bottom:not(.ng-hide)").parent().parent('.click-item');
			$(current).find('.choice-bottom').addClass('ng-hide');
			current.after(self.bytext(" "));
			$(self.id + ".addModulesBars").addClass('ng-hide');
			$(self.id + '.bars-box').addClass('ng-hide');
			$(self.id + '.bars-box').addClass('ng-hide');
			

			$("body").removeClass('modal-open');
			self.init();
			self.add_after();
		});

			
		$(self.id + ".addModulesbtn").click(function() {
			$("body").addClass('modal-open');
			$(this).after("<div class='mark addModulesBars'></div>");
			$(self.id + '.bars-box').removeClass('ng-hide');
			$(self.id + '.empty-content').addClass('ng-hide');

			var append = self.itemstart + " text-model-wrapper " + self.itemstart_append +  self.itemend;

			$(self.id + ".diary-list").prepend(append);
			$(self.id + ".diary-list .click-item").first().find('.choice-bottom').removeClass("ng-hide");
			var current = $(self.id + ".click-item .choice-bottom:not(.ng-hide)").parent().parent('.click-item');

			$("#ueditor").animate({scrollTop: 0}, 0);
			self.set_top(current);
		});


		$(self.uploadbutton()).change(function(e) {
			
			$(self.id + '.bars-box').addClass('ng-hide');
			$("body").removeClass('modal-open');
			$(self.id + ".addModulesBars").addClass('ng-hide');

			var current;
			var length = this.files.length;
			if(!current || current == undefined) {
				current = obj = $(self.id + ".click-item .choice-bottom:not(.ng-hide)").parent().parent('.click-item');	
				$(current).find('.choice-bottom').addClass('ng-hide');	
  			}		
			
			for (var i = 0; i < length; i++) {
				$(current).after(self.itemstart + " image-model-wrapper " + self.itemstart_append + "<div class='img-loading'><img src=https://s.geilicdn.com/CPC/item/201709/images/loading.50c5e3e7.gif></div>" + self.itemend);
				self.init();
				self.add_after();
				current = $(current).next();

				self.info.imageupload != undefined  ? self.info.imageupload(this.files[i],current) : self.showImage(this.files[i],current); 
			}

			//清空
			$(self.uploadbutton()).val("");
		});


		$(self.id + ".cancleAdd").click(function() {
			$(self.id + ".bars-box-back").mousedown();
		});		

		$(self.id + ".upload-button").click(function() {
			document.getElementById("upImage").click();
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
			$(".click-item .choice-bottom:not(.ng-hide)").addClass('ng-hide');
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
			$(this).after("<div class='mark addModulesBars'></div>");
			$('.bars-box').removeClass('ng-hide');
			$('.empty-content').addClass('ng-hide');

			$(current).find('.choice-tips').removeClass('ng-hide');
			
			//var append = self.itemstart + " text-model-wrapper " + self.itemstart_append + "<div class='choice-tips choice-bottom'  ></div>" +  self.itemend;
			//$(current).after(append);

			self.set_top(current);
		});
		
		

		$(id + '#ueditor').hover(function(e) {
			self.unScroll();
		},function(e){
			self.removeUnScroll();
		});

		if(data.length <= 0) {$(self.id + '.empty-content').removeClass('ng-hide');}	
    },
    showImage : function(file,current) {
    	var self = this;
		var reader = new FileReader();  
        reader.readAsDataURL(file);
    	reader.onload = function(e){
    		self.uploadafter(e.target.result,current);  
		}
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
		
		this.log(hidden);
		return this.itemstart + " image-model-wrapper " + this.itemstart_append + "<div class='img-loading ng-hide'><img src=https://s.geilicdn.com/CPC/item/201709/images/loading.50c5e3e7.gif></div>" + "<img ng-src='https://si.geilicdn.com/bj-pc_diary-900906851-1507182255641-1819123877_222_222.jpg?w=222&amp;h=222' onerror='imgOnError(this)' ondragstart='return false' src='" + $val + "'>" + hidden+ this.itemend;
	},
	bytext : function($val) {
		var hidden = "<input name='" + this.name + "[][text]" + "' value='" + $val + "' type='hidden'/>";
		
		this.log(hidden);
		return this.itemstart + " text-model-wrapper " + this.itemstart_append +  "<div class='moni-textarea ng-binding'>" + $val + '</div>' + "<textarea id='textareaNumber0' class='textarea ng-pristine ng-valid ng-not-empty ng-touched' >" + $val + "</textarea>" + hidden + this.itemend;
	},
	textafter : function() {
		$(self.id + ".click-item .choice-bottom:not(.ng-hide)").parent().parent().parent('.click-item').replaceWith(this.bytext($val))

		$(self.id + ".addModulesBars").addClass('ng-hide');
		$(self.id + '.bars-box').addClass('ng-hide');
		$("body").removeClass('modal-open');

		this.init();
		this.add_after();
	},
	uploadafter : function($val,current) {
		var self = this;
		$(current).removeClass('ng-hide');
		$(current).replaceWith(self.byimage($val));
		this.init();
		this.add_after();	
	},
	uploadbutton : function(obj) {
		return $(this.id + "#upImage")
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
				self.info.del();
			} else if(confirm("是否删除该模块")) 
				$(this).parent().parent().parent().parent('.click-item').remove();
			
			self.init();
			self.add_after();
			if($(self.id + ".click-item").length <= 0) {$('.empty-content').removeClass('ng-hide');}
		});
		
		
	},
	set_top : function(current) {
		var self = this;
		var has = 0;
		if(current) {
			var top = 0;
			$(self.id + ".click-item").each(function() {
				top += $(this).outerHeight();
				has++;
				if($(this).is(current)) {
				   return false;	
				}
			});
		} 
		if($(self.id + ".click-item").length == has) 
			$("#ueditor").animate({scrollTop: top}, 0);

		top = top - $("#ueditor").scrollTop();
		top -= 60;
		$(self.id + ".bars-box-justify").attr('style',"top: " + top + "px;left: " + ($("#ueditor").offset().left + $("#ueditor").outerWidth() + 21) + "px;");
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
			$(this).after("<div class='mark addModulesBars'></div>");
			$(self.id + '.bars-box').removeClass('ng-hide');
			$(self.id + '.empty-content').addClass('ng-hide');
			
			
			$(current).find('.choice-tips').removeClass('ng-hide');
			//var append = self.itemstart + " text-model-wrapper " + self.itemstart_append + "<div class='choice-tips choice-bottom'  ></div>" +  self.itemend;
			//$(current).after(append);
				
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
		
	},
	log : function(data) {
		if(this.info.debug == true) 
		{
			console.log(data);
		}
	},
	/********************
	 * 取窗口滚动条高度 
	 ******************/
	getScrollTop : function ()
	{
	    var scrollTop=0;
	    if(document.documentElement&&document.documentElement.scrollTop)
	    {
	        scrollTop=document.documentElement.scrollTop;
	    }
	    else if(document.body)
	    {
	        scrollTop=document.body.scrollTop;
	    }
	    return scrollTop;
 	},
	/********************
	 * 取窗口可视范围的高度 
	 *******************/
	getClientHeight : function ()
	{
	    var clientHeight=0;
	    if(document.body.clientHeight&&document.documentElement.clientHeight)
	    {
	        var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;        
	    }
	    else
	    {
	        var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;    
	    }
	    return clientHeight;
	},
	/********************
	 * 取文档内容实际高度 
	 *******************/
	getScrollHeight : function()
	{
	    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
	}
}
