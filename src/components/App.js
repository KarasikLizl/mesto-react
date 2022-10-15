import "../index.css";
import { useState, useEffect } from "react";

import Header from "../components/Header";
import Main from "../components/Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/Api";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSelectedCardOpen, setIsSelectedCardOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsSelectedCardOpen(!isSelectedCardOpen);
  }

  function handleUpdateUser(userInfo) {
    api
      .editUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .editAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
    setIsSelectedCardOpen(false);
  }

  function closeOnEsc(event) {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        ></Main>
        <template id="card-template" />

        {/* попап редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onCloseEsc={closeOnEsc}
        />

        {/* попап нового аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onCloseEsc={closeOnEsc}
        />

        {/* попап добавления картинки */}
        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseEsc={closeOnEsc}
          title="Новое место"
          name="photo_add"
          buttonType="submit-button_type_photo"
          buttonName="Создать"
        >
          <input
            type="text"
            id="photo-name"
            placeholder="Название"
            className="form__input form__input_field_title"
            name="name"
            minLength={2}
            maxLength={30}
            required
          />
          <span className="form__input-error photo-name-error" />
          <input
            type="url"
            id="link"
            placeholder="Ссылка на картинку"
            className="form__input form__input_field_photo"
            name="link"
            required
          />
          <span className="form__input-error link-error" />
        </PopupWithForm>

        {/* попап подтверждения удаление */}
        <PopupWithForm
          isOpen={isConfirmationPopupOpen}
          onCloseEsc={closeOnEsc}
          title="Вы уверены?"
          name="photo_delete"
          buttonType="confirm-button"
          buttonName="Да"
        ></PopupWithForm>

        {/* попап картинки */}
        <ImagePopup
          card={selectedCard}
          onClose={() => {
            closeAllPopups();
          }}
          onCloseEsc={closeOnEsc}
          isOpen={isSelectedCardOpen}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
