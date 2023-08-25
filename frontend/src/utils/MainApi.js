// апи работы с фильмами
class MainApi {
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

  // все сохраненные фильмы пользователя
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  // сохранить фильм в аккаунт
  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movie),
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  // удалить фильм из аккаунта
  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }
}

const mainApi = new MainApi({
  //baseUrl: 'http://localhost:4000/api',
  baseUrl: 'https://osmimesto.nomoredomains.work/api',
  headers: {
    'Accept': "application/json",
    'Content-Type': 'application/json'
  }
});

export default mainApi;