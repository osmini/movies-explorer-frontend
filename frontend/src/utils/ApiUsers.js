// класс для работы с api 
class ApiUsers {

  constructor({ headers, baseUrl }){
    this._headers = headers;
    this._baseUrl = baseUrl
  }

  _checkResponse(res){
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Ошибка запроса');
  };

  // изменить данные о профиле с сервера и загрузить на страницу сайта
  patchInfoUserForServer(date){

    return fetch(this._baseUrl + '/users/me' , {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: date.name,
        email: date.email
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }
}

const apiUsers = new ApiUsers({ 
  //baseUrl: 'http://localhost:4000/api',
  baseUrl: 'https://osmimesto.nomoredomains.work/api',
  headers: {
    'Accept': "application/json",
    'Content-Type': 'application/json'
  }
});

export default apiUsers;
