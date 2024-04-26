const data = [

  {
    title: 'hotel',
    description: 'Стильный интерьер, созданный по мотивам мифов Древней Греции, очаровывает с первого взгляда. Мягкое освещение, изящная мебель и ненавязчивая музыка создают атмосферу уюта и расслабления.',
    image: 'assets/images/home/services/hotel.jpg',
    color: '#fdf4e3',
  },
  {
    title: 'summer restaurant',
    description: 'Стильный интерьер, созданный по мотивам мифов Древней Греции, очаровывает с первого взгляда. Мягкое освещение, изящная мебель и ненавязчивая музыка создают атмосферу уюта и расслабления.',
    image: 'assets/images/home/services/summer-restaurant.jpg',
    color: '#fafff3',
  },

  {
    title: 'restaurant',
    description: 'Стильный интерьер, созданный по мотивам мифов Древней Греции, очаровывает с первого взгляда. Мягкое освещение, изящная мебель и ненавязчивая музыка создают атмосферу уюта и расслабления',
    image: 'assets/images/home/services/restaurant.jpg',
    color: '#fdf4e3',
  },
  {
    title: 'Летний ресторан',
    description: 'Стильный интерьер, созданный по мотивам мифов Древней Греции, очаровывает с первого взгляда. Мягкое освещение, изящная мебель и ненавязчивая музыка создают атмосферу уюта и расслабления',
    image: 'assets/images/home/services/summer-restaurant.jpg',
    color: '#fafff3',
  },
  {
    title: 'ресторан',
    description: 'Стильный интерьер, созданный по мотивам мифов Древней Греции, очаровывает с первого взгляда. Мягкое освещение, изящная мебель и ненавязчивая музыка создают атмосферу уюта и расслабления',
    image: 'assets/images/home/services/hotel.jpg',
    color: '#fdf4e3',
  },
  {
    title: 'karaoke',
    description: 'Стильный интерьер, созданный по мотивам мифов Древней Греции, очаровывает с первого взгляда. Мягкое освещение, изящная мебель и ненавязчивая музыка создают атмосферу уюта и расслабления',
    image: 'assets/images/home/services/karaoke.jpg',
    color: '#fafff3',
  },
]

const _ = (id) => document.getElementById(id)
// const cards = data.map((i, index) => `<div class="card has-border-card" id="card${index}" style="background-image:url(${i.image})"  ></div> `).join('');
const cards = data.map((i, index) => {
  if (index === 0) {
    return `<div class="card" id="card${index}" style="background-image:url(${i.image})"></div>`;
  } else {
    return `<div class="card has-border-card" id="card${index}" style="background-image:url(${i.image})"></div>`;
  }
}).join('');


const cardContents = data.map((i, index) => `<div class="card-content" id="card-content-${index}">
<div class="content-title-1">${i.title}</div>
</div>`).join('')


const sildeNumbers = data.map((_, index) => `<div class="item" id="slide-item-${index}" >${index + 1}</div>`).join('')
_('demo').innerHTML = cards + cardContents


// Add event listeners to pagination arrows
document.querySelector('.arrow-left').addEventListener('click', handlePagination);
document.querySelector('.arrow-right').addEventListener('click', handlePagination);

// Function to handle pagination
function handlePagination(event) {
  if (event.currentTarget.classList.contains('arrow-left')) {
    // Handle left arrow click (e.g., go to the previous slide)
    clicks += 1;
    step();
  } else if (event.currentTarget.classList.contains('arrow-right')) {
    // Handle right arrow click (e.g., go to the next slide)
    clicks += 1;
    step();
  }
}


const range = (n) =>
  Array(n)
    .fill(0)
    .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}

function getCardContent(index) {
  return `#card-content-${index}`;
}

function getSliderItem(index) {
  return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = [0, 1, 2, 3, 4, 5];
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = 'sine.inOut';

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? '#details-even' : '#details-odd';
  const detailsInactive = detailsEven ? '#details-odd' : '#details-even';
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set('#pagination', {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set('nav', { y: -200, opacity: 0 });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set('.progress-sub-foreground', {
    width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 15,
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });


  const startDelay = 0.6;

  gsap.to('.cover', {
    x: width + 400,
    delay: 0.5,
    ease,
  });
  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });
  gsap.to('#pagination', { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to('nav', { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let clicks = 0;


function step(reverse = false) {
  return new Promise((resolve) => {
    if (reverse) {
      order.unshift(order.pop());
      detailsEven = !detailsEven;
    } else {
      order.push(order.shift());
      detailsEven = !detailsEven;
    }

    const detailsActive = detailsEven ? '#details-even' : '#details-odd';
    const detailsInactive = detailsEven ? '#details-odd' : '#details-even';

    document.querySelector(`${detailsActive} .place-box .text`).textContent =
      data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
      data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
      data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent =
      data[order[0]].description;
    _('services').style.backgroundColor = data[order[0]].color

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });

    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      onComplete: resolve,
      ease,
    });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    document.querySelector(`#card${active}`).classList.remove('has-border-card');

    // Add 'has-border-card' class back to the previous active card
    document.querySelector(`#card${prv}`).classList.add('has-border-card');

    rest.forEach((i) => {
      document.querySelector(`#card${i}`).classList.add('has-border-card');
    });


    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    gsap.to(getSliderItem(active), { x: 0, ease });
    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    gsap.to('.progress-sub-foreground', {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 15,
      onComplete: () => {
        gsap.to(`${detailsActive} .desc`, { y: 1 });
        gsap.to(`${detailsActive} .desc`, { y: 0 });

        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 15,
          scale: 1,
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });
        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
        clicks -= 1;
        if (clicks > 0) {
          step();
        }
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          ease,
          delay: 0.1 * (index + 1),
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          ease,
          delay: 0.1 * (index + 1),
        });
        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
      }
    });
  });
}

// Modify the handlePagination function to pass a parameter to step function
function handlePagination(event) {
  if (event.currentTarget.classList.contains('arrow-left')) {
    clicks += 1;
    step(true); // Pass true to reverse the animation
  } else if (event.currentTarget.classList.contains('arrow-right')) {
    clicks += 1;
    step();
  }
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    await loadImages();
    init();
  } catch (error) {
    console.error('One or more images failed to load', error);
  }
}

start()