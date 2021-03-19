
window.addEventListener('DOMContentLoaded', () => {

const inputs = document.querySelectorAll('.total'),
      reset = document.querySelector('.btn-reset'),
      loadBtn = document.querySelector('.btn-load'),
      loadImg = document.querySelector('.loadImg'),
      btnTotal = document.querySelectorAll('.btn'),
      btnSave = document.querySelector('.btn-save'),
      btnNext = document.querySelector('.btn-next');
let result = document.querySelectorAll('.result');



//Canvas
const canvas = document.querySelector('canvas');
let total = 0; 

// База данных фотографий

const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const imagesMorning = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const imagesDay = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const imagesEvening = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const imagesNight = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

const dateNow = new Date();
const dateHours = dateNow.getHours();

// Функция переключателя кнопки и изменения цвета при нажатии
function activeSwitchButton(btns) {
  btnTotal.forEach(btn => btn.classList.remove('btn-active'));
   btns.classList.add('btn-active');
}
// При клике меняем активность 
loadBtn.addEventListener('click', () => {
  activeSwitchButton(loadBtn);
});
// Функция загрузки, отрисовки изображения  в канве и сохранения парметров
function drawImage() {
  const canvas = document.querySelector('canvas');
  const img = new Image();  
  img.setAttribute('crossOrigin', 'anonymous');
 // Функция изменения фото при клике на кнопку Next Picture
changeTimeImg();
function changeTimeImg() {
  let imageSrc, index;
    if(dateHours > 6 && dateHours < 12) {
     index = i % imagesMorning.length;
     imageSrc = base + 'morning/' + imagesMorning[index];
    }
    if(dateHours > 12 && dateHours < 18) {
      index = i % imagesDay.length;
     imageSrc = base + 'day/' + imagesDay[index];
    }
    if(dateHours > 18 && dateHours < 24) {
      index = i % imagesEvening.length;
     imageSrc = base + 'evening/' + imagesEvening[index];
    }
    if(dateHours > 24 && dateHours < 6) {
      index = i % imagesNight.length;
     imageSrc = base + 'night/' + imagesNight[index];
    }
  i++;
  btnNext.disabled = true;
  setTimeout(function() { btnNext.disabled = false }, 1000);
  img.src = imageSrc;
}
// Кнопка по переключению изображений
btnNext.addEventListener('click', () => {
   activeSwitchButton(btnNext);
    changeTimeImg();
  });
  //Загрузка изображения с компьютера
  loadBtn.addEventListener('change', (event) => {
    const fileList = event.target.files;
    file = fileList[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
    img.src = event.target.result;
  });
  reader.readAsDataURL(file);
});
//Отрисовка изображения в канве
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
// Изображению задаем значения из инпутов
    inputs.forEach(input => {
      let suffix = input.dataset.sizing;
      input.addEventListener('input', (e) => {
        ctx.filter = `${e.target.name}(${e.target.value}${suffix})`;
         ctx.drawImage(img, 0, 0);
         ctx.save();
      });
    });
    ctx.drawImage(img, 0, 0);
    ctx.save();
    // Функция сохрания и скачивания изображения
   const downloadImage = function(){
    let link = document.createElement('a');
    link.download = 'filename.jpg';
    link.href = canvas.toDataURL();
    if(total>0) {
      link.click();
      link.remove();
    }
}
// Функция вызова скачивания с помощью кнопки
btnSave.addEventListener('click', () => {
  activeSwitchButton(btnSave);
  total = 1;
  downloadImage();
});
// Обнуление всех значений в канве 
reset.addEventListener('click', () => {
  inputs.forEach(input => {
    let suffix = input.dataset.sizing;
    ctx.filter = `${input.name}(0)`;
    ctx.drawImage(img, 0, 0);
    ctx.save();
if(input.name == 'saturate') {
      ctx.filter = `saturate(100${suffix})`;
      ctx.drawImage(img, 0, 0);
      ctx.save();
    }
    
  });

});
}
}
// Вызов функции
drawImage();
// Меняем значения числовые
inputs.forEach(input => input.addEventListener('change', hundleUpDate));

function hundleUpDate() {
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
}
// Меняем при сбросе числовые значения у инпутов
reset.addEventListener('click', () => {
   activeSwitchButton(reset);
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