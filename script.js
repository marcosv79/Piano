//Botões piano
const buttons = document.querySelectorAll('.key');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const note = button.getAttribute('data-note');
    const audio = document.getElementById(note);
    audio.currentTime = 0; 
    audio.play();
  });
});

const fileInput = document.getElementById('file-input');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const player = document.getElementById('player');

//Botão escolher ficheiro
fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const fileURL = URL.createObjectURL(file);
  player.src = fileURL;
});

player.addEventListener('timeupdate', function() {
  const musicTime = document.querySelector('#musicTime');
  const currentTime = player.currentTime;
  const duration = player.duration;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const totalMinutes = Math.floor(duration / 60);
  const totalSeconds = Math.floor(duration % 60);
  musicTime.innerText = `${minutes}:${seconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
});

//Botão play
playBtn.addEventListener('click', function() {
  player.play();
});

//Botão pause
pauseBtn.addEventListener('click', function() {
  player.pause();
});

//Botão stop
stopBtn.addEventListener('click', function() {
  player.pause();
  player.currentTime = 0;
});

var audio = document.querySelector('audio');

var audioContext = new AudioContext();

var analyserNode = audioContext.createAnalyser(); //Analisar a amplitude e frequência do áudio

var sourceNode = audioContext.createMediaElementSource(audio);
sourceNode.connect(analyserNode);
analyserNode.connect(audioContext.destination);

analyserNode.fftSize = 2048; //Resolução da análise de frequência
var bufferLength = analyserNode.frequencyBinCount; //Dados da frequência
var dataArray = new Uint8Array(bufferLength); //Dados da amplitude

var canvas = document.getElementById('canvas1');
var canvasCtx = canvas.getContext('2d');
//Tamanho da classe equ
var equ = document.querySelector('.equ'); 
canvas.width = equ.clientWidth;
canvas.height = equ.clientHeight;

//BarGraph
function drawBarGraph() {
  requestAnimationFrame(drawBarGraph); 

  analyserNode.getByteFrequencyData(dataArray);

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height); //Limpeza no canvas

  var barWidth = canvas.width / bufferLength * 30;
  var barHeight;
  var numBars = Math.floor(canvas.width / barWidth);
  var x = (canvas.width - numBars * barWidth) / 2;

  for(var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 5;

    canvasCtx.fillStyle = 'rgb(50,50,' + (barHeight+100) + ')';
    canvasCtx.fillRect(x,canvas.height-barHeight,barWidth,barHeight);

    x += barWidth + 1;
  }
}
drawBarGraph();

var canvas2 = document.getElementById('canvas2');
var canvasCtx2 = canvas2.getContext('2d');

analyserNode.fftSize = 2048;
var bufferLength2 = analyserNode.fftSize;
var dataArray2 = new Uint8Array(bufferLength2);

//Wave
function drawWave() {
  requestAnimationFrame(drawWave);

  analyserNode.getByteTimeDomainData(dataArray2);

  canvasCtx2.clearRect(0, 0, canvas2.width, canvas2.height);

  canvasCtx2.strokeStyle = 'blue';
  canvasCtx2.lineWidth = 2;

  canvasCtx2.beginPath();

  //Largura de cada segmento da linha
  var sliceWidth = canvas2.width * 1.0 / (bufferLength2 - 1); //Largura de cada segmento da linha da onda

  //Percorrer cada alemento do dataArray2 que representam um ponto na onda
  for(var i = 0; i < bufferLength2; i++) {
    var v = dataArray2[i] / 128.0; //Valores entre -1 e 1
    var y = v * canvas2.height / 2; //Coordenada vertical y

    if(i === 0) {
      canvasCtx2.moveTo(0, y); //Mover para o ponto inicial
    } else {
      canvasCtx2.lineTo(i * sliceWidth, y); //Desenhar linhas conectando os pontos
    }
  }
  canvasCtx2.lineTo(canvas2.width, canvas2.height / 2); //Linha do último ponto, completando a onda
  canvasCtx2.stroke();
}
drawWave();

const paragrafo = document.querySelector('.paragrafo');

paragrafo.addEventListener('mouseover', function() {
  paragrafo.textContent = 'defesa prog web';
});

paragrafo.addEventListener('mouseout', function() {
  paragrafo.textContent = 'rrrrrrrrrrrrrr';
});