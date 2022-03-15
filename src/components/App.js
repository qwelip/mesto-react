import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState } from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({isOpened: false});

  const closeAllPopup = () => {
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

  return (
    <div className="page">
      <Header/>
      <Main
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        isEditProfilePopupOpen = {isEditProfilePopupOpen}
        isAddPlacePopupOpen = {isAddPlacePopupOpen}
        isEditAvatarPopupOpen = {isEditAvatarPopupOpen}
        closeAllPopup = {closeAllPopup}
        card = {selectedCard}
        onCardClick = {handleCardClick}
      />
      <Footer/>
    </div>
  );
}

export default App;
