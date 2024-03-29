class Login{
    constructor(){
        this.tel = document.querySelector(".name");
        this.pass = document.querySelector(".pass");
        this.btn = document.querySelector(".btn");
        this.span = document.querySelector(".tip");
        console.log(this.tel)

        this.init();
        this.getData();
    }
    init(){
        var that = this;
        this.btn.onclick = function(){
            that.lp();
        }
    }
    getData(){
        this.data = localStorage.getItem("data");
        // 读取localStorage，如果有就解析成数组，如果没有就给一个空数组，方便操作
        if(this.data == null){
            this.data = [];
            
        }else{
            this.data = JSON.parse(this.data)
        }
    }
    lp(){
        for(var i=0;i<this.data.length;i++){
            if(this.data[i].tel == this.tel.value && this.data[i].pass == this.pass.value){
                this.span.innerHTML = "登录成功,2秒后跳转";
                
                this.data[i].onoff = 1;

                localStorage.setItem("data",JSON.stringify(this.data))
                console.log(this.data);

                setTimeout(()=>{
                    location.href = "http://localhost/ztt/goods/index.html";
                },2000)
                return;
            }
            this.data[i].onoff = 0;
        }
        this.span.innerHTML = "用户名密码不符";
        location.href = "login.html";
    }
}
new Login();
