import { useEffect, useState } from "react";
import { useApiFetch } from './hooks/useApiFetch';
import useLocalStorage from './hooks/useLocalStorageSave';
import Head from 'next/head';
import Header from '../pages/components/header';
import Main from '../pages/components/main-feed-favorites'
import Footer from '../pages/components/footer';
import appStyles from '../styles/App.module.css';
import welcomeStyles from '../styles/welcomePanel.module.css';

export default function Home() {
	const [favoritesList, setValue, addFavorite, removeFavorite, clearStorage] = useLocalStorage("favoritesList", []);
	let [userPreferences, updateUserPreferences] = useState({
		filterType: "",
		filterValue: "",
		page: 1
	});
	let [comicsData, fetchAndHandleData] = useApiFetch(userPreferences);

	useEffect(() => {
		fetchAndHandleData();
	}, [userPreferences]);

	return (
		<div className={appStyles.appContainer}>
			<Head>
				<title>Mooneys Comic App</title>
				<meta name="description" content="Browse Marvel's collections of comics." />
				<link rel="icon" href="/bat-mask.png" sizes="any" />
				<link rel="icon" href="/bat-mask.svg" type="image/svg+xml" />
				{/* <link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link href="https://fonts.googleapis.com/css2?family=Karla:wght@500&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" rel="stylesheet" /> */}
			</Head>
			<Header favoritesList={favoritesList} />
			<div className={welcomeStyles.welcomeHeader}>
				<h3>New Comics!</h3>
				<h2>Coming Out Daily</h2>
				<p>Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
			</div>
			<Main
				comicsData={comicsData}
				favoritesList={favoritesList}
				addFavorite={addFavorite}
				removeFavorite={removeFavorite}
				userPreferences={userPreferences}
				updateUserPreferences={updateUserPreferences}
				clearStorage={clearStorage}
			/>
			<Footer />
		</div>
	)
}
