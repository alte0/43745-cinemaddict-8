export const filters = [
  {
    caption: `All movies`,
    get href() {
      return `ALL`;
    },
    isActive: true
  },
  {
    caption: `Watchlist`,
    get href() {
      return this.caption;
    },
    amount: `0`
  },
  {
    caption: `History`,
    get href() {
      return this.caption;
    },
    amount: `0`
  },
  {
    caption: `Favorites`,
    get href() {
      return this.caption;
    },
    amount: `0`
  },
  {
    caption: `Stats`,
    get href() {
      return this.caption;
    },
    isAdditional: true
  }
];
