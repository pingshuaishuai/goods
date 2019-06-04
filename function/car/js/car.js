class Car{
    constructor(){
        this.tbody = document.querySelector("#table tbody");
        this.url = "http://localhost/ztt/goods/public/data/goods.json";

        this.init();
        // this.addEvent();
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
        console.log(this.goods)
        for(var z = 0;z < this.goods.length;z++){
            this.id = this.goods[z].id;
            console.log(this.id)
        }
        // this.display();
    }
    // 渲染页面
    display(){
        // for(var i = 0;i < this.res.length;i++){
        //     if(this.res[i].title == "women"){
        //         for(var j = 0;j < this.res[i].shop.length;j++){
        //             if(this.goods[0].id == this.res[i].shop[j].goodsId){
        var str = "";
        for(var i = 0;i < this.res.length;i++){
            for(var j = 0;j < this.res[i].shop.length;j++){
                for(var z = 0;z < this.goods.length;z++){
                    if(this.goods[z].id == this.res[i].shop[j].goodsId){
                        str += `<tr>
                                    <td class="te" index = "${this.goods[z].id}"><input type="checkbox"></td>
                                    <td><img src="${this.res[i].src}"></td>
                                    <td>${this.res[i].name}</td>
                                    <td>${this.res[i].price}</td>
                                    <td><input type="number" class="number" value="${this.goods[z].num}" min="1"></td>
                                    <td>"${this.res[i].price}*${this.goods[z].num}"</td>
                                    <td><span class="del">删除</span></td>
                                </tr>`
                    }
                }
            }
        }
        this.tbody.innerHTML = str;
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
}
new Car;