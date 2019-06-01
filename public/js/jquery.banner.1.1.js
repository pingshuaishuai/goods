;(function($){
    "use strict";

    $.fn.banner = function(options){
        var {list,items,left,right,autoPlay,delayTime,moveTime,index} = options;
        list = list === false ? false : true;
        moveTime = moveTime || 200;
        index = index || 0;
        autoPlay = autoPlay===false ? false : true;
        delayTime = delayTime || 2000;

        if(list){
            // 根据图片数量，生成对应的li
            var str = "";
            for(var i = 0;i < items.length;i++){
                str += `<li>${i+1}</li>`;
            }
            // 将li插入生成的ul中
            this.append($("<ul class='list'>").html(str));

            // 设置list的样式
            $(".list").css({
                
                // height:"26px",
                position:"absolute",
                left:0,
                bottom:0,
                right:0,
                // background:"rgba(200,200,200,.6)",
                margin:0,listStyle:"none",padding:0,
                display:"flex",
                justifyContent:"center"
                
            }).children().css({
                width:"26px",
                height:"26px",
                background:"#fff",
                // flex:1,
                borderLeft:"1px solide #fff",
                borderRight:"1px solide #fff",
                borderRadius:"50%",
                fontSize:"12px",
                lineHeight:"26px",
                textAlign:"center",
                margin:"0 10px 4px 10px"
                // borderRadius:"15px" 
            }).eq(index).css({
                background:"red"
            })

            // list的功能
            let move = function(direct,iPrev,iNow){
                items.eq(iPrev).css({
                    left:0
                }).stop().animate({
                    left:-items.eq(0).width() * direct
                },moveTime).end().eq(iNow).css({
                    left:items.eq(0).width() * direct
                }).stop().animate({
                    left:0
                },moveTime)
            }

            // list的功能
            $(".list").children("li").click(function(){
                if($(this).index() > index){
                    move(1,index,$(this).index())
                }
                if($(this).index() < index){
                    move(-1,index,$(this).index())
                }

                $(".list").children("li").eq(index).css({background:"#fff"}).end().eq($(this).index()).css({background:"red"})
                index = $(this).index();
            })
        }
        // 按钮的运动
        let move = function (direct){
            items.eq(iPrev).css({
                left:0
            }).stop().animate({
                left:items.eq(0).width() * direct
            },moveTime).end().eq(index).css({
                left:-items.eq(0).width() * direct
            }).stop().animate({
                left:0
            },moveTime)
            // B4.在按钮的功能中设置list的当前项
            if(list){
                $(".list").children().eq(iPrev).css({background:"#fff"}).end().eq(index).css({background:"red"});
            }
            // list && $(".list").children().eq(iPrev).css({background:""}).end().eq(index).css({background:"red"});
        }


        let iPrev = items.length-1;

        function rightEvent(){
            // B2-2.计算索引
            if(index == items.length-1){
                index = 0;
                iPrev = items.length-1
            }else{
                index++;
                iPrev = index-1;
            }
            // B3-2.开始运动
            move(-1)
        }
        function leftEvent(){
            // B2-1.计算索引
            if(index == 0){
                index = items.length-1;
                iPrev = 0
            }else{
                index--;
                iPrev = index + 1;
            }
            // B3-1.开始运动
            move(1)
        }
        
        if(left != undefined && left.length>0 && right != undefined && right.length>0){
            // 左右按钮的功能
            // B1.绑定点击事件
            left.click(leftEvent);
            right.click(rightEvent);
        }
        // 是否自动播放
        if(autoPlay){
            let timer;
            // A1.开始自动播放，利用jq提供的模拟事件
            timer = setInterval(() => {
                // right.trigger("click")
                rightEvent()
            }, delayTime);

            // A2.鼠标进入和离开大框，分别停止和继续
            this.hover(function(){
                clearInterval(timer);
            },function(){
                timer = setInterval(() => {
                    // right.trigger("click")
                    rightEvent()
                }, delayTime);
            })
        }

    }
})(jQuery);