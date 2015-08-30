(function(doc){
		var ajax = function(json) {
			var xhr = null,
				data = json['data'] ? json['data'] : null;
			if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
			if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHttp");
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var response = xhr.responseText;
					json['success'](response);
				}
			}
			xhr.open(json['method'], json['url']);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
			xhr.send();
		};
		window.onload = function(){
			ajax({
					url: "http://kaohe.zeroling.com/kaohe/list",
					method: 'POST',
					success: function(response) {
						var obj = JSON.parse(response),
						text = obj.data,
						list = document.querySelectorAll("li");
						console.log(text);
						for(var i = 0, len = text.length; i < len; i++){
							//店名
							var store = list[i].querySelector(".title");
							store.innerHTML = text[i].title;

							
							//店的图片
							var img = list[i].querySelector(".view"),
							source = text[i].imgUrl;
							img.setAttribute("src", source);

							//人均
							var ave = list[i].querySelector(".average");
							ave.innerHTML = text[i].average;

							//折扣
							var dis = list[i].querySelector(".dis-num");
							dis.innerHTML = text[i].discount;

							//星
							var star = list[i].querySelector(".stars"),
							width = parseInt(text[i].stars)/5*6;
							star.style.width = width + "rem";

							//朋友
							var peo = list[i].querySelector(".peo-num");
							peo.innerHTML = text[i].people;

							//距离
							var distant = list[i].querySelector(".distance");
							distant.innerHTML = text[i].distance;

							//点赞
							var good = list[i].querySelector(".good");
							
							if(text[i].good === 0){
								good.style.display = "none";
							}else{
								good.style.display = "block"
							}

							
							//flag 跪了
							var qiang = list[i].querySelector(".qiang"),
							xue = list[i].querySelector(".xue"),
							pingpai = list[i].querySelector(".pingpai"),
							flag = text[i].flag;

							if(flag.search("qiang") !== -1){
								qiang.innerHTML += '<img src="img/qiang.png">';
							}
							if(flag.search("xue") !== -1){
								qiang.innerHTML += '<img src="img/xue.png">';
							}
							if(flag.search("pingpai") !== -1){
								qiang.innerHTML += '<img src="img/pingpai.png">';
							}
				
						}
					}
				});
			}
	})(document);