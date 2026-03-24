import { useState } from "react";
import Image from "next/image";
import FavStyles from "../styles/favorites-panel.module.css";
import styles from '../styles/App.module.css'

function FavoritesPanel({ favoritesList, removeFavorite, visible, toggleFavorites }: any) {

	function FavoritesUL() {
		if (favoritesList[0] !== undefined) {
			return (
				<ul suppressHydrationWarning>
					{favoritesList.map((favItem: any, index: number) => (
						<FavoritesLI
							key={favItem.id ?? `${favItem.title}-${favItem.issueNumber}-${index}`}
							favItem={favItem}
							index={index}
							removeFavorite={removeFavorite}
						/>
					))}
				</ul>
			);
		} else {
			return null;
		}
	}
	function FavoritesLI({ removeFavorite, favItem, index }: any) {
		if (!favItem || !favItem.imageSrc) return null;

		const [overlayVisible, updateOverlayVisible] = useState(false);

		function toggleOverlay() {
			updateOverlayVisible(prev => !prev);
		}

		function returnOverlay() {
			if (!overlayVisible) return null;

			return (
				<div className={styles.overlay} onClick={toggleOverlay}>
					<Image
						className={styles.overlayImage}
						src={favItem.imageSrc}
						alt={favItem.title}
						width={600}
						height={800}
					/>
				</div>
			);
		}

		return (
			<li className={FavStyles.favoriteCard}>
				<button
					className={FavStyles.deleteButton}
					onClick={() => removeFavorite(index)}
				>
					&#10006;
				</button>

				<Image
					onClick={toggleOverlay}
					src={favItem.imageSrc}
					alt={`Cover for '${favItem.title}'`}
					width={60}
					height={80}
					className={FavStyles.image}
				/>

				<span className={FavStyles.title}>{favItem.title}</span>
				<span className={FavStyles.issue}>
					Issue: {favItem.issueNumber}
				</span>

				{returnOverlay()}
			</li>
		);
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