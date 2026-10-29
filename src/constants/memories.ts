import type { ImageSourcePropType } from 'react-native';

type Img = ImageSourcePropType;

// Photos are grouped by visual similarity (same place, outfit, or session).
export const memories = [
  {
    title: 'Movie night',
    detail: 'Our little cinema date',
    images: [
      require('../img/cine.jpeg') as Img,
      require('../img/Messenger_creation_4F4F7E27-C2BA-4DA4-853F-D249ABC7AFD8.jpeg') as Img,
      require('../img/Messenger_creation_4E9318FD-89F5-446D-B47B-300E1B91C114.jpeg') as Img,
    ],
    accent: '✦',
  },
  {
    title: 'Our first date',
    detail: 'A favorite first memory',
    images: [
      require('../img/firstdate.jpg') as Img,
      require('../img/IMG_20260716_223036_407.jpg') as Img,
      require('../img/IMG_20260716_223040_285.jpg') as Img,
      require('../img/IMG_20260716_223043_967.jpg') as Img,
      require('../img/IMG_20260716_223048_174.jpg') as Img,
    ],
    accent: '✧',
  },
  {
    title: 'A little sunshine',
    detail: 'My favorite flower moment',
    images: [
      require('../img/sunflower.jpg') as Img,
      require('../img/Messenger_creation_14FB41F2-6789-4FD1-B082-C2028917411C.jpeg') as Img,
      require('../img/Messenger_creation_84E7A176-DDC8-4AEB-926F-8C2E7AFC11C6.jpeg') as Img,
      require('../img/Messenger_creation_173283B4-CDCB-4315-9740-F3C5FD94D6D4.jpeg') as Img,
      require('../img/Messenger_creation_2C7189ED-D4D9-432E-9D1E-862807FB81A2.jpeg') as Img,
      require('../img/Messenger_creation_8EC638EB-6A48-4C9D-A53D-6110EB9B76AD.jpeg') as Img,
      require('../img/Messenger_creation_415FDB18-7E48-4495-8AFF-CFEDBBB9B422.jpeg') as Img,
      require('../img/Messenger_creation_A2AB67BC-AD5D-470D-8659-A49A07FAD3CB.jpeg') as Img,
    ],
    accent: '♡',
  },
  {
    title: 'Sweet treats',
    detail: 'Sharing every little bite',
    images: [
      require('../img/shake.jpg') as Img,
      require('../img/coffee.jpg') as Img,
    ],
    accent: '☼',
  },
  {
    title: 'Photobooth fun',
    detail: 'Silly poses, happy hearts',
    images: [
      require('../img/Photobooth.jpg') as Img,
      require('../img/FB_IMG_1784782926549.jpg') as Img,
      require('../img/FB_IMG_1784783286650.jpg') as Img,
      require('../img/FB_IMG_1784783290116.jpg') as Img,
      require('../img/FB_IMG_1784783301068.jpg') as Img,
      require('../img/FB_IMG_1784783303521.jpg') as Img,
      require('../img/FB_IMG_1784783306613.jpg') as Img,
    ],
    accent: '✦',
  },
  {
    title: 'Mirror moment',
    detail: 'Close, just like this',
    images: [
      require('../img/mirror.jpg') as Img,
      require('../img/mirror2.jpeg') as Img,
      require('../img/mirror3.jpg') as Img,
      require('../img/IMG_20260801_013927_703.jpg') as Img,
    ],
    accent: '♡',
  },
  {
    title: 'Cozy hoodie',
    detail: 'Warm hugs, soft days',
    images: [
      require('../img/hoodie.jpg') as Img,
      require('../img/hoodie2.jpg') as Img,
      require('../img/hoodie3.jpg') as Img,
    ],
    accent: '☼',
  },
  {
    title: 'Mall day',
    detail: 'Wandering, side by side',
    images: [
      require('../img/dartaward.jpg') as Img,
      require('../img/IMG_20260806_172957_213.jpg') as Img,
      require('../img/IMG_20260806_173001_503.jpg') as Img,
      require('../img/IMG_20260806_173003_679.jpg') as Img,
      require('../img/IMG_20260806_173007_452.jpg') as Img,
      require('../img/IMG_20260806_121247_361.jpg') as Img,
      require('../img/IMG_20260806_121248_902.jpg') as Img,
      require('../img/IMG_20260806_121250_528.jpg') as Img,
    ],
    accent: '✧',
  },
];
