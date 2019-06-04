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


            this.menu.onmouseleave = function(){
                that.menu.style.display = "none";
                that.menu2.style.display = "none";
            }
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
            this.menu2.onmouseleave = function(){
                that.menu2.style.display = "none";
            }
        }
    }
    new Menu;

    class Index{
        constructor(){
            this.p1 = document.querySelector(".p1");
            this.p2 = document.querySelector(".p2");
            this.span = document.querySelector(".p2 span");
            this.exit = document.getElementById("exit");
            this.gocar = document.querySelector(".gocar");

            this.getData();
            this.addEvent();
            
        }
        getData(){
            this.data = localStorage.getItem("data");
            // 读取localStorage，如果有就解析成数组，如果没有就给一个空数组，方便操作
            if(this.data == null){
                this.data = [];
            }else{
                this.data = JSON.parse(this.data)
            }
            this.panduan();
            this.goCar();
        }
        panduan(){
            for(var i=0;i<this.data.length;i++){
                if(this.data[i].onoff == 1){
                    this.p1.style.display = "none";
                    this.p2.style.display = "block";
                    this.span.innerHTML = this.data[i].tel;
                    this.successUser = this.data[i].tel;
                    // this.gocar.onclick = function(){
                    //     window.location.href="../function/car/car.html";
                    // }
                    return;
                }
                // this.data[i].onoff = 0;
                // this.gocar.onclick = function(){
                //     window.location.href="../function/login/login.html";
                // }

            }
            this.p1.style.display = "block";
            this.p2.style.display = "none";
            this.span.innerHTML = "";
        }
        addEvent(){
            var that = this;
            this.exit.onclick = function(){
                if(that.successUser){
                    for(var i=0;i<that.data.length;i++){
                        if(that.data[i].tel === that.successUser){
                            that.data[i].onoff = 0;
                            localStorage.setItem("data",JSON.stringify(that.data))
                            that.panduan();
                        }
                    }
                }
            }
        }
        goCar(){
            var that = this;
            this.gocar.onclick = function(){
                for(var i=0;i<that.data.length;i++){
                    console.log(that.data[i].onoff)
                    if(that.data[i].onoff == 1){
                        that.gocar.href="http://localhost/ztt/goods/function/car/car.html"
                        // location.href="http://www.baidu.com";
                        return;
                    }else{
                        that.gocar.href="http://localhost/ztt/goods/function/login/login.html"
                        // location.href="http://www.baidu.com";
                        return;
                    }
                }
            }
        }
    }

    new Index();

})(jQuery);