import Card from './card'
import PageSelector from './page-selector';
import ComicFeedStyles from '../../styles/comics-feed.module.css';

function ComicsFeed({ comicsData, addFavorite, favoritesList, removeFavorite, userPreferences, updateUserPreferences }: any) {
	let errorMessage = (
		<div className={ComicFeedStyles.errorMessage}>
			<i className="fas fa-search"></i>
			<h2>Sorry, could not find comics.</h2>
			<h3>Please adjust your search.</h3>
		</div>
	);
	if (comicsData.length < 1) return errorMessage;
	var mappedData = comicsData.map((comic: { id: number, title: string, imageSrc: string }) => {
		return (
			<Card
				comic={comic}
				key={comic.id}
				addFavorite={addFavorite}
				favoritesList={favoritesList}
				removeFavorite={removeFavorite}
			/>
		);
	});

	return (
		<>
			<div id="comics-feed" className={ComicFeedStyles.comicsFeed} style={{ display: "flex", flexWrap: "wrap", }}>
				{mappedData}
			</div>
			<PageSelector userPreferences={userPreferences} updateUserPreferences={updateUserPreferences} totalFromThisSet={comicsData[0].totalFromThisSet} />
		</>
	)
}

export default ComicsFeed;