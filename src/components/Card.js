import "../index.css";

function Card({ card, onCardClick }) {
  return (
    <li
      className="card"
      onClick={() => {
        onCardClick(card);
      }}
    >
      <div className="card__pointer">
        <img className="card__image" alt={card.name} src={card.link} />
      </div>
      <button className="card__delete-button" type="button" />
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-section">
          <button className="card__like-button" type="button" />
          <div className="card__like-number">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
