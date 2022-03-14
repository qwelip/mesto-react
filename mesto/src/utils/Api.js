class Api{
  constructor({cardsUrl, updateUserInfoUrl, getUserInfoUrl, token}, handleError) {
    this._cardsUrl = cardsUrl;
    this._updateUserInfoUrl = updateUserInfoUrl;
    this._getUserInfoUrl = getUserInfoUrl;
    this._token = token;
    this._handleError = handleError;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => this.handleResponse(res))
    .catch ((error) => this._handleError(error))
  }

  getUserInfo() {
    return fetch(this._getUserInfoUrl, {
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    }
    })
    .then((res) => this.handleResponse(res))
    .catch((error) => this._handleError(error))
  }

  setUserInfo = ({name, about}) => {
    return fetch(`${this._updateUserInfoUrl}/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
  }

  addNewCard({name, link}) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  deleteCard = (cardId) => {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
  }

  addLike = (cardId) => {
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
  }

  deleteLike = (cardId) => {
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
  }

  changeAvatar = (url) => {
    return fetch(`${this._updateUserInfoUrl}/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    })
  }
}

// перенести в папку ютилз константы

const api = new Api ({
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort36/cards',
  updateUserInfoUrl: 'https://mesto.nomoreparties.co/v1/cohort36/users',
  getUserInfoUrl: 'https://nomoreparties.co/v1/cohort36/users/me',
  token: 'edd7092a-48ca-4ae4-81a0-05e569754f8c'
  },
  // handleError сделать обработчик ошибок или удалить его 
)

export default api
