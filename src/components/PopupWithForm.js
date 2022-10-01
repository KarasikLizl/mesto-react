import '../index.css'; 

function PopupWithForm({isOpen, onClose, title, name, children}) {
return (
  <div className={isOpen? `popup popup_${name} popup_is_opened` : `popup popup_${name}`}>
      <div className="popup__container">
        <button className={`popup__close-button popup__close-button_type__${name}`} type="button" onClick={onClose}/>
        <h3 className="popup__title">{title}</h3>
        <form method="post" name="profile-edit" className= {`form form_${name}`} noValidate>                
          {children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
