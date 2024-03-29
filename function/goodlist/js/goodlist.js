class Good{
    constructor(){
        this.url = "http://localhost/ztt/goods/public/data/goods.json";
        this.every = document.querySelector("#data .every");
        this.init();
        
    }
    init(){
        var that = this;
        ajax({
            url:this.url,
            success:function(res){
                that.res = JSON.parse(res);
                // console.log(that.res)
                that.display();
                that.addEvent();
            }
        })
    }
    display(){
        let str = "";
        for(var i = 0;i < this.res.length;i++){
            if(this.res[i].title == "women"){
                for(var j = 0;j < this.res[i].shop.length;j++){
                    str +=`<div class="good" index="${this.res[i].shop[j].goodsId}">
                    <img datasrc="${this.res[i].shop[j].datasrc}">
                    <span>￥${this.res[i].shop[j].price}</span>
                    <p>${this.res[i].shop[j].name}</p>
                </div>`
                }
            }
            this.every.innerHTML = str;
        }

        
        var aimg = document.querySelectorAll(".every img");
        // console.log(aimg)
        var clientH = document.documentElement.clientHeight;
        // console.log(aimg[0].datasrc);
        function lazyLog(arr){
            var scrollT = document.documentElement.scrollTop;
            
            for(var i=0;i<arr.length;i++){
                if(arr[i].src != "") continue;
                if(arr[i].offsetTop < clientH + scrollT){
                    arr[i].src = arr[i].getAttribute("datasrc");
                    console.log(`第${i}张可以加载了`)
                }
            }
        }
    
        lazyLog(aimg)
    
        onscroll = function(){
            lazyLog(aimg)
        }



    }
    addEvent(){
        var that = this;
        this.every.addEventListener("click",(eve)=>{
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName == "IMG" || "SPAN" || "P"){
                console.log(target)
                that.id = target.parentNode.getAttribute("index");
                console.log(that.id)
                that.setStorage();
            }
        })
    }

    setStorage(){
        this.good = localStorage.getItem("good");
        this.good = [{
            id:this.id
        }]
        
        localStorage.setItem("good",JSON.stringify(this.good));
        window.location.href = "http://localhost/ztt/goods/function/details/details.html"
        // console.log(cookie)
    }
}
new Good;
