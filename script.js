console.log("Welcome to Spotify")

let songIndex = 0;
let masterPlay = document.getElementById('masterPlay')
let gif = document.getElementById('gif')
let myProgressBar = document.getElementById('myProgressBar')
let songItem = Array.from(document.getElementsByClassName('songItem'))
let previous = document.getElementById('previous')
let next = document.getElementById('next')
let masterSongName = document.getElementById('masterSongName')
let check = document.getElementById('check');

let autoPlay = false;
check.addEventListener('change', () => {
    if (check.checked) {
        autoPlay = true;
    }
    else {
        autoPlay = false
    }
})

let songs = [
    { songName: "Senorita - Shawn Mendes", filePath: "songs/1", coverPath: "covers/1.jpg" },
    { songName: "Love Me Like You Do - Ellie Goulding", filePath: "songs/2", coverPath: "covers/2.jpg" },
    { songName: "Apna Bana Le - Bhediya", filePath: "songs/3", coverPath: "covers/3.jpg" },
    { songName: "Pehla Pyaar - Kabir Singh", filePath: "songs/4", coverPath: "covers/4.jpg" },
    { songName: "Cheap Thrills - Sia", filePath: "songs/5", coverPath: "covers/5.jpg" },
    { songName: "Closer - Chainsmokers", filePath: "songs/6", coverPath: "covers/6.jpg" },
    { songName: "Rasiya - Brahmastra", filePath: "songs/7", coverPath: "covers/7.jpg" }
]

songItem.forEach((element, i) => {
    element.querySelector('img').src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
})

let audioElement = new Audio('songs/1.mp3')

masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime == 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1
        let item = document.getElementById(`${songIndex}`)
        item.classList.remove('fa-circle-play')
        item.classList.add('fa-circle-pause')
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0
        makeAllPlay()
    }
})

audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress
})

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

let previousTarget = null;
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {

    element.addEventListener('click', (e) => {
        const currentTarget = e.target;

        const playSong = (time) => {
            songIndex = parseInt(e.target.id)
            makeAllPlay();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex + 1}.mp3`
            audioElement.currentTime = time;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            masterSongName.innerText = songs[songIndex].songName
            gif.style.opacity = 1
        }

        // Run this code if song is paused
        if (audioElement.paused) {
            if (audioElement.currentTime == 0) {
                playSong(0)
            }
            else {
                if (previousTarget == currentTarget) {
                    playSong(myProgressBar.value * audioElement.duration / 100);
                }
                else {
                    playSong(0);
                }
            }

        }

        // Run this code if song is already playing
        else {
            // Run this code if currently playing song is clicked
            if (e.target.classList.contains('fa-circle-pause')) {
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause')
                masterPlay.classList.add('fa-circle-play')
                gif.style.opacity = 0
            }
            // Run this code if some other song is clicked
            else {
                playSong(0)
            }

        }

        previousTarget = currentTarget;

    })
})

audioElement.addEventListener('ended', () => {
    if (autoPlay) {
        makeAllPlay();
        if (songIndex >= 6) {
            songIndex = 0
        }
        else {
            songIndex += 1;
        }
        changeSong();
    }
    else {
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0
    }
})

const changeSong = () => {
    let item = document.getElementById(`${songIndex}`)
    audioElement.src = `songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    masterSongName.innerText = songs[songIndex].songName
    gif.style.opacity = 1
    makeAllPlay();
    item.classList.remove('fa-circle-play')
    item.classList.add('fa-circle-pause')
}

next.addEventListener('click', () => {
    if (songIndex >= 6) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    changeSong();
})

previous.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 6
    }
    else {
        songIndex -= 1
    }
    changeSong();
})

