
//getDom()
function getDom(selector){
	return document.querySelectorAll(selector);
    console.log('a')

}
//bindEvent()
function bindEvent(ele,eventType,callback){
	if(typeof ele.addEventListener === 'function'){//不兼容IE7，IE8
		ele.addEventListener(eventType,callback,false);
	}else if(typeof ele.attachEvent === 'function'){
		ele.attachEvent('on'+eventType,callback);
	}else{
		ele['on'+eventType] = callback;
	}
}
//play|pause animation
function isPlay(ele,boo){
	if(!boo){
		ele.style.webkitAnimationPlayState = 'paused';
		ele.style.animationPlayState = 'paused';
	}else{
		ele.style.webkitAnimationPlayState = 'running';
		ele.style.animationPlayState = 'running';
	}
}
//init()
function init(){
	console.log('a');
	
	//元素
	var playBtn = getDom('#playBtn')[0],
		prevBtn = getDom('#prevBtn')[0],
		nextBtn = getDom('#nextBtn')[0],
		blur = getDom('.blur')[0],
		main = getDom('.main')[0],
		discBox = getDom('.discBox')[0],
		disc = getDom('.discBox .disc')[0],
		disc_border = getDom('.discBox .border')[0],
		audio = getDom('#audio')[0],
		progressBox = getDom('.progressBox')[0],
		progressBar = getDom('.progressBar')[0],
		progressBar_arc = getDom('.progressBar .arc')[0],
		curTime = getDom('.curTime')[0],
		totalTime = getDom('.totalTime')[0],
		songName = getDom('#songName')[0],
		singerName = getDom('#singerName')[0],
		volume = getDom('.volume')[0],
		volumnbar = getDom('#volumnbar')[0];

	//数据
	var audio_m = 99,//分钟数
		audio_s = 59,//秒数
		curT = 0,//播放的时长
		curM = 0,//分钟数
		curS = 0;//秒数
	//音频数据
	var musicData = [{
		'lm':99,
		'ls':59,
		'src':'./src/阿肆,林宥嘉 - 致姗姗来迟的你.mp3',
		'bg':'./img/6.jpg',
		'songName':'致姗姗来迟的你',
		'singerName':'阿肆 林宥嘉'
	},{
		'lm':99,
		'ls':59,
		'src':'./src/何沐阳 - 爱你如衣 (伴奏).mp3',
		'bg':'./img/2.jpg',
		'songName':'爱你如衣',
		'singerName':'何沐阳'
	},{
        'lm':99,
        'ls':59,
        'src':'./src/焦迈奇 - 若许一个愿望少活十年，我许十个.mp3',
        'bg':'./img/1.jpg',
        'songName':'若许一个愿望少活十年，我许十个',
        'singerName':'焦迈奇'
    },{
        'lm':99,
        'ls':59,
        'src':'./src/许一鸣 - 想你想疯了.mp3',
        'bg':'./img/3.jpg',
        'songName':'想你想疯了',
        'singerName':'许一鸣'
    },{
        'lm':99,
        'ls':59,
        'src':'./src/张悬 - 南国的孩子.mp3',
        'bg':'./img/5.jpg',
        'songName':'南国的孩子',
        'singerName':'张悬'
    },{
        'lm':99,
        'ls':59,
        'src':'./src/周深 - 大鱼.mp3',
        'bg':'./img/4.jpg',
        'songName':'大鱼',
        'singerName':'周深'
    }
    ];
	var songs_len = musicData.length;
	var i=0;//第一首歌
	var isDrag = true;//是否拖动进度条
    var play = true;

	//程序初始化
	function initPlayer(){
		isPlay(disc,false);
		isPlay(disc_border,false);
		audio.pause();
		audio.volume = Math.round(volumnbar.offsetWidth/volume.offsetWidth*100)/100;
		playBtn.className = 'fa fa-play-circle';
	}

	//切换歌曲
	function changeSong(i){
		audio_m = Math.floor(audio.duration / 60);
		audio_s = Math.round(audio.duration - audio_m * 60);
		musicData[i].lm = audio_m < 10 ? '0' + audio_m : audio_m;
		musicData[i].ls = audio_s < 10 ? '0' + audio_s : audio_s;
		progressBar.style.width = '0';
		curTime.innerHTML = '00:00';
		totalTime.innerHTML = musicData[i].lm + ':' + musicData[i].ls;
		disc.style.backgroundImage = 'url(' + musicData[i].bg + ')';
		blur.style.backgroundImage = 'url(' + musicData[i].bg + ')';
		songName.innerHTML = musicData[i].songName;
		singerName.innerHTML = musicData[i].singerName;
	}

	//播放主程序
	function mainPlay() {
		//按钮样式切换
		playBtn.className = (playBtn.className.indexOf('play') !== -1) ? 'fa fa-pause-circle' : 'fa fa-play-circle';
		//按钮行为判断
		if (playBtn.className.indexOf('play') !== -1) {
			isPlay(disc,false);
			isPlay(disc_border,false);
			audio.pause();
		} else {
			isPlay(disc,true);
			isPlay(disc_border,true);
			audio.play();
		}
        
	}

	//程序初始化
	initPlayer();
	changeSong(0);

	//下一首 Func1
	bindEvent(nextBtn,'mousedown',function(){
		//初始化
		initPlayer();
		i=i+1>songs_len-1?0:i+1;
		audio.src = musicData[i].src;
		//自动播放
		mainPlay();
	})
	//上一首 Func2
	bindEvent(prevBtn,'mousedown',function() {
		//初始化
		initPlayer();
		i=i-1<0?songs_len-1:i-1;
		audio.src = musicData[i].src;
		//自动播放
		mainPlay();
	})
	//播放|暂停 Func3
	bindEvent(playBtn,'mousedown',function(){
        console.log('d')
		mainPlay();
	})

	//时长改变触发事件
	bindEvent(audio,'durationchange',function(){
		changeSong(i);
	});
	//动态刷新当前时间进度条
	bindEvent(audio,'timeupdate',function(){
		if(play) {
			//时间
			curM = Math.floor(audio.currentTime / 60);
			curS = Math.round(audio.currentTime-curM * 60);
			curM = curM<10?'0'+curM:curM;
			curS = curS<10?'0'+curS:curS;
			curTime.innerHTML = curM+':'+curS;
			//进度条
			var curLong = Math.round(audio.currentTime/audio.duration*(progressBox.offsetWidth-16));
			progressBar.style.width = curLong + 'px';
                console.log(audio.currentTime);
                console.log(audio.duration)

		}
	});

	//播放完成，进行下一首 Func4
	bindEvent(audio,'ended',function(){
		//初始化
        initPlayer();
        i=i+1>songs_len-1?0:i+1;
        audio.src = musicData[i].src;
        //自动播放
        mainPlay();
	});
	//拖动进度条改变播放进度 Func5
	bindEvent(progressBar_arc,'mousedown',function(){
        isDrag = true;
        play = false;
		bindEvent(progressBar_arc,'mousemove',function(ev){
            if(isDrag){
                var ev = ev?ev:window.event;
                var ex = ev.clientX;
                var out_left = main.offsetLeft + progressBox.offsetLeft + progressBar.offsetLeft;
                var left = (ex-out_left)<0?0:((ex-out_left)>progressBox.offsetWidth-16?progressBox.offsetWidth-16:ex-out_left);
                progressBar.style.width = Math.round(left)+'px';

                curT = Math.round(audio.duration*(left/(progressBox.offsetWidth-16)));
                curM = Math.floor(curT/60);
                curS = Math.round(curT-curM*60);
                curM = curM<10?'0'+curM:curM;
                curS = curS<10?'0'+curS:curS;
                curTime.innerHTML = curM+':'+curS;
                audio.currentTime = curT;
            }
			
		});
	});
	bindEvent(progressBar,'mouseup',function(){
		audio.currentTime = curT;
		isDrag = false;//停止拖动进度条
        play = true;
	});
	//拖动声音按钮，改变音量Func6
	bindEvent(volumnbar,'mousedown',function(){
        isDrag = true;
        play = false;
		bindEvent(volumnbar,'mousemove',function(ev){
            if(isDrag){
                var ev = ev?ev:window.event;
                var ex = ev.clientX;
                var out_left = main.offsetLeft+volume.offsetLeft+volumnbar.offsetLeft;
                var left = ex-out_left<0?0:((ex-out_left)>volume.offsetWidth?volume.offsetWidth:ex-out_left);
                volumnbar.style.width = Math.round(left)+'px';
                audio.volume = Math.round(left/volume.offsetWidth*100)/100;
                console.log(Math.round(left),audio.valume);
            }
			
		})
	})
    bindEvent(volumnbar,'mouseup',function(){
       isDrag = false;
       play = true;
    });

}

bindEvent(window,'load',init);
