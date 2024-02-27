import { useState } from 'react';
import Image from 'next/image';
import Detail from './card-detail';
import Button_favorite from './card-button-favorite';
import Button_unfavorite from './card-button-unfavorite';
import cardstyles from '/styles/Card.module.css';
import styles from '/styles/App.module.css';

type Props = {
	comic: { id: number, title: string, imageSrc: string },
	favoritesList: Array<{ id: number}>,
	addFavorite: Function,
	removeFavorite: Function,
}

export function Card({ comic, favoritesList, addFavorite, removeFavorite }: Props) {
	let altText = `Cover for '${comic.title}'`
	let arrayOfFavoriteIDs: any = [];
	favoritesList.forEach(favorite => {
		if (favorite.id !== undefined) {
			arrayOfFavoriteIDs.push(favorite.id);
		};
	});
	function returnButton() {
		if (arrayOfFavoriteIDs.includes(comic.id)) {
			return <Button_unfavorite
				comic={comic}
				favoritesList={favoritesList}
				removeFavorite={removeFavorite}
			/>
		}
		else {
			return <Button_favorite
				comic={comic}
				addFavorite={addFavorite}
			/>
		}
	}

	
	// * Toggles the Overlay panel
	const [overlayVisible, updateOverlayVisible] = useState(false)
	function returnOverlay() {
		let imgSrc = comic.imageSrc;
		let altText = comic.title;
		if (!overlayVisible) return null;
		if (overlayVisible) return (<div className={styles.overlay} onClick={toggleOverlay} onKeyDown={toggleOverlay}>
				<Image
					className={styles.overlayImage}
					src={imgSrc}
					alt={altText}
					width={600}
					height={800}
					tabIndex={0}
				/>
			</div>);
	}
	function toggleOverlay() {
		updateOverlayVisible(prev => !prev)
	}
	function showComicDetail() {
		// if (event.key === "Enter" || event.button === 0) {
			returnOverlay();
			updateOverlayVisible(prev => !prev);
		// }
	}

	return (
		<div className={cardstyles.card}>
			<Image
				onClick={showComicDetail}
				onKeyDown={showComicDetail}
				className={cardstyles.image}
				src={comic.imageSrc}
				alt={altText}
				width={185}
				height={275}
				tabIndex={0}
			/>
			{returnButton()}
			<Detail comic={comic} />
			{returnOverlay()}
		</div>
	)
}

export default Card;