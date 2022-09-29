import '../index.css';
import Header from '../components/Header';
import Main from '../components/Main';

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <template id="card-template" />
      <div className="popup popup_profile">
        <div className="popup__container">
          <button className="popup__close-button popup__close-button_type_profile" type="button" />
          <h3 className="popup__title">Редактировать профиль</h3>
          <form method="post" name="profile-edit" className="form form_profile" noValidate>                
            <input type="text" id="title-input" placeholder="Ваше имя" className="form__input form__input_field_username" defaultValue="Жак-Ив Кусто" name="name" minLength={2} maxLength={40} required />        
            <span className="form__input-error title-input-error" />
            <input type="text" id="subtitle-input" placeholder="Пара слов о вас" className="form__input form__input_field_job" defaultValue="Исследователь океана" name="about" minLength={2} maxLength={200} required />
            <span className="form__input-error subtitle-input-error" />
            <button className="form__submit-button form__submit-button_type_profile" type="submit">Сохранить</button>
          </form>
        </div>
      </div>

      <div className="popup popup_photo_add">
        <div className="popup__container">
          <button className="popup__close-button popup__close-button_type_photo-form" type="button" />
          <h3 className="popup__title">Новое место</h3>
          <form method="post" name="photo-add" className="form form_photo" noValidate>
            <input type="text" id="photo-name" placeholder="Название" className="form__input form__input_field_title" name="name" minLength={2} maxLength={30} required />        
            <span className="form__input-error photo-name-error" />
            <input type="url" id="link" placeholder="Ссылка на картинку" className="form__input form__input_field_photo" name="link" required />
            <span className="form__input-error link-error" />
            <button className="form__submit-button form__submit-button_type_photo" type="submit">Создать</button>
          </form>
        </div>
      </div> 

      <div className="popup popup_photo_opened popup_background_dark">
        <div className="popup__container popup__container_photo_opened">                 
          <figure className="popup__figure">
            <button className="popup__close-button popup__close-button_type_photo" type="button" />
            <img className="popup__big-photo" alt="фото"/>
            <figcaption className="popup__subtitle" />
          </figure> 
        </div>
      </div>

      <div className="popup popup_edit-avatar">
        <div className="popup__container">
          <button className="popup__close-button popup__close-button_type_photo-form" type="button" />
          <h3 className="popup__title">Обновить аватар?</h3>
          <form method="post" name="photo-add" className="form form_avatar" noValidate>                    
            <input type="url" id="avatar" placeholder="Ссылка на картинку" className="form__input form__input_field_photo" name="avatar" required />
            <span className="form__input-error avatar-error" />
            <button className="form__submit-button form__submit-button_type_avatar" type="submit">Сохранить</button>
          </form>
        </div>
      </div> 

      <div className="popup popup_photo_delete">
        <div className="popup__container popup__container_confirm">
          <button className="popup__close-button popup__close-button_type_photo-form" type="button" />
          <h3 className="popup__title popup__title_type_confirm">Вы уверены?</h3>
          <form className="form form_confirm">
            <button className="form__submit-button form__confirm-button" type="submit">Да</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
