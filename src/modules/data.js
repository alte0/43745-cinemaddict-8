import {getRndInteger} from './util';

const MIN_NUM = 0;
const maxNums = [3, 4, 5, 6, 7, 14];

export const filters = [
  {
    caption: `All movies`,
    href() {
      return `ALL`;
    },
    isActive: true,
  },
  {
    caption: `Watchlist`,
    href() {
      return this.caption;
    },
    amount: `13`
  },
  {
    caption: `History`,
    href() {
      return this.caption;
    },
    amount: `4`
  },
  {
    caption: `Favorites`,
    href() {
      return this.caption;
    },
    amount: `8`
  },
  {
    caption: `Stats`,
    href() {
      return this.caption;
    },
    isAdditional: true
  },
];
export const card = () => ({
  name: [
    `Love and pigeons`,
    `Ivan Vasilyevich changes profession`,
    `The Shawshank redemption`,
    `Green mile`,
    `Forrest Gump`,
    `Leone`,
    `Lion-king`,
    `Fight club`,
    `Godfather`,
    `Pulp fiction`,
    `Operation "y" and other Shurik's adventures`,
    `Lord of the rings: Return of the King`,
    `Back to the future`,
    `Cards, money, two barrels`,
    `Diamond hand`,
  ][getRndInteger(MIN_NUM, maxNums[5])],
  rating: [
    `9.8`,
    `10.0`,
    `5.6`,
    `7.7`
  ][getRndInteger(MIN_NUM, maxNums[1])],
  year: [2018, 2006, 2000][getRndInteger(MIN_NUM, maxNums[0])],
  duration: [
    `1h 13m`,
    `1h 26m`,
    `1h 06m`,
    `1h 30m`
  ][getRndInteger(MIN_NUM, maxNums[1])],
  genre: [
    `Comedy`,
    `Militant`,
    `Thriller`,
    `Fantasy`,
    `Drama`,
    `Horror`,
    `Animation`
  ][getRndInteger(MIN_NUM, maxNums[4])],
  imgSource: [
    `accused.jpg`,
    `blackmail.jpg`,
    `blue-blazes.jpg`,
    `fuga-da-new-york.jpg`,
    `moonrise.jpg`,
    `three-friends.jpg`,
  ][getRndInteger(MIN_NUM, maxNums[3])],
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.Nunc fermentum tortor ac porta dapibus.In rutrum ac purus sit amet tempus.`
  ][getRndInteger(MIN_NUM, maxNums[0])],
  amountComments: [0, 2, 5, 8, 13][getRndInteger(MIN_NUM, maxNums[2])]
});
