new Splide('.splide', {
  type: 'loop',
  autoplay: true,
  interval: 3000,
  cover: true,
  width: '60rem',
  heightRatio: 1,
  lazyLoad: 'nearby',
  preloadPages: 3,
}).mount();

new Splide('#splide', {
  type: 'loop',
  width: '80rem',
  autoHeight: true,
  video: {
    volume: 1,
  },
}).mount(window.splide.Extensions);
