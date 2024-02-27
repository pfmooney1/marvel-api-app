import { useState } from "react";
import ComicsFeed from "./comics-feed";
import FavoritesPanel from "./favorites-panel";
import styles from "../../styles/App.module.css";
import FavStyles from "../../styles/favorites-panel.module.css";

type Props = {
	comicsData: any, 
	favoritesList: any, 
	addFavorite: any, 
	removeFavorite: any, 
	userPreferences: {filterValue : string, filterType: string, page: number}, 
	updateUserPreferences: Function, 
}

export function Main({ comicsData, favoritesList, addFavorite, removeFavorite, userPreferences, updateUserPreferences }: Props) {
	function characterSelect(selection: any) {
		updateUserPreferences({
			filterType: "character",
			filterValue: selection.target.value,
			page: 1
		})
	}
	function creatorSelect(selection: any) {
		updateUserPreferences({
			filterType: "creator",
			filterValue: selection.target.value,
			page: 1
		})
	}



	// * Toggles the Filters panel
	const [filterVisible, updateFilterVisible] = useState(false)
	function toggleFilter() {
		updateFilterVisible(prev => !prev);
	}
	function hideDisplayFilter() {
		if (filterVisible) return `${styles.filterSelects}`;
		if (!filterVisible) return `${styles.filterSelects} ${styles.hidden}`;
	}
	let filtersVisible = hideDisplayFilter();



	// * Toggles the Favorites panel
	const [favoritesVisible, updateFavoritesVisible] = useState(false)
	function toggleFavorites() {
		updateFavoritesVisible(prev => !prev);
	}
	function hideDisplayFavorites() {
		if (favoritesVisible) return `${FavStyles.favoritesPanel}`;
		if (!favoritesVisible) return `${FavStyles.favoritesPanel} ${FavStyles.hidden}`;
	}
	let favsVisible = hideDisplayFavorites();

	return (
		<main className={styles.main}>
			<div className={styles.filters}>
				<button onClick={toggleFilter} className={styles.disguisedButton}>
					<span className={styles.desktop}>Filter by:</span>
					<span className={styles.mobile}>Filter <i className="fas fa-filter"></i></span>
				</button>
				<div className={filtersVisible}>
					<select id="characterSelector" onChange={characterSelect} value={userPreferences.filterValue }>
						<option value="">Character</option>
						<option value="1009368">Iron Man</option>
						<option value="1009220">Captain America</option>
						<option value="1009664">Thor</option>
						<option value="1009268">Deadpool</option>
						<option value="1009562">Scarlet Witch</option>
						<option value="1009189">Black Widow</option>
						<option value="1009707">Wasp</option>
						<option value="1010763">Gamora</option>
						<option value="1017815">Silk</option>
					</select>
					<select id="creatorSelector" onChange={creatorSelect} value={userPreferences.filterValue}>
						<option value="">Creator</option>
						<option value="12787">Kate Leth</option>
						<option value="24">Brian Michael Bendis</option>
						<option value="30">Stan Lee</option>
						<option value="32">Steve Ditko</option>
						<option value="196">Jack Kirby</option>
					</select>
				</div>
				<button onClick={toggleFavorites} className={`${styles.showFavoritesButton} ${styles.disguisedButton}`}>
					{favoritesVisible ? "Hide " : "Show "} Favorites <i className="fas fa-bolt"></i>
				</button>
			</div>
			<ComicsFeed
				comicsData={comicsData}
				favoritesList={favoritesList}
				addFavorite={addFavorite}
				removeFavorite={removeFavorite}
				userPreferences={userPreferences}
				updateUserPreferences={updateUserPreferences}
			/>
			<FavoritesPanel
				visible={favsVisible}
				toggleFavorites={toggleFavorites}
				favoritesList={favoritesList}
				removeFavorite={removeFavorite}
			/>
		</main>
	)
}

export default Main;