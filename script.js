const images = document.querySelectorAll('.content__slider .slider-line img');
const sliderLine = document.querySelector('.content__slider .slider-line');
const sliderGallery = document.querySelector('.slider-gallery')
const imgs = sliderLine.querySelectorAll('img');

const container = document.querySelector('.container')
const menu = document.querySelector('.menu')
const menuBtn = document.querySelector(".header__menu")
const menuHeader = document.querySelector('.menu__header')

menuBtn.addEventListener('click', function () {
  menuHeader.style.display = 'none'

  if (menu.style.display === 'none') {
    if (container.clientWidth > 825) {
      menu.style.display = 'block';
      container.style.position = 'relative'
      menu.style.position = 'absolute'
      menu.style.top = '100px'
      menu.style.left = '420px'
    }
    if (container.clientWidth > 690 && container.clientWidth < 825) {
      menu.style.display = 'block';
      container.style.position = 'relative'
      menu.style.position = 'absolute'
      menu.style.top = '100px'
      menu.style.left = container.clientWidth - 420 + 'px'
    }
    if (container.clientWidth < 690) {
      menu.style.display = 'block';
    }
  } else {
    menu.removeAttribute('style')
    menu.style.display = 'none';
  }
})

let count = 0;
let width;

const changeSelect = (item) => {
  const previousSelectedImage = sliderGallery.querySelector('.selected');
  if (previousSelectedImage) {
    previousSelectedImage.classList.remove('selected');
  }
  item.classList.add('selected');
}

const init = () => {
  console.log('resize');
  width = document.querySelector('.content__slider').offsetWidth;
  sliderLine.style.width = width * images.length + 'px';
  images.forEach(item => {
    item.style.width = width + 'px';
    item.style.height = 'auto';
  });
  rollSlider();
}

document.querySelector('.slider-next').addEventListener('click', function () {
  count++;
  if (count >= images.length) {
    count = 0;
  }
  rollSlider();
});

document.querySelector('.slider-prev').addEventListener('click', function () {
  count--;
  if (count < 0) {
    count = images.length - 1;
  }
  rollSlider();
});

function rollSlider() {
  sliderLine.style.transform = 'translate(-' + count * width + 'px)';
}

imgs.forEach(image => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', image.getAttribute('src'));
  sliderGallery.appendChild(newImage);
});

sliderLine.insertAdjacentElement('afterend', sliderGallery);

const galleryImg = sliderGallery.querySelectorAll('img');
galleryImg.forEach((img, id) => {
  img.addEventListener('click', () => {
    count = id;
    changeSelect(img)
    rollSlider();
  });
})

init();
window.addEventListener('resize', init);