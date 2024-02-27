import Script from 'next/script';
import cardstyles from '../../styles/Card.module.css';

type Props = {
	comic: { id: number },
	favoritesList: Array<{ id: number }>,
	removeFavorite: Function,
}

export function Button_unfavorite({ comic, favoritesList, removeFavorite }: Props) {
	let arrayOfFavoriteIDs: Array<number> = [];
	favoritesList.forEach(favorite => {
		if (favorite.id !== undefined) {
			arrayOfFavoriteIDs.push(favorite.id);
		};
	})
	let index = arrayOfFavoriteIDs.indexOf(comic.id);
	return (
		<button className={`${cardstyles.button_detail} ${cardstyles.favorite}`} onClick={() => removeFavorite(index)}>
			<i className="fas fa-bolt"></i>
			<Script src="https://kit.fontawesome.com/1ae435c4b3.js" crossOrigin="anonymous" />
		</button>
	)
};

export default Button_unfavorite;