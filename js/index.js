	
var audio = document.getElementById('audio');//音频标签
var playerBtn = document.getElementsByClassName('player-btn')[0];//播放界面按钮
var playBorder = document.getElementsByClassName('border')[0];//旋转盒子
var playCircle = document.getElementsByClassName('circle')[0];//旋转封面
var playBtnSpan = playerBtn.getElementsByTagName('span');//播放按钮盒子
var progressBall = document.getElementsByClassName('progress-ball')[0];//进度条标识
var container = document.getElementsByClassName('container')[0];
var volumeBall = document.getElementsByClassName('volume-ball')[0];
var curTime = document.getElementsByClassName('cur-time')[0];//播放的时长
var progressBox = document.getElementsByClassName('progress')[0];//进度条
var progressBar = document.getElementsByClassName('progress-bar')[0];
var isDrag = true,play=true;

//音频数据
var musicData = [{
		'lm':99,
		'ls':59,
		'src':'src/阿肆,林宥嘉 - 致姗姗来迟的你.mp3',
		'bg':'./img/6.jpg',
		'songName':'致姗姗来迟的你',
		'singerName':'阿肆 林宥嘉'
	},{
		'lm':99,
		'ls':59,
		'src':'src/何沐阳 - 爱你如衣 (伴奏).mp3',
		'bg':'./img/2.jpg',
		'songName':'爱你如衣',
		'singerName':'何沐阳'
	},{
        'lm':99,
        'ls':59,
        'src':'src/焦迈奇 - 若许一个愿望少活十年，我许十个.mp3',
        'bg':'./img/1.jpg',
        'songName':'若许一个愿望少活十年，我许十个',
        'singerName':'焦迈奇'
    },{
        'lm':99,
        'ls':59,
        'src':'src/许一鸣 - 想你想疯了.mp3',
        'bg':'./img/3.jpg',
        'songName':'想你想疯了',
        'singerName':'许一鸣'
    },{
        'lm':99,
        'ls':59,
        'src':'src/张悬 - 南国的孩子.mp3',
        'bg':'./img/5.jpg',
        'songName':'南国的孩子',
        'singerName':'张悬'
    },{
        'lm':99,
        'ls':59,
        'src':'src/周深 - 大鱼.mp3',
        'bg':'./img/4.jpg',
        'songName':'大鱼',
        'singerName':'周深'
    }
    ];

	//播放数据
	var i=0;//歌曲序号
	var audio_m = 99,//分钟数
		audio_s = 59,//秒数
		curT = 0,//播放的时长
		curM = 0,//分钟数
		curS = 0;//秒数
	window.onload = function(){
		player();
		changeSong(0);
	}
	//时长改变
	function changeSong(i){
		var totalTime = document.getElementsByClassName('total-time')[0];//总时长
		var playerMusic = document.getElementsByClassName('player')[0];
		var songName = document.getElementsByClassName('song-name')[0];
		var singerName = document.getElementsByClassName('singer-name')[0];
		audio_m = Math.floor(audio.duration / 60);
		audio_s = Math.round(audio.duration - audio_m * 60);
		musicData[i].lm = audio_m < 10 ? '0' + audio_m : audio_m;
		musicData[i].ls = audio_s < 10 ? '0' + audio_s : audio_s;
		progressBar.style.width = '0';
		curTime.innerHTML = '00:00';
		totalTime.innerHTML = musicData[i].lm + ':' + musicData[i].ls;
		playCircle.style.backgroundImage = 'url(' + musicData[i].bg + ')';
		playerMusic.style.backgroundImage = 'url(' + musicData[i].bg + ')';
		songName.innerHTML = musicData[i].songName;
		singerName.innerHTML = musicData[i].singerName;
	}
    //播放主程序
    function player(){
    	if(playBtnSpan[1].className.indexOf('pause')>=0){
    		playBorder.style.webkitAnimationPlayState = 'paused';
    		playBorder.style.animationPlayState = 'paused';
    		playCircle.style.webkitAnimationPlayState = 'paused';
    		playCircle.style.animationPlayState = 'paused';
    		audio.pause();
    	}else if(playBtnSpan[1].className.indexOf('play')>=0){
    		playBorder.style.webkitAnimationPlayState = 'running';
    		playBorder.style.animationPlayState = 'running';
    		playCircle.style.webkitAnimationPlayState = 'running';
    		playCircle.style.animationPlayState = 'running';
    		audio.play();
    	}
    }
    //按钮点击
    function playerBtnClick(e){
    	var playBtnI = playerBtn.getElementsByTagName('i');
    	e = e || window.event;
    	el = e.srcElement || e.target;
    	var my = el.getAttribute('my');
    	switch(my){
    		case '0':
    			if(playBtnSpan[0].className.indexOf('order')>=0){
    				playBtnSpan[0].innerHTML = '<i class="iconfont" my="0">&#xe61d;</i>';
    				playBtnSpan[0].className = 'circ';
    				audio.loop = true;
    			}else if(playBtnSpan[0].className.indexOf('circ')>=0){
    				playBtnSpan[0].innerHTML = '<i class="iconfont" my="0">&#xe618;</i>';
    				playBtnSpan[0].className = 'rand';
    				audio.loop = false;
    			}else if(playBtnSpan[0].className.indexOf('rand')>=0){
    				playBtnSpan[0].innerHTML = '<i class="iconfont" my="0">&#xe648;</i>';
    				playBtnSpan[0].className = 'order';
    				audio.loop = false;
    			}
    			break;
    		case '1':
    			if(playBtnSpan[0].className.indexOf('order')>=0){
    				i==0?i=musicData.length-1:i--;
    			}else if(playBtnSpan[0].className.indexOf('rand')>=0){
    				i=Math.floor(Math.random()*musicData.length);
    			}
    			audio.src=musicData[i].src;
    			player();
    			break;
    		case '2':
		    	if(playBtnSpan[1].className.indexOf('pause')>=0){
					playBtnSpan[1].className = 'play';
					playBtnSpan[1].innerHTML = '<i class="iconfont" my="2">&#xe66a;</i>';
				}else if(playBtnSpan[1].className.indexOf('play')>=0){
					playBtnSpan[1].className = 'pause';
					playBtnSpan[1].innerHTML = '<i class="iconfont" my="2">&#xe8d8;</i>';
				}
		    	player();
		    	break;
    		case '3':
    			musicEnded();
    			break;
    	}
    }
    //音量拖动
    function volumeBallDown(){
    	var volumeBox = document.getElementsByClassName('volume')[0];
		var volumeBar = document.getElementsByClassName('volume-bar')[0];
    	isDrag = true;
    	addEventHander(volumeBall,'mousemove',function(e){
    		e = e || window.event;
    		if(isDrag){volumeBar.style.width = e.clientX-volumeBox.offsetLeft - container.offsetLeft + 'px'}
    		addEventHander(volumeBall,'mouseup',function(){
    			isDrag = false;
    			audio.volume = Math.round(volumeBar.offsetWidth / volumeBox.offsetWidth * 100) / 100;//音量为百分比
    		})
    	})
    }
    //拖拽进度条刷新歌曲进度
    function proBallDown(){
    	isDrag = true;
    	play = false;
    	addEventHander(progressBall,'mousemove',function(e){
    		e = e || window.event;
    		if(isDrag){progressBar.style.width = e.clientX-progressBox.offsetLeft - container.offsetLeft +'px';}
    		//console.log(e.clientX);
    		//console.log(progressBox.offsetLeft+container.offsetLeft);
    		var curr = progressBar.offsetWidth / progressBox.offsetWidth * audio.duration;
    		curM = Math.floor(curr / 60);
	    	curS = Math.round(curr-curM * 60);
	    	curM = curM<10?'0'+curM:curM;
	    	curS = curS<10?'0'+curS:curS;
	    	curTime.innerHTML = curM+':'+curS;
    		addEventHander(progressBall,'mouseup',function(){
    			isDrag = false;
    			play = true;
    			audio.currentTime = Math.round(progressBar.offsetWidth / progressBox.offsetWidth * audio.duration);
    		})
    	})
    }
    //动态刷新进度条
    function proUpdate(){
    	if(play){
    		curM = Math.floor(audio.currentTime / 60);
	    	curS = Math.round(audio.currentTime-curM * 60);
	    	curM = curM<10?'0'+curM:curM;
	    	curS = curS<10?'0'+curS:curS;
	    	curTime.innerHTML = curM+':'+curS;
	    	var curLong = Math.round(audio.currentTime/audio.duration*(progressBox.offsetWidth));
	    	progressBar.style.width = curLong + 'px';
    	}
    }
    //播放完成，进行下一首
    function musicEnded(){
    	if(playBtnSpan[0].className.indexOf('order')>=0){
    		//console.log(i)
			i==musicData.length-1?i=0:i++;
		}else if(playBtnSpan[0].className.indexOf('rand')>=0){
			i=Math.floor(Math.random()*musicData.length);
		}
		audio.src=musicData[i].src;
		player();
    }

	/*addEventListener:监听DOM元素的事件

	target: 监听对象
	type: 监听函数类型，如click，mouseover
	func: 监听函数*/
	function addEventHander(target,type,func){
		if(target.addEventListener){
			//监听IE9，谷歌和火狐
			target.addEventListener(type,func,false);
		}else if(target.attachEvent){
			target.attachEvent('on' + type, func);
		}else{
			target['on' + type] = func;
		}
	}
	/*
	removeEventHandler:移除DOM元素的事件

	target：监听对象
	type：监听函数类型，如click，mouseover
	Func：监听函数
	 */
	function removeEventHandler(target, type, func){
		if(target.removeEventlistener){
			//监听IE9，谷歌和火狐
			target.removeEventlistener(type, func, false);
		}else if(target.detachEvent){
			target.detachEvent('on' + type, func);
		}else{
			delete target['on' + type];
		}
	}
	addEventHander(playerBtn,'click',playerBtnClick);
	addEventHander(audio,'durationchange',function(){
		changeSong(i);
	});//时长改变触发事件
	addEventHander(audio,'timeupdate',proUpdate);
	addEventHander(audio,'ended',musicEnded);
	addEventHander(progressBall,'mousedown',proBallDown);
	addEventHander(volumeBall,'mousedown',volumeBallDown);	