import Script from 'next/script';
import cardstyles from '../../styles/Card.module.css';

type Props = {
	comic: object;
	addFavorite: Function;
}

export function Button_favorite({ comic, addFavorite }: Props) {
	return (
		<button className={`${cardstyles.button_detail}`} onClick={() => addFavorite(comic)}>
			<i className="fas fa-bolt"></i>
			<Script src="https://kit.fontawesome.com/1ae435c4b3.js" crossOrigin="anonymous" />
		</button>
	)
};

export default Button_favorite;