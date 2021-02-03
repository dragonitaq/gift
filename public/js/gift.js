new Splide('.splide', {
  type: 'loop',
  autoplay: true,
  interval: 3000,
  cover: true,
  width: '60rem',
  heightRatio: 1,
  lazyLoad: 'nearby',
  preloadPages: 3,
  breakpoints: {
    500: {
      width: '50rem',
    },
    400: {
      width: '40rem',
    },
  },
}).mount();

new Splide('#splide', {
  type: 'loop',
  width: '60rem',
  height: '50rem',
  video: {
    volume: 1,
  },
  breakpoints: {
    500: {
      width: '50rem',
      height: '40rem',
    },
    400: {
      width: '40rem',
      height: '30rem',
    },
  },
}).mount(window.splide.Extensions);
