import {Link, useLocation} from 'react-router-dom';

function Burger({isOpenBurger, onCloseBurger}) {

	// подписка на новигацию
	const location = useLocation();

	return (

		<section className= {!isOpenBurger ? ("burger") : ("burger burger_active")} >

			<button className="burger__close-button hoverBatton" type="button" onClick={onCloseBurger}/>

			<ul className="burger__wrapper">
				<Link className={`burger__link hoverLink ${location.pathname === "/" ? "burger__link_active" : ""}`}  to="/" onClick={onCloseBurger}>
					Главная
				</Link>

				<Link className={`burger__link hoverLink ${location.pathname === "/movies" ? "burger__link_active" : ""}`} to="/movies" onClick={onCloseBurger}>
					Фильмы
				</Link>

				<Link className={`burger__link hoverLink ${location.pathname === "/saved-movies" ? "burger__link_active" : ""}`} to="/saved-movies" onClick={onCloseBurger}>
					Сохранённые фильмы
				</Link>

				<Link className="burger__account-link hoverBatton" to="/profile" onClick={onCloseBurger}>
					Аккаунт
				</Link>

			</ul>
		</section>
	);
}

export default Burger;