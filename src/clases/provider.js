import {ModelFilm} from "../modules/model-film";

const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

export class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
    this._needSync = false;
  }

  _isOnline() {
    return window.navigator.onLine;
  }

  updateMovie({id, data}) {
    if (this._isOnline()) {
      return this._api.updateMovie({id, data})
      .then((movie) => {
        this._store.setItem({key: movie.id, item: movie.toRAW()});
        return movie;
      });
    } else {
      const movie = data;
      this._needSync = true;
      this._store.setItem({key: movie.id, item: movie});
      return Promise.resolve(ModelFilm.parseFilm(movie));
    }
  }

  getMovies() {
    if (this._isOnline()) {
      return this._api.getMovies()
      .then((movies) => {
        movies.map((movie) => this._store.setItem({key: movie.id, item: movie.toRAW()}));
        return movies;
      });
    } else {
      const rawMoviesMap = this._store.getAll();
      const rawMovies = objectToArray(rawMoviesMap);
      const movies = ModelFilm.parseFilms(rawMovies);
      return Promise.resolve(movies);
    }
  }

  syncTasks() {
    return this._api.syncTasks({tasks: objectToArray(this._store.getAll())});
  }
}
