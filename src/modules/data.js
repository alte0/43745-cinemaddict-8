import {getRndInteger, getRandomBoolean} from "./util";

const MIN_NUM = 0;
const maxNums = [2, 3, 4, 5, 6, 13];
const cards = [];
let i = 0;

const filters = [
  {
    caption: `All movies`,
    href() {
      return `ALL`;
    },
    isActive: true
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
  }
];
const card = () => ({
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
    `Diamond hand`
  ][getRndInteger(MIN_NUM, maxNums[5])],
  yearManufacture: [
    +new Date(2018, 10, 5),
    +new Date(2006, 3, 25),
    +new Date(2000, 5, 15)
  ][getRndInteger(MIN_NUM, maxNums[0])],
  rating: [`9.8`, `10.0`, `5.6`, `7.7`][getRndInteger(MIN_NUM, maxNums[1])],
  ratingUser: `-`,
  duration: [
    {hours: 1, minutes: 13},
    {hours: 1, minutes: 6},
    {hours: 1, minutes: 30},
    {hours: 0, minutes: 30}
  ][getRndInteger(MIN_NUM, maxNums[1])],
  genre: [`Comedy`, `Thriller`, `Fantasy`, `Drama`, `Horror`, `Animation`],
  imgSource: [
    `accused.jpg`,
    `blackmail.jpg`,
    `blue-blazes.jpg`,
    `fuga-da-new-york.jpg`,
    `moonrise.jpg`,
    `three-friends.jpg`
  ][getRndInteger(MIN_NUM, maxNums[3])],
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.Nunc fermentum tortor ac porta dapibus.In rutrum ac purus sit amet tempus.`
  ][getRndInteger(MIN_NUM, maxNums[0])],
  comments: [
    {
      textComment: `So long-long story, boring!`,
      author: `Tim Macoveev`,
      commentDay: new Date(2019, 2, 1),
      emmojiName: `sleeping`
    }
  ],
  country: [`usa`, `Russia`, `german`, `USSR`][
    getRndInteger(MIN_NUM, maxNums[1])
  ],
  ageLimit: [18, 16, 14, 12][getRndInteger(MIN_NUM, maxNums[1])],
  cast: [`Samuel L.Jackson`, `Catherine Keener`, `Sophia Bush`],
  watchlist: getRandomBoolean(),
  watched: getRandomBoolean(),
  favorite: getRandomBoolean()
});

while (i < 8) {
  cards.push(card());
  i++;
}

export {filters, card, cards};
