import '../index.css'; 

function PopupWithImage() {
  return (
    <div className="popup popup_photo_opened popup_background_dark">
    <div className="popup__container popup__container_photo_opened">                 
      <figure className="popup__figure">
        <button className="popup__close-button popup__close-button_type_photo" type="button" />
        <img className="popup__big-photo" alt="фото"/>
        <figcaption className="popup__subtitle" />
      </figure> 
    </div>
  </div>
  )
};

export default PopupWithImage;