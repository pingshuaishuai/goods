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
                return;
            }
            // this.data[i].onoff = 0;
            this.p1.style.display = "block";
            this.p2.style.display = "none";
            this.span.innerHTML = "";
        }
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
                    return;
                }else{
                    that.gocar.href="http://localhost/ztt/goods/function/login/login.html"
                    return;
                }
            }
        }
    }
}

new Index;