import {ModelFilm} from "../modules/model-film";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};
const GoodResponse = {
  START_RESPONSE: 200,
  END_RESPONSE: 300,
};

const checkStatus = (response) => {
  if (response.status >= GoodResponse.START_RESPONSE && response.status < GoodResponse.END_RESPONSE) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (response) => {
  return response.json();
};

export const API = class {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus);
  }

  getMovies() {
    return this._load({url: `movies`})
      .then(toJSON)
      .then(ModelFilm.parseFilms);
  }

  updateMovie({id, data}) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelFilm.parseFilm);
  }

  syncMovies({movie}) {
    return this._load({
      url: `movies/sync`,
      method: `POST`,
      body: JSON.stringify(movie),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }
};
