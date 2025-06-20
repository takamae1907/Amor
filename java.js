document.addEventListener('DOMContentLoaded', () => {
    // Elementos do player
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const playIcon = playBtn.querySelector('i');
    
    // Elementos de informação da música
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');
    
    // Elementos da barra de progresso
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');

    let isPlaying = false;

    // Função para tocar ou pausar a música
    function togglePlay() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            audioPlayer.play();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            audioPlayer.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    }
    
    // Função para formatar o tempo de segundos para MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Função para atualizar a barra de progresso
    function updateProgress() {
        const { duration, currentTime } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        currentTimeEl.textContent = formatTime(currentTime);
    }
    
    // Função para definir o progresso ao clicar na barra
    function setProgress(event) {
        const width = this.clientWidth;
        const clickX = event.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    // Event Listeners
    playBtn.addEventListener('click', togglePlay);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    
    // Atualiza a duração total assim que os metadados da música forem carregados
    // Adicionamos uma verificação para garantir que a duração seja um número
    audioPlayer.addEventListener('loadedmetadata', () => {
        if (audioPlayer.duration && !isNaN(audioPlayer.duration)) {
            totalDurationEl.textContent = formatTime(audioPlayer.duration);
        }
    });

    // Quando a música terminar, reseta o ícone
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    });
});