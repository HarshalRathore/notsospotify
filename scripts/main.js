
console.log('Welcome to NotSoSpotify!');
console.log('DOM fully loaded and parsed');
// Initialize the variables
var songindex = 0; 
var masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let myvolumebar = document.getElementById('myvolumebar');
let volumesign = document.getElementById('volumesign');

let songlist = [
    {songname: "Let me fook U!", audiopath: "/songs/1.mp3", coverpath: "/images/1.jpg"},
    {songname: "I'm a little bit crazy", audiopath: "/songs/2.mp3", coverpath: "/images/2.jpg"},
    {songname: "I'm a littlerazy", audiopath: "/songs/3.mp3", coverpath: "/images/3.jpg"},
    {songname: "I'm a  bit crazy", audiopath: "/songs/4.mp3", coverpath: "/images/4.jpg"},
    {songname: "I'm a  bit crazy", audiopath: "/songs/5.mp3", coverpath: "/images/5.jpg"},
    {songname: "I'm a little crazy", audiopath: "/songs/6.mp3", coverpath: "/images/6.jpg"},
    {songname: "I'a little bit crazy", audiopath: "/songs/7.mp3", coverpath: "/images/7.jpg"},
    {songname: "'m a little bit crazy", audiopath: "/songs/8.mp3", coverpath: "/images/8.jpg"},
    {songname: "I'm a little bi", audiopath: "/songs/9.mp3", coverpath: "/images/9.jpg"},
    {songname: "I'm a little t crazy", audiopath: "/songs/10.mp3", coverpath: "/images/10.jpg"}
];    

let audioelement = new Audio(songlist[0]['audiopath']);

// Handel play/pause button
// masterplay.addEventListener('click', function () {
//         if (audioelement.paused || audioelement.currentTime <= 0) {
//             var playpromise = audioelement.play().catch((error)=>{
//                 console.log(error);
//             });
//             // var playpromise = audioelement.play();
//             masterplay.className = 'fas fa-pause';
//         }
//         else {
//             if (playpromise != undefined){
//                 playpromise.then(()=>{
//                     audioelement.pause().catch((error)=>{
//                         console.log(error);
//                     });
//                     masterplay.className = 'fas fa-play';
//                 });
//             }
//         }
//     });    
masterplay.addEventListener('click', ()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        masterplay.className = 'fas fa-pause';
        console.log(audioelement.duration)

        // gif.style.opacity = 1;
    }
    else{
        audioelement.pause();
        masterplay.className = 'fas fa-play';
        // gif.style.opacity = 0;
    }
})

    // change progressbar as auido time changes
audioelement.ontimeupdate = () => {
    myprogressbar.value = parseInt((audioelement.currentTime/audioelement.duration) * 100);
    myprogressbar.style.background = "linear-gradient(90deg, rgb(117,252,117) "+myprogressbar.value+"%, rgb(214,214,214) "+myprogressbar.value+"%)";
};

// change audio time as value of progressbar changes.
myprogressbar.addEventListener('change', () =>{
    audioelement.currentTime = (myprogressbar.value / 100) * audioelement.duration;
});

// events for range sliders color mapping when mouse is hovers over it and when it's value is changing.
myprogressbar.addEventListener("mousemove", () => {
    myprogressbar.style.background = "linear-gradient(90deg, rgb(117,252,117) "+myprogressbar.value+"%, rgb(214,214,214) "+myprogressbar.value+"%)";
});
myprogressbar.addEventListener('input', () => {
    myprogressbar.style.background = "linear-gradient(90deg, rgb(117,252,117) "+myprogressbar.value+"%, rgb(214,214,214) "+myprogressbar.value+"%)";
});

// Mapping audio volume to that volumebar at right bottom

function makeallotherpause(element){
    Array.from(document.getElementsByClassName("songitem")).forEach((element) =>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

Array.from(document.getElementsByClassName("songitem")).forEach((element) => {
    addEventListener('click', (event) => {
        makeallotherpause(element);
        event.target.classList.remove('fa-play-circle');
        event.target.classList.add('fa-pause-circle');
        songindex = parseInt(event.target.id);
        // audioelement.src = 'songs/'+event.target.id+'.mp3'; 
        audioelement.src = `songs/${event.target.id}.mp3`; 
        console.log(`songs/${event.target.id}.mp3`);
        audioelement.currentTime = 0;
        audioelement.play();
        masterplay.className = 'fas fa-pause';
    });
});

document.getElementById('forward').addEventListener('click', () => {
    if (songindex > 10){
        songindex = 1;
    }
    else {
        songindex += 1;
    }
    console.log(`songs/${songindex}.mp3`);
    audioelement.src = `songs/${songindex}.mp3`;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.className = 'fas fa-pause';
});

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 1){
        songindex = 10;
    }
    else {
        songindex -= 1;
    }
    // audioelement.src = song
    audioelement.src = `songs/${songindex}.mp3`;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.className = 'fas fa-pause';
});



myvolumebar.value = audioelement.volume * 100;
myvolumebar.addEventListener(('change'), () =>{
    audioelement.volume = myvolumebar.value/100;
    console.log(myvolumebar.value);
    if ( myvolumebar.value <= 50 && myvolumebar.value >= 5){
        volumesign.className = "fas fa-volume-down";
    }
    if(myvolumebar.value == 0){
        volumesign.className = "fas fa-volume-mute";
    }
    if (myvolumebar.value >= 50) {
        volumesign.className = "fas fa-volume-up";
    }
});







// Handeled play/pause button on song list
// Array.from(document.getElementsByClassName("songitem")).forEach((element) =>{
//     addEventListener('click', (event) => {
//         if (event.target.classList[2] == "fa-play-circle"){
//             makeallotherpause(element);
//             if (event.target.classList[2] == "fa-play-circle" && event.target.id == element.id){
//                 // 
//                 event.target.classList.remove('fa-play-circle');
//                 event.target.classList.add('fa-pause-circle');
//                 audioelement.src = "songs/"+parseInt(event.target.id)+".mp3";
//                 audioelement.currentTime = 0;
//                 audioelement.play();
//                 // masterplay.className = "fas fa-pause";
            
//             }
//             else if (event.target.classList[2] == "fa-pause-circle" && event.target.id == element.id){
//                 event.target.classList.remove('fa-pause-circle');
//                 event.target.classList.add('fa-play-circle');
            
//             }
//         }
//         else {
//             audioelement.pause();
//             // masterplay.className = "fas fa-play";
//             if (event.target.classList[2] == "fa-play-circle" && event.target.id == element.id){
//                 // 
//                 event.target.classList.remove('fa-play-circle');
//                 event.target.classList.add('fa-pause-circle');
//             }
//             else if (event.target.classList[2] == "fa-pause-circle" && event.target.id == element.id){
//                 event.target.classList.remove('fa-pause-circle');
//                 event.target.classList.add('fa-play-circle');
            
//             }
//         }

//     });
// });