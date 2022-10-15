import "../index.css";
import { useState, useEffect } from "react";

import Header from "../components/Header";
import Main from "../components/Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
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
  const [cards, setCards] = useState([]);

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

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
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
  //Редактирование профиля
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

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //Взаимодействие с карточками
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => {
            return c._id !== card._id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
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
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseEsc={closeOnEsc}
          onAddPlace={handleAddPlaceSubmit}
        />

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
