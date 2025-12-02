// AudioController.js

export const AudioController = (() => {
  const audioWrapper = document.querySelector('.audio-icon-wrapper');
  const audioIcon = document.querySelector('.audio-icon-wrapper i');
  const song = document.querySelector('#song');

  let isPlaying = false;

  const init = () => {
    if (!song) return;
    song.pause();
    song.currentTime = 0;
    if (audioWrapper) audioWrapper.style.display = 'none';
  };

  const play = () => {
    if (!song) return;
    audioWrapper.style.display = 'flex';
    song.play();
    isPlaying = true;

    audioIcon.classList.add('fa-circle-pause');
    audioIcon.classList.remove('fa-circle-play');
  };

  const toggle = () => {
    if (!song) return;

    if (isPlaying) {
      song.pause();
      audioIcon.classList.remove('fa-circle-pause');
      audioIcon.classList.add('fa-circle-play');
    } else {
      song.play();
      audioIcon.classList.add('fa-circle-pause');
      audioIcon.classList.remove('fa-circle-play');
    }
    isPlaying = !isPlaying;
  };

  // add toggle click listener automatically
  const bindEvents = () => {
    if (audioWrapper) {
      audioWrapper.onclick = toggle;
    }
  };

  return {
    init,
    play,
    toggle,
    bindEvents
  };
})();
