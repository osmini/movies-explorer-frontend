import { IMG_URL } from '../data/data';

// api получить фильмы от яндекс
class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  // Проверяю ответ сервера
  _checkResponse(res){
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Ошибка запроса');
  };

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      headers: this._headers,
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }
}

const moviesApi = new MoviesApi({
  baseUrl: IMG_URL,
  headers: {
    'Accept': "application/json",
    'Content-Type': 'application/json'
  },
});

export default moviesApi;