class Details{
    constructor(){
        this.images = document.querySelector("#infor .images");
        this.cont = document.querySelector("#tab .cont");
        this.xiang = document.querySelector("#infor .xiang");
        this.url = "http://localhost/ztt/goods/public/data/goods.json";
        this.init();
        this.addEvent();
        // this.event();
    }
    init(){
        var that = this;
        ajax({
            url:this.url,
            success:function(res){
                that.res = JSON.parse(res);
                that.getStorage();
            }
        })
    }
    getStorage(){
        this.goods = JSON.parse(localStorage.getItem("good"));
        // console.log(this.goods[0].id)   
        this.display();
    }
    display(){
        let str = "";
        let str2 = "";
        let str3 = "";
        for(var i = 0;i < this.res.length;i++){
            if(this.res[i].title == "women"){
                for(var j = 0;j < this.res[i].shop.length;j++){
                    if(this.goods[0].id == this.res[i].shop[j].goodsId){
                        // console.log(this.res[i].shop[j].goodsId)
                        str = `<div class="s_box">
                                    <img src="${this.res[i].shop[j].src}" alt="" class="move">
                                    <span></span>
                                </div>
                                <div class="b_box">
                                    <img src="${this.res[i].shop[j].src}" alt="">
                                </div>`;
                        str2 = `<p>${this.res[i].shop[j].name}</p>
                                <span>${this.res[i].shop[j].price}</span>
                                <input type="number" value="1" class="number" min="1"><br>
                                <input type="button" value="立即购买" class="buy">
                                <input type="button" value="加入购物车" class="tocar"><br>
                                <a href="../car/car.html">去购物车结算>></a>`;
                        // str3 =`<p class="msg"><img src="${this.res[i].shop[j].tab1}"></p>
                        //         <p class="msg"><img src="${this.res[i].shop[j].tab2}"></p>
                        //         <p class="msg"><img src="${this.res[i].shop[j].tab3}"></p>`
                    }
                }
            }
            this.images.innerHTML = str;
            this.xiang.innerHTML = str2;
            // this.cont.innerHTML = str3;
        }


    }

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
    // 设置cookie
    setData(){
        this.goods = localStorage.getItem("shangpin");
        if(this.goods){
            this.goods = JSON.parse(this.goods);
            var onoff = true;
            for(var i = 0;i < this.goods.length;i++){
                if(this.id == this.goods[i].id){
                    console.log(this.id);
                    this.goods[i].num++;
                    onoff = false;
                }
            }
            if(onoff){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }
        }else{
            this.goods = [{
                id:this.id,
                num:1
            }]
        }
        localStorage.setItem("shangpin",JSON.stringify(this.goods));
        // console.log(cookie)
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







    // 放大镜
//     event(){
//         var that = this;
//         this.images.addEventListener("mouseover",function(eve){
//             var e = eve || window.event;
//             var target = e.target || e.srcElement;
//             // e.pageX - this.offsetLeft === e.offsetX
//             // e.pageY - this.offsetTop === e.offsetY
//             // that.move({
//             //     x:e.pageX - this.offsetLeft,
//             //     y:e.pageY - this.offsetTop
//             // })
//             if(target.className == "move"){
//                 that.sBox = target.parentNode;
//                 that.span = target.nextElementSibling;
//                 that.bBox = target.parentNode.nextElementSibling;
//                 that.bImg = target.parentNode.nextElementSibling.children[0];
//                 // console.log(that.bImg.offsetWidth)
//                 that.begin();
//             }
//         })
//     }
//     begin(){
//         this.span.style.display = "block";
//         this.bBox.style.display = "block";
        
//     }
//     move(pos){
//         var l = pos.x - 50;
//         var t = pos.y - 50;
//         // 边界限定
//         if(l<0) l=0;
//         if(t<0) t=0;
//         (l>400-100) && 
//         (l=400-50);
        
//         (t>400-50) && 
//         (t=400-50);

//         // span的移动
//         this.span.style.left = l + "px";
//         this.span.style.top = t + "px";

//         // 计算比例
//         // 已知咱班有89人，其中男生23人，请问男生找了总人数的比例是多少？
//         // 23/89
//         var x=  l / (this.sBox.offsetWidth-this.span.offsetWidth)
//         var y = t / (this.sBox.offsetHeight-this.span.offsetHeight)
//         // console.log(x,y)

//         // 根据比例移动大图
//         this.bImg.style.left = -x * (this.bImg.offsetWidth-this.bBox.offsetWidth) + "px";
//         this.bImg.style.top = -y * (this.bImg.offsetHeight-this.bBox.offsetHeight) + "px";
//     }
// }
// new Details;






// function Magnifier(){
//     // 1.选元素
//     this.sBox = document.querySelector(".s_box");
//     this.span = document.querySelector(".s_box span");
//     this.bBox = document.querySelector(".b_box");
//     // this.bImg = this.bBox.children[0];

//     // 2.绑定事件：进入，移动，离开
//     this.init()
// }
// Magnifier.prototype.show = function(){
//     // 显示
//     this.span.style.display = "block";
//     this.bBox.style.display = "block";
// }
// Magnifier.prototype.hide = function(){
//     // 隐藏
//     this.span.style.display = "none";
//     this.bBox.style.display = "none";
// }
// Magnifier.prototype.move = function(pos){
//     // 移动
//     var l = pos.x - this.span.offsetWidth/2;
//     var t = pos.y - this.span.offsetHeight/2;
//     // 边界限定
//     if(l<0) l=0;
//     if(t<0) t=0;
//     (l>this.sBox.offsetWidth-this.span.offsetWidth) && 
//     (l=this.sBox.offsetWidth-this.span.offsetWidth);
    
//     (t>this.sBox.offsetHeight-this.span.offsetHeight) && 
//     (t=this.sBox.offsetHeight-this.span.offsetHeight);

//     // span的移动
//     this.span.style.left = l + "px";
//     this.span.style.top = t + "px";

//     // 计算比例
//     // 已知咱班有89人，其中男生23人，请问男生找了总人数的比例是多少？
//     // 23/89
//     var x=  l / (this.sBox.offsetWidth-this.span.offsetWidth)
//     var y = t / (this.sBox.offsetHeight-this.span.offsetHeight)
//     // console.log(x,y)

//     // 根据比例移动大图
//     this.bImg.style.left = -x * (this.bImg.offsetWidth-this.bBox.offsetWidth) + "px";
//     this.bImg.style.top = -y * (this.bImg.offsetHeight-this.bBox.offsetHeight) + "px";
// }
// Magnifier.prototype.init = function(){
    // var that = this;
    // // 进入
    // this.sBox.onmouseover = function(){
    //     // 显示元素
    //     that.show()
    //     // 移动             this == that.sBox
    //     this.onmousemove = function(eve){
    //         var e = eve || window.event;
    //         // e.pageX - this.offsetLeft === e.offsetX
    //         // e.pageY - this.offsetTop === e.offsetY
    //         that.move({
    //             x:e.pageX - this.offsetLeft,
    //             y:e.pageY - this.offsetTop
    //         })
    //     }
//     }
//     // 离开
//     this.sBox.onmouseout = function(){
//         //     隐藏元素
//         that.hide()
//     }
// }

// new Magnifier;














