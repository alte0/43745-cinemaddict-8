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

  toRAW() {
    return {
      "id": this.id,
      "film_info": {
        "title": this.title,
        "alternative_title": this.alternativeTitle,
        "total_rating": this.rating,
        "poster": this.imgSource,
        "age_rating": this.ageLimit,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "release": {
          "date": this.releaseDate,
          "release_country": this.releaseCountry
        },
        "runtime": this.duration,
        "genre": this.genres,
        "description": this.description
      },
      "user_details": {
        "personal_rating": this.ratingUser,
        "watchlist": this.isWatchlist,
        "already_watched": this.isWatched,
        "favorite": this.isFavorite
      },
      "comments": this.comments
    };
  }

  static parseFilm(data) {
    return new ModelFilm(data);
  }

  static parseFilms(data) {
    return data.map(ModelFilm.parseFilm);
  }
}

export {ModelFilm};
