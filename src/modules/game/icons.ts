const images: any = {};

for (let index = 1; index <= 100; index++) {
  images['img' + index] = require('../../assets/icons/' + index + '.png');
}

export default images;
