
window.addEventListener('DOMContentLoaded', () => {

const inputs = document.querySelectorAll('.total'),
      reset = document.querySelector('.btn-reset'),
      loadBtn = document.querySelector('.btn-load'),
      loadImg = document.querySelector('.loadImg'),
      btnTotal = document.querySelectorAll('.btn');
let result = document.querySelectorAll('.result');

//Filter Function 
function hundleUpdate() {
 switch(this.name) {
  case('blur'):
  result[0].value = this.value;
  break;
  case('invert'):
  result[1].value = this.value;
  break;
  case('sepia'):
  result[2].value = this.value;
  break;
  case('saturate'):
  result[3].value = this.value;
  break;
   case('hue'):
  result[4].value = this.value;
  break;
 }
const suffix = this.dataset.sizing || '';
document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}
//Function Reset Filters
reset.addEventListener('click', () => {
   btnTotal.forEach(btn => btn.classList.remove('btn-active'));
   reset.classList.add('btn-active');
  result.forEach(resultInput => resultInput.value = 0);
  inputs.forEach(input => {
    input.value = 0;
    if(input.name == 'saturate') {
      input.value = 100;
      result[3].value = 100;
    }
    const suffix = input.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${input.name}`, input.value + suffix);
  
  });
});

inputs.forEach(input => input.addEventListener('change', hundleUpdate));

//Function Load Image
loadBtn.addEventListener('click', ()=> {
  btnTotal.forEach(btn => btn.classList.remove('btn-active'));
   loadBtn.classList.add('btn-active');
})
 
loadBtn.addEventListener('change', (event) => {
    const fileList = event.target.files;
    file = fileList[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
    loadImg.src = event.target.result;
  });
  reader.readAsDataURL(file);
});

//Fullscreen

    const fullscreenBtn = document.querySelector('.fullscreen');

    document.addEventListener('click', function(e) {
      if(e.target == fullscreenBtn) {
         toggleFullScreen();
      }
    });
    function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}






















})