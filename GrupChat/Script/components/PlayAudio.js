
const audioiconwrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon = audioiconwrapper.querySelector('i');
const song = document.querySelector('#song');
let isPlaying = false;

export function playAudio() {
  song.volume = 0.1;
  song.play();
  isPlaying = true;
  audioIcon.classList.remove('fa-circle-play');
  audioIcon.classList.add('fa-circle-pause');
}

export function AudioIcon() {

    audioiconwrapper.onclick = function () {
      if (isPlaying) {
        song.pause();
        audioIcon.classList.remove('fa-circle-pause');
        audioIcon.classList.add('fa-circle-play');
      } else {
        song.play();
        audioIcon.classList.remove('fa-circle-play');
        audioIcon.classList.add('fa-circle-pause');
      }
      isPlaying = !isPlaying;
    };

    document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        song.pause();
        isPlaying = false; // reset status
        audioIcon.classList.remove('fa-circle-pause');
        audioIcon.classList.add('fa-circle-play');
    }
    });
}

