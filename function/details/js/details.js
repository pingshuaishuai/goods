class Details{
    constructor(){
        this.images = document.querySelector("#infor .images");
        this.sBox = document.querySelector("#infor .s_box");
        this.bBox = document.querySelector("#infor .b_box");
        this.cont = document.querySelector("#tab .cont");
        this.xiang = document.querySelector("#infor .xiang");
        this.url = "http://localhost/ztt/goods/public/data/goods.json";
        this.init();
        this.addEvent();
        this.addEvent2();
    }

    // 获取json中所有的数据
    init(){
        var that = this;
        ajax({
            url:this.url,
            success:function(res){
                that.res = JSON.parse(res);
                that.getStorage()
            }
        })
    }

    // 获取good的localstroage的数据
    getStorage(){
        this.goods = JSON.parse(localStorage.getItem("good"));
        // console.log(this.goods[0].id)   
        this.display();
    }

    // 渲染页面
    display(){
        let str = "";
        let str2 = "";
        let str1 = "";
        for(var i = 0;i < this.res.length;i++){
            if(this.res[i].title == "women"){
                for(var j = 0;j < this.res[i].shop.length;j++){
                    if(this.goods[0].id == this.res[i].shop[j].goodsId){
                        // 正常图片
                        str = `<img src="${this.res[i].shop[j].datasrc}" alt="" class="move">
                                <span class="kong"><span>`;
                        // 放大的图片
                        str1 = `<img src="${this.res[i].shop[j].datasrc}" alt="">`;
                        // 渲染数据
                        str2 = `<p>${this.res[i].shop[j].name}</p>
                                <span>￥${this.res[i].shop[j].price}</span>
                                <input type="button" value="立即购买" class="buy">
                                <input type="button" value="加入购物车" class="tocar"><br>
                                <a href="../goodlist/goodlist.html">继续购物>></a>`;
                        }
                    }
                }
                // 将数据插入页面
                this.sBox.innerHTML = str;
                this.bBox.innerHTML = str1;
                this.xiang.innerHTML = str2; 
            }

        // 获取已经渲染的数据
        this.span = document.querySelector(".kong");
        this.bImg = this.bBox.children[0];
        console.log(this.bImg.style)
        this.init1();
    }

    // 放大镜的功能
    init1(){
        var that = this;
        // 进入时进行放大镜
        this.sBox.onmouseover = function(){
            // 显示元素
            // console.log(this.span)
            that.span.className = "active";
            that.bBox.style.display = "block";
            console.log(that.bBox)
            // 移动             this == that.sBox
            this.onmousemove = function(eve){
                var e = eve || window.event;
                // e.pageX - this.offsetLeft === e.offsetX
                // e.pageY - this.offsetTop === e.offsetY
                that.move({
                    x:e.pageX - this.offsetLeft,
                    y:e.pageY - this.offsetTop
                })
            }
        }

        // 鼠标移出时，隐藏元素
        this.sBox.onmouseout = function(){
            that.span.className  = "";
            that.bBox.style.display = "none";
        }
    }

    // span标签跟随移动
    move(pos){
            var l = pos.x - this.span.offsetWidth/2;
            var t = pos.y - this.span.offsetHeight/2
            // 边界限定
            if(l<0) l=0;
            if(t<0) t=0;
            (l>this.sBox.offsetWidth-this.span.offsetWidth) && 
            (l=this.sBox.offsetWidth-this.span.offsetWidth);
            
            (t>this.sBox.offsetHeight-this.span.offsetHeight) && 
            (t=this.sBox.offsetHeight-this.span.offsetHeight);

            // span的移动
            this.span.style.left = l + "px";
            this.span.style.top = t + "px";

            // 计算比例

            var x=  l / (this.sBox.offsetWidth-this.span.offsetWidth)
            var y = t / (this.sBox.offsetHeight-this.span.offsetHeight)
            // console.log(x,y)
            // console.log(this.bImg.offsetWidth)

            // 根据比例移动大图
            this.bImg.style.left = -x * (this.bImg.offsetWidth-this.bBox.offsetWidth) + "px";
            this.bImg.style.top = -y * (this.bImg.offsetHeight-this.bBox.offsetHeight) + "px";
    }
    // 购物功能：点击购物车，数量增加
    addEvent(){
        var that = this;
        this.xiang.addEventListener("click",function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "tocar"){
                // console.log(target)
                that.id = that.goods[0].id;
                that.setData();
            }
        })
    }

    // 设置localStorage
    setData(){
        this.good = localStorage.getItem("shangpin");
        if(this.good){
            this.good = JSON.parse(this.good);
            var onoff = true;
            for(var i = 0;i < this.good.length;i++){
                if(this.id == this.good[i].id){
                    // console.log(this.id);
                    this.good[i].num++;
                    onoff = false;
                }
            }
            if(onoff){
                this.good.push({
                    id:this.id,
                    num:1
                })
            }
        }else{
            this.good = [{
                id:this.id,
                num:1
            }]
        }
        localStorage.setItem("shangpin",JSON.stringify(this.good));
    }

    addEvent2(){
        
        this.xiang.addEventListener("click",function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "buy"){
                window.location.href = "http://localhost/ztt/goods/function/car/car.html";
            }
        })
    }

}
new Details;


    function Tab(){
    // 1.选元素
    this.li = document.querySelectorAll("#tab li")
    this.p = document.querySelectorAll("#tab p")

    // 初始自己定义的索引
    this.index = 0;
    
    // 2.绑事件
    this.init()
}
Tab.prototype.init = function(){
    var that = this;
    // 写事件的绑定
        for(var i=0;i<this.li.length;i++){
            this.li[i].xuhao = i;
            this.li[i].onclick = function(){
                // 3.计算要显示的元素的索引
                that.changeIndex(this)
            }
        }
}
Tab.prototype.changeIndex = function(ele){
    // 计算呗。。。
    this.index = ele.xuhao;
    // 4.隐藏所有
    this.hide()
}
Tab.prototype.hide = function(){
    // 隐藏所有的代码...
    for(var i=0;i<this.li.length;i++){
        this.li[i].className = "";
        this.p[i].style.display = "none";
    }
    // 5.显示计算之后的索引所代表的元素
    this.show()
}
Tab.prototype.show = function(){
    // 显示当前的代码。。
    this.li[this.index].className = "active";
    this.p[this.index].style.display = "block";
}


// 执行
new Tab();

