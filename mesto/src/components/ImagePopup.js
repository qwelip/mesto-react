import React from 'react';

const ImagePopup = () => {
  return (
    <div className="popup popup_type_show-picture">
      <div className="popup__window popup__window_type_picture">
        <button type="button" className="popup__close"></button>
        <div className="popup__pictureContainer">
          <img className="popup__img" src="#" alt=""/>
        </div>
        <p className="popup__subtitle"></p>
      </div>
    </div>
  );
};

export default ImagePopup;