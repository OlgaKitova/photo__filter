
window.addEventListener('DOMContentLoaded', () => {

const inputs = document.querySelectorAll('.total'),
      reset = document.querySelector('.btn-reset'),
      loadBtn = document.querySelector('.btn-load--input'),
      loadImg = document.querySelector('.loadImg');
let result = document.querySelectorAll('.result');

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

reset.addEventListener('click', () => {
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

loadBtn.addEventListener('change', () => {
  console.log(loadBtn.value);
  loadImg.src = loadBtn.value;
})





























})