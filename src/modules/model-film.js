class ModelFilm {
  constructor(data) {
    this.id = data.id;
    this.comments = data.comments;
    this.actors = data.film_info.actors;
    this.ageLimit = data.film_info.age_rating;
    this.title = data.film_info.title;
    this.alternativeTitle = data.film_info.alternative_title;
    this.description = data.film_info.description;
    this.director = data.film_info.director;
    this.genres = data.film_info.genre;
    this.imgSource = data.film_info.poster;
    this.releaseDate = data.film_info.release.date;
    this.releaseCountry = data.film_info.release.release_country;
    this.duration = data.film_info.runtime;
    this.rating = data.film_info.total_rating;
    this.writers = data.film_info.writers;
    this.isWatched = data.user_details.already_watched;
    this.isFavorite = data.user_details.favorite;
    this.isWatchlist = data.user_details.watchlist;
    this.ratingUser = data.user_details.personal_rating;
  }

  // toRAW() {
  //   return {
  //     'id': this.id,
  //     'title': this.title,
  //     'due_date': this.dueDate,
  //     'tags': [...this.tags.values()],
  //     'picture': this.picture,
  //     'repeating_days': this.repeatingDays,
  //     'color': this.color,
  //     'is_favorite': this.isFavorite,
  //     'is_done': this.isDone,
  //   };
  // }

  static parseFilm(data) {
    return new ModelFilm(data);
  }

  static parseFilms(data) {
    return data.map(ModelFilm.parseFilm);
  }
}

export {ModelFilm};
