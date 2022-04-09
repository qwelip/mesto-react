import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/Api";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({isOpened: false});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({isOpened: false})
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (data) => {
    setSelectedCard({isOpened: true, ...data})
  }

  function handleUpdateUser({name, about}) {
    api.setUserInfo({name, about})
      .then(res => res.json())
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
  }

  function handleUpdateAvatar({avatar}) {
    api.changeAvatar(avatar)
      .then(res => res.json())
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addNewCard({name, link})
      .then(res => res.json())
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card.cardId, isLiked).then(res => res.json()).then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card.cardId ? newCard : c));
    });
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then(res => res.json()).then( () => {
      setCards( cards => cards.filter( c => c._id !== cardId))
    })
  }

  useEffect( () => {
    api.getUserInfo()
      .then((data) => setCurrentUser(data))
    api.getInitialCards()
      .then( data => setCards(data))
  }, [])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}
          closeAllPopups = {closeAllPopups}
          selectedImgCard = {selectedCard}
          cards = {cards}
          onCardClick = {handleCardClick}
          onCardLike = {handleCardLike}
          onCardDelete = {handleCardDelete}
        />
        <Footer/>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />
        
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
