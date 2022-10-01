import '../index.css';
import { useState, useEffect } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  };

  const handleCardClick = (card) => {
    setSelectedCard(card)
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(false);
  };
  
  useEffect(() => {
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape") {
				setSelectedCard(false);
				setIsEditAvatarPopupOpen(false);
    		setIsEditProfilePopupOpen(false);
    		setIsAddPlacePopupOpen(false);
        setIsConfirmationPopupOpen(false);
			}
		})
	});

  return (
    <div className='page'>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
				onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}>
      </Main>
      <template id='card-template' />

        {/* попап редактирования профиля */}
        <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title='Редактировать профиль' name='profile'>
          <input type="text" id="title-input" placeholder="Ваше имя" className="form__input form__input_field_username" defaultValue="Жак-Ив Кусто" name="name" minLength={2} maxLength={40} required />        
          <span className="form__input-error title-input-error" />
          <input type="text" id="subtitle-input" placeholder="Пара слов о вас" className="form__input form__input_field_job" defaultValue="Исследователь океана" name="about" minLength={2} maxLength={200} required />
          <span className="form__input-error subtitle-input-error" />
          <button className="form__submit-button form__submit-button_type_profile" type="submit">Сохранить</button>
        </PopupWithForm >

        {/* попап нового аватара */}
        <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title='Обновить аватар?' name='edit-avatar'>
          <input type="url" id="avatar" placeholder="Ссылка на картинку" className="form__input form__input_field_photo" name="avatar" required />
          <span className="form__input-error avatar-error" />
          <button className="form__submit-button form__submit-button_type_avatar" type="submit">Сохранить</button>
        </PopupWithForm>

        {/* попап добавления картинки */}
        <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} title='Новое место' name='photo_add'>
          <input type="text" id="photo-name" placeholder="Название" className="form__input form__input_field_title" name="name" minLength={2} maxLength={30} required />        
          <span className="form__input-error photo-name-error" />
          <input type="url" id="link" placeholder="Ссылка на картинку" className="form__input form__input_field_photo" name="link" required />
          <span className="form__input-error link-error" />
          <button className="form__submit-button form__submit-button_type_photo" type="submit">Создать</button>
        </PopupWithForm>

        {/* попап подтверждения удаление */}
        <PopupWithForm isOpen={isConfirmationPopupOpen} title='Вы уверены?' name='photo_delete'>
          <button className="form__submit-button form__confirm-button" type="submit">Да</button>
        </PopupWithForm>

        {/* попап картинки */}
        <PopupWithImage card={selectedCard} onClose={() => {
					setSelectedCard(false);
				}}/>
    </div>
  );
}

export default App;
