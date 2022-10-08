import "../index.css";
import { useState, useEffect } from "react";

import Header from "../components/Header";
import Main from "../components/Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
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

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsSelectedCardOpen(!isSelectedCardOpen);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
    setIsSelectedCardOpen(false);
  };

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
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseEsc={closeOnEsc}
          title="Редактировать профиль"
          name="profile"
          buttonType="submit-button_type_profile"
          buttonName="Сохранить"
        >
          <input
            type="text"
            id="title-input"
            placeholder="Ваше имя"
            className="form__input form__input_field_username"
            defaultValue="Жак-Ив Кусто"
            name="name"
            minLength={2}
            maxLength={40}
            required
          />
          <span className="form__input-error title-input-error" />
          <input
            type="text"
            id="subtitle-input"
            placeholder="Пара слов о вас"
            className="form__input form__input_field_job"
            defaultValue="Исследователь океана"
            name="about"
            minLength={2}
            maxLength={200}
            required
          />
          <span className="form__input-error subtitle-input-error" />
        </PopupWithForm>

        {/* попап нового аватара */}
        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseEsc={closeOnEsc}
          title="Обновить аватар?"
          name="edit-avatar"
          buttonType="submit-button_type_avatar"
          buttonName="Сохранить"
        >
          <input
            type="url"
            id="avatar"
            placeholder="Ссылка на картинку"
            className="form__input form__input_field_photo"
            name="avatar"
            required
          />
          <span className="form__input-error avatar-error" />
        </PopupWithForm>

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
