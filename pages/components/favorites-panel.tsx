import { useState } from "react";
import Image from "next/image";
import FavStyles from "/styles/favorites-panel.module.css";
import styles from '/styles/App.module.css'

function FavoritesPanel({ favoritesList, removeFavorite, visible, toggleFavorites }: any) {
	
	function FavoritesUL() {
		if (favoritesList[0] !== undefined) {
			return (
				<ul suppressHydrationWarning>
						{favoritesList.map((favItem: any, index: number) => (
							<FavoritesLI
								favItem={favItem}
								index={index}
								removeFavorite={removeFavorite}
								key={favItem.id}
								suppressHydrationWarning
							/>
							))
						}
				</ul>
			)
		}
		else {
			return null;
		}
	}
	function FavoritesLI({ removeFavorite, favItem, index }: any) {
		// * Toggles the Overlay panel
		const [overlayVisible, updateOverlayVisible] = useState(false)
		function returnOverlay() {
			let imgSrc = favItem.imageSrc;
			let altText = favItem.title;
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
			returnOverlay();
			updateOverlayVisible(prev => !prev);
		}

		let altText = `Cover for '${favItem.title}'`

		return (
			<li
				className={FavStyles.favoriteCard}
			>
				<button className={FavStyles.deleteButton}
					onClick={() => removeFavorite(index)}
				>&#10006;</button>
				<Image
					onClick={showComicDetail}
					onKeyDown={showComicDetail}
					src={favItem.imageSrc}
					alt={altText}
					width={60}
					height={80}
					className={FavStyles.image}
					tabIndex={0}
				/>
				<span className={FavStyles.title}>{favItem.title}</span>
				<span className={FavStyles.issue}>Issue: {favItem.issueNumber}</span>
				{returnOverlay()}
			</li>
		)
	}

	return (
		<div className={visible} suppressHydrationWarning>
			<h2>Favorites</h2>
				<FavoritesUL />
			<button onClick={toggleFavorites} className={FavStyles.showFavoritesButton}>
				{visible ? "Hide " : "Show "}
				Favorites <i className="fas fa-bolt"></i>
			</button>
		</div>
	);

}
export default FavoritesPanel;