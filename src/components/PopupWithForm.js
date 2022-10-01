import '../index.css'; 

function PopupWithForm({title, name, children}) {
return (
  <div className={`popup popup_${name}`}>
      <div className="popup__container">
        <button className={`popup__close-button popup__close-button_type__${name}`} type="button" />
        <h3 className="popup__title">{title}</h3>
        <form method="post" name="profile-edit" className= {`form form_${name}`} noValidate>                
          {children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
