import "../index.css";
import React, { useState, useEffect, useContext } from "react";
import Footer from "../components/Footer";
import Card from "./Card";
import api from "../utils/Api";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(()=>{
      setCards((state) => state.filter((c) =>  {return c._id !== card._id;}))
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <div className=" profile__overlay" onClick={onEditAvatar} />
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="cards">
          {cards.map((item) => {
            return (
              <Card card={item} onCardClick={onCardClick} key={item._id} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
            );
          })}
        </ul>
      </section>
      <Footer />
    </main>
  );
}

export default Main;
