class Car{
    constructor(){
        this.tbody = document.querySelector("#table tbody");
        // this.payfor = document.querySelector(".payfor");
        this.url = "http://localhost/ztt/goods/public/data/goods.json";

        this.init();
        this.addEvent();
    }
    // 获取数据
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
    // 获取cookie数据
    getStorage(){
        this.goods = JSON.parse(localStorage.getItem("shangpin"));
        for(var z = 0;z < this.goods.length;z++){
            this.id = this.goods[z].id;
        }
        this.display();
    }
    // 渲染页面
    display(){
        var str = "";
        var str2 = "";
        this.ssum = [];
        this.money = 0;

        for(var i = 0;i < this.res.length;i++){
            for(var j = 0;j < this.res[i].shop.length;j++){
                for(var z = 0;z < this.goods.length;z++){
                    if(this.goods[z].id == this.res[i].shop[j].goodsId){
                        this.sum = parseFloat(this.res[i].shop[j].price*this.goods[z].num);
                        // this.money += parseInt(this.res[i].shop[j].price*this.goods[z].num);
                        // this.money = 0;
                        // for(var q = 0;z < this.goods.length;q++){
                        //     // this.money += this.sum;
                            // console.log(this.money)
                        // }


                        str += `<tr index="${this.res[i].shop[j].goodsId}">
                                    <td class="te" index = "${this.goods[z].id}"><input type="checkbox"></td>
                                    <td><img src="${this.res[i].shop[j].datasrc}"></td>
                                    <td>${this.res[i].shop[j].name}</td>
                                    <td>￥${this.res[i].shop[j].price}</td>
                                    <td><input type="number" class="number" value="${this.goods[z].num}" min="1"></td>
                                    <td>￥${this.sum}</td>
                                    <td><span class="del">删除</span></td>
                                </tr>`
                        // this.money += this.sum;
                        // this.ssum.push(this.money)
                        // str2 +=`<p class="money">总计：<b>￥${this.ssum[length+1]}</b><span class="pay">结算</span></p>`
                        //         // console.log(this.ssum[length+1]) 
                    }         
                }
            }
        }
        this.tbody.innerHTML = str;
        // this.payfor.innerHTML = str;
    }
    // 添加事件委托
    addEvent(){
        var that = this;
        this.tbody.addEventListener("click",function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "del"){
                that.id = target.parentNode.parentNode.getAttribute("index");
                target.parentNode.parentNode.remove();
                that.removeStorage();
            }
        })
        this.tbody.addEventListener("input",function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "number"){
                that.id = target.parentNode.parentNode.getAttribute("index");
                that.num = target.value;
                that.change();
                // that.changeSum();
            }
        })
    }
    // 删除
    removeStorage(){
        for(var i = 0;i < this.goods.length;i++){
            if(this.goods[i].id == this.id){
                this.goods.splice(i,1);
                break;
            }
        }
        localStorage.setItem("shangpin",JSON.stringify(this.goods))
    }
    // 修改数量
    change(){
        for(var i = 0;i < this.goods.length;i++){
            if(this.goods[i].id == this.id){
                this.goods[i].num = this.num;
                break;
            }
        }
        localStorage.setItem("shangpin",JSON.stringify(this.goods));
    }
    // changeSum(){
    //     for(var i = 0;i < this.res.length;i++){
    //         for(var j = 0;j < this.res[i].shop.length;j++){
    //             for(var z = 0;z < this.goods.length;z++){
    //                 if(this.goods[z].id == this.id){
    //                     this.goods[z].num = this.num;
    //                     this.sum = parseFloat(this.res[i].shop[j].price*this.goods[z].num);
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // }
}
new Car;