import React, { useEffect, useState } from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import pencilImg from '../images/pencil.svg';
import plusImg from '../images/plus.svg';
import api from '../utils/Api';
 
const Main = ({
    onEditProfile, 
    onAddPlace, 
    onEditAvatar,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    closeAllPopup,
    card,
    onCardClick
  }) => {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
      ])
      .then( res => {
        setUserName(res[0].name);
        setUserDescription(res[0].about);
        setUserAvatar(res[0].avatar);
        setCards(res[1]);
      })
    }, [])

  return (
    <>
      <main className="main">
        <section className="profile">
          <div className="profile__photo-edit">
            <button 
              className="profile__pencil"
              onClick={onEditAvatar}
            />
            <div
              className="profile__avatar" 
              style={{backgroundImage: `url(${userAvatar})`}}
            />
          </div>
          <div className="profile__info">
            <div className="profile__flexRow">
              <h1 className="profile__title">{userName}</h1>
              <button
                type="button" 
                className="profile__editProfile"
                onClick={onEditProfile}
              >
                <img src={pencilImg} alt="Иконка карандаша" className="profile__icon"/>
              </button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
          <button 
            type="button" 
            className="profile__addNewCard"
            onClick={onAddPlace}
          >
            <img className="profile__plus" src={plusImg} alt="Иконка плюса"/>
          </button>
        </section>

        <section className="elements">
          {
            cards.map( card => (
                <Card key={card._id} onCardClick={onCardClick} {...card}/>
              )
            )
          }
        </section>
      </main>

      <ImagePopup
        card={card}
        onClose={closeAllPopup}
      />

      <PopupWithForm
        name='profile-edit'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
      >
        <label className="popup__field">
          <input
            id="userName"
            name="name"
            className="popup__input"
            type="text"
            required minLength="2"
            maxLength="40"
            placeholder="Введите имя"
          />
          <span className="popup__error userName-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            id="userOccupation"
            name="about"
            className="popup__input"
            type="text"
            required minLength="2"
            maxLength="200"
            placeholder="Ваш род деятельности"
          />
          <span className="popup__error userOccupation-input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name='add-card'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopup}
      >
        <label className="popup__field">
          <input id="placeName" name="name" className="popup__input" type="text" required placeholder="Название" minLength="2" maxLength="30"/>
          <span className="popup__error placeName-input-error"></span>
        </label>
        <label className="popup__field">
          <input id="pictureUrl" name="link" className="popup__input" type="url" required placeholder="Ссылка на картинку"/>
          <span className="popup__error pictureUrl-input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name='edit-avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopup}
      >
        <label className="popup__field">
          <input id="avatarPicture" name="avatarPicture" className="popup__input popup__input_type_edit-avatar" placeholder="Ссылка на картинку" type="url" required/>
          <span className="popup__error avatarPicture-input-error"></span>
        </label>
      </PopupWithForm>

    </>
  );
};

export default Main;