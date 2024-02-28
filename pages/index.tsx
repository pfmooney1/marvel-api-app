import { useEffect, useState } from "react";
import { useApiFetch } from '../hooks/useApiFetch';
import useLocalStorage from '../hooks/useLocalStorageSave';
import Head from 'next/head';
import Header from '../components/header';
import Main from '../components/main-feed-favorites'
import Footer from '../components/footer';
import appStyles from '../styles/App.module.css';
import welcomeStyles from '../styles/welcomePanel.module.css';

// eslint-disable-next-line react-hooks/exhaustive-deps

export default function Home() {
	const [userPreferences, updateUserPreferences] = useState({
		filterType: "",
		filterValue: "",
		page: 1
	});
	const [favoritesList, setValue, addFavorite, removeFavorite, clearStorage] = useLocalStorage("favoritesList", []);
	const [comicsData, fetchAndHandleData] = useApiFetch(userPreferences);


	return (
		<div className={appStyles.appContainer}>
			<Head>
				<title>Mooneys Comic App</title>
				<meta name="description" content="Browse Marvels collections of comics." />
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
				<p>Built with TypeScript + NextJS and hosted with Vercel, this project fetches data from the Marvel API and lets you browse Marvel’s catalogue of comic books. Save your favorites with Local Storage, filter the results by character or creator, and view front covers in full screen.</p>
			</div>
			<Main
				comicsData={comicsData}
				favoritesList={favoritesList}
				addFavorite ={addFavorite}
				removeFavorite={removeFavorite}
				userPreferences={userPreferences}
				updateUserPreferences={updateUserPreferences}
			/>
			<Footer />
		</div>
	)
}
