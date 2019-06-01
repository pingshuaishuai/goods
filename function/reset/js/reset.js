// 随机产生四位验证码
class Vcode{
    constructor(){
        // 选中元素
        this.code = document.querySelector(".yzh");
        this.veri = document.querySelector(".vcode");
        // console.log(this.veri.value)
        this.init();
        
    }
    // 建立随机库
    init(){
        this.str = "";
        for(var i=0;i<4;i++){
            var num = this.random(0,9);
            var az = String.fromCharCode(this.random(65,90));
            var AZ = String.fromCharCode(this.random(97,122));
            this.str +=  num + az + AZ;
        }
        this.addEvent();
    }
    // 渲染页面，出现验证码
    display(){
            this.rStr = "";
            // 从随机库中拿出4位作为验证码
            for(var i=0;i<4;i++){
                var index = this.random(0,this.str.length-1);
                this.rStr += this.str[index];
            }
            this.code.innerHTML = this.rStr;
            this.check();
    }
    // 点击图片事件
    addEvent(){
        var that = this;
        this.code.onclick = function(){
            that.display();
        }
    }

    check(){
        var that = this;
        this.veri.onblur = function(){
            if(that.veri.value != null){
                if(that.veri.value != that.rStr){
                    that.code.innerHTML = "验证码错误";
                }
            }
        }
    }

    // 随机数
    random(max,min){
        return Math.round(Math.random()*(max-min)+min);
    }
}
new Vcode;

class Register{
    constructor(){
        // this.user = document.querySelector(".user");
        this.tel = document.querySelector(".tel");
        this.pass = document.querySelector(".pass");
        this.repass = document.querySelector(".repass");
        this.btn = document.querySelector(".submit");
        this.span = document.querySelector(".tip");

        this.init();
        this.getData();
    }
    init(){
        var that = this;
        this.btn.onclick = function(){
            that.setData()
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
    setData(){
        if(this.data.length == 0){
            // 第一次注册
            this.data.push({
                tel:this.tel.value,
                pass:this.pass.value,
                onoff:0
            })
            this.span.innerHTML = "注册成功";
            localStorage.setItem("data",JSON.stringify(this.data))
        }else{
            // 不是第一次注册，如果不是第一次注册，需要判断这次注册的和之前注册的是否重名，如果重名，不执行
            for(var i=0;i<this.data.length;i++){
                if(this.data[i].tel === this.tel.value){
                    this.span.innerHTML = "已注册";
                    return;
                }
            }
            // 如果执行了，表示没重名，那就再增加一个
            this.data.push({
                tel:this.tel.value,
                pass:this.pass.value,
                onoff:0
            })
            this.span.innerHTML = "注册成功,2秒后跳转";
            localStorage.setItem("data",JSON.stringify(this.data));
            setTimeout(()=>{
                location.href = "../login/login.html";
            },2000)
            return;
            // location.href = "login.html";
        }
    }
}

new Register;