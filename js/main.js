const movie = document.querySelector('.movie');
const tvshow = document.querySelector('.tvshow');
const song = document.querySelector('.song');
const video_template = document.querySelector(".video-template");
const audio_player = document.querySelector(".audio-player");

const video = document.querySelector('.video');
const audio = document.querySelector(".audio");

movie.onclick = function(){
    video.src = "videos/video1.mp4";
    video_template.style.display = "block";
    audio_player.style.display = "none";
    audio.load();
    video.load();
}

tvshow.onclick = function(){
    video.src = "videos/video2.mp4";
    video_template.style.display = "block";
    audio_player.style.display = "none";
    audio.load();
    video.load();
}

song.onclick = function(){
    video_template.style.display = "none";
    audio_player.style.display = "block";
    video.load();
    audio.load();
}

// to play/pause the video
const toggle_play = document.querySelector('.toggle_play');
toggle_play.onclick = function(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    toggle_play.classList.toggle("fa-pause");
    toggle_play.classList.toggle("fa-play");
}

const volume = document.querySelector('.toggle_volume');
const volume_change = document.querySelector('.volume_change');

// to mute/unmute sound
const lastVolume = 10;
volume.onclick = function() {
	if(video.volume) {
        volume_change.value = 0;
		lastVolume = video.volume;
		video.volume = 0;
	} else {
        volume_change.value = lastVolume;
		video.volume = lastVolume;
	}
    volume.classList.toggle("fa-volume-up");
    volume.classList.toggle("fa-volume-mute");
}

// to init video information after a success metadata load
video.onloadedmetadata = function() {
    console.log('video metadata loaded!');
    const max_of_steps = Math.floor(video.duration).toString(10);
    video_state.setAttribute('max',max_of_steps);
    total_time.innerHTML = `${neatTime(video.duration)}`;
};

const video_state = document.querySelector('.video_state');
const current_time = document.querySelector('.current_time');
const total_time = document.querySelector('.total_time');

function neatTime(time) {
    //const hours = Math.floor((time % 86400)/3600)
    const minutes = Math.floor((time % 3600)/60);
    const seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds:`0${seconds}`;
    minutes = minutes > 9 ? minutes:`0${minutes}`;
    //hours = hours > 9 ? hours:`0${hours}`;
    return /*${hours}:*/`${minutes}:${seconds}`;
}

// when a user change the current video time
video_state.oninput = function() {
    video.currentTime = video_state.value;
}

video.ontimeupdate = function() {
    video_state.value = video.currentTime;
    current_time.innerHTML = `${neatTime(video.currentTime)}`;
}

// to hide/show subtitles
const captioning = document.querySelector('.captioning');
captioning.onclick = function() {
    if(video.textTracks[0].mode == 'showing'){
        video.textTracks[0].mode = 'hidden';
    }else{
        video.textTracks[0].mode = 'showing'
    }
    captioning.classList.toggle("far");
    captioning.classList.toggle("fas");
}

// when a video ending
video.onended = function(){
    toggle_play.classList.toggle("fa-pause");
    toggle_play.classList.toggle("fa-play");
}
  
const audio_state = document.querySelector('.audio_state');
const playbackTime = document.querySelector('.playback-time');

audio.onloadedmetadata = function(){
    console.log('audio metadata loaded!');
    const max_of_steps = Math.floor(audio.duration).toString(10);
    audio_state.setAttribute('max',max_of_steps);
    let currentTimeString = neatTime2(audio.currentTime);
    let durationString = neatTime2(audio.duration);
    playbackTime.innerHTML = currentTimeString + " / " + durationString;
}

audio.ontimeupdate = function(){
    let currentTimeString = neatTime2(audio.currentTime);
    let durationString = neatTime2(audio.duration);
    playbackTime.innerHTML = currentTimeString + " / " + durationString;
    audio_state.value = audio.currentTime;
}

audio.onended = function(){
    audio.pause();
    playAudio.style.display = "";
    pauseAudio.style.display = "none";
}

const playAudio = document.querySelector(".play");
const pauseAudio = document.querySelector(".pause");
playAudio.onclick = togglePlay;
pauseAudio.onclick = togglePlay;
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playAudio.style.display = "none";
        pauseAudio.style.display = "";
    } else {
        audio.pause();
        playAudio.style.display = "";
        pauseAudio.style.display = "none";
    }
}

audio_state.oninput = function() {
    audio.currentTime = audio_state.value;
}

function neatTime2(s) {
    const minutes = Math.floor(s / 60).toString();
    const seconds = Math.floor(s % 60).toString();
    return minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
}

const transcript = document.getElementById("transcript");
const transcript_data = document.getElementById("transcript_data");
transcript.onclick = function(){
    if(transcript.textContent == "Show transcript"){
        transcript_data.style.display = "block";
        transcript.innerText = "Hide transcript";
    }else{
        transcript_data.style.display = "none";
        transcript.innerText = "Show transcript";
    }
}