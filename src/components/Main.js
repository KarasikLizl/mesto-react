import '../index.css';
import Footer from '../components/Footer';

function Main() {
  return (
    <main className="content">
        <section className="profile">
          <div className="profile__user">
            <div className="profile__avatar">
              <div className=" profile__overlay"/>
            </div>
            <div className="profile__info">
              <div className="profile__name">
                <h1 className="profile__title">Жак-Ив Кусто</h1>
                <button className="profile__edit-button" type="button"/>
              </div>
              <p className="profile__subtitle">Исследователь океана</p>
            </div>
          </div>
          <button className="profile__add-button" type="button"/>
        </section>
        <section className="elements">
          <ul className="cards">
          </ul>
        </section>
        <Footer />
      </main>      
  )
}

export default Main;