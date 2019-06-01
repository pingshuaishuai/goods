;(function($){
    "use strict";

    class Display{
        constructor(){
            this.url = "http://localhost/ztt/goods/public/data/goods.json";
            this.sel = document.querySelector(".selected .se-bottom");
            this.spi = document.querySelector(".spike .se-bottom");
            this.wom = document.querySelector(".women .se-bottom");
            this.men = document.querySelector(".men .se-bottom");
            this.init();
        }
        // ajax获取goods.json中的商品数据
        init(){
            var that = this;
            ajax({
                url:this.url,
                success:function(res){
                    that.res = JSON.parse(res);
                    that.disSel();
                    that.disSpi();
                    that.disWom();
                    that.disMen();
                }
            })
        }
        // 渲染精品品牌商品列表
        disSel(){
            let str = "";
            for(var i = 0;i < this.res.length;i++){
                if(this.res[i].title == "jingpin"){
                    for(var j = 0;j < this.res[i].shop.length;j++){
                        str +=`<img src="${this.res[i].shop[j].src}">`
                    }
                }
                this.sel.innerHTML = str;
            }
        }
        // 渲染打折页面商品列表
        disSpi(){
            let str2 = "";
            for(var i = 0;i < this.res.length;i++){
                if(this.res[i].title == "dazhe"){
                    for(var j = 0;j < this.res[i].shop.length;j++){
                        str2 +=`<div class="seckill">
                        <img src="${this.res[i].shop[j].src}">
                        <span>100</span>
                        <p>shgjklkjhgfdsfghj</p>
                    </div>`
                    }
                }
                this.spi.innerHTML = str2;
            }
        }
        // 渲染女装
        disWom(){
            let str2 = "";
            for(var i = 0;i < this.res.length;i++){
                if(this.res[i].title == "women"){
                    for(var j = 0;j < this.res[i].shop.length;j++){
                        str2 +=`<div class="seckill">
                        <img src="${this.res[i].shop[j].src}">
                        <span>100</span>
                        <p>shgjklkjhgfdsfghj</p>
                    </div>`
                    }
                }
                this.wom.innerHTML = str2;
            }
        }
        // 渲染男装
        disMen(){
            let str2 = "";
            for(var i = 0;i < this.res.length;i++){
                if(this.res[i].title == "men"){
                    for(var j = 0;j < this.res[i].shop.length;j++){
                        str2 +=`<div class="seckill">
                        <img src="${this.res[i].shop[j].src}">
                        <span>100</span>
                        <p>shgjklkjhgfdsfghj</p>
                    </div>`
                    }
                }
                this.men.innerHTML = str2;
            }
        }
    }
    new Display;

    $(".banner").banner({
        items:$(".banner .imgbox").children(),
        list:true,
        left:$(".banner #left"),
        right:$(".banner #right")
    })
    class Menu{
        constructor(){
            this.cont = document.querySelector("nav .cont");
            this.menu = document.querySelector("#banner .menu");
            this.menu2 = document.querySelector("#banner .menu2");
            this.url = "http://localhost/ztt/goods/public/data/menu.json";
            this.init();
        }
        // ajax获取数据
        init(){
            var that = this;
            ajax({
                url:this.url,
                success:function(res){
                    that.res = JSON.parse(res);
                    that.addEvent();
                }
            })
        }
        // 一级菜单事件委托
        addEvent(){
            var that = this;
            this.cont.onmouseover = function(){
                that.menu.style.display = "block";
                that.display();
            }
            this.cont.onmouseout = function(){
                that.addEvent2();
            }
        }
        // 渲染二级菜单
        display(){
            var str = "";
            for(var i = 0;i < this.res.length;i++){
                str += `<li index=${i}>${this.res[i].name}</li>`;
            }
            this.menu.innerHTML = str;
            this.addEvent2();

        }
        // 二级菜单事件委托
        addEvent2(){
            var that = this;
            this.menu.addEventListener("mouseover",(eve)=>{
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.nodeName == "LI"){
                    that.index = target.getAttribute("index");
                    that.menu2.style.display = "block";
                    that.displayTwo();
                    // this.addEvent3();

                }
            })
            // this.menu.addEventListener("mouseout",(eve)=>{
            //     var e = eve || window.event;
            //     // var target = e.target || e.srcElement;
            //     // if(target.nodeName == "LI"){
            //         that.menu.style.display = "none";
            //         // this.menu2.style.display = "none";
            //     // }
            // })
        }
        displayTwo(){
            let str2 = "";
            let str3 = `<li class="te">${this.res[this.index].name}</li>`
            for(var j = 0;j < this.res[this.index].value.length;j++){
                str2 += `<li>${this.res[this.index].value[j]}</li>`
            }
            let str = str3 + str2;
            this.menu2.innerHTML = str;
        }

        // 三级菜单事件监听。移出时消失
        addEvent3(){
            var that = this;
            this.menu2.onmouseout = function(){
                that.menu2.style.display = "none";
            }
        }
    }
    new Menu;
})(jQuery);