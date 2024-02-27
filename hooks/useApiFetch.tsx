import { useEffect, useState } from 'react';
const ApiKey = process.env.NEXT_PUBLIC_API_KEY;

export function useApiFetch(userPreferences: { filterType : string, filterValue : string, page : number }) {
	let sampleData = [{
		"id": 0,
		"title": "Loading...",
		"issueNumber": 0,
		"description": "Loading...",
		"pageCount": "Loading...",
		"series": {
			"resourceURI": "Loading...",
			"name": "Loading..."
		},
		"dates": [
			{ "type": "onsaleDate", "date": "2099-10-30T00:00:00-0500" },
			{ "type": "focDate", "date": "2099-10-30T00:00:00-0500" }
		],
		"thumbnail": {
			"path": "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
			"extension": "jpg"
		},
		"creators": { "available": 1, "collectionURI": "https://gateway.marvel.com/v1/public/comics/82967/creators", "items": [{ "resourceURI": "https://gateway.marvel.com/v1/public/creators/10021", "name": "Jim Nausedas", "role": "editor" }], "returned": 1 },
		"characters": { "available": 0, "collectionURI": "https://gateway.marvel.com/v1/public/comics/82967/characters", "items": [], "returned": 0 }, "stories": { "available": 2, "collectionURI": "https://gateway.marvel.com/v1/public/comics/82967/stories", "items": [{ "resourceURI": "https://gateway.marvel.com/v1/public/stories/183698", "name": "cover from Marvel Previews (2017)", "type": "cover" }, { "resourceURI": "https://gateway.marvel.com/v1/public/stories/183699", "name": "story from Marvel Previews (2017)", "type": "interiorStory" }], "returned": 2 },
		"events": { "available": 0, "collectionURI": "https://gateway.marvel.com/v1/public/comics/82967/events", "items": [], "returned": 0 }
	}];
	tidyData(sampleData, 1);


	const [comicsData, getComicsData] = useState(sampleData);
	function fetchAndHandleData() {
		let { filterType, filterValue, page } = userPreferences;

		function formatTheURL(filterType : string, filterValue : string, page: number) {
			let offsetAmount = (page - 1) * 15;
			let modifier = "";
			if (filterType == "character") {
				modifier = `characters/${filterValue}/`;
			}
			if (filterType == "creator") {
				modifier = `creators/${filterValue}/`;
			}
			if (!filterType || filterType == "" || filterValue == "") {
				modifier = "";
			}
			let offset = ""
			if (page >= 2) {
				offset = `offset=${offsetAmount}&`;
			}
			const address = `https://gateway.marvel.com/v1/public/`;
			const getComics = "comics?";
			return address + modifier + getComics + offset + "&ts=1&limit=15&apikey=" + ApiKey;
		}
		let url = formatTheURL(filterType, filterValue, page);

		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const json = await response.json();
				const comics = json.data.results;
				// console.log(json.data);
				let totalResults = json.data.total;
				// console.log("Successfully loaded! ");
				tidyData(comics, totalResults);
				// console.log("API data has been tidied.")
				getComicsData(comics);
			} catch (error) {
				console.log("Error: ", error);
			}
		};
		fetchData();
	}
	useEffect(() => {
		fetchAndHandleData();
	}, [userPreferences]);



	function tidyData(dataToTidy: any, totalResults: number) {
		let tidiedData = dataToTidy;
		tidiedData.forEach((comic : any) => {
			delete comic.diamondCode;
			delete comic.collectedIssues;
			delete comic.collections;
			delete comic.ean;
			delete comic.variants;
			delete comic.pageCount;
			delete comic.variants;
			delete comic.isbn;
			delete comic.issn;
			delete comic.variantDescription;
			delete comic.upc;
			delete comic.urls;
			delete comic.events;
			delete comic.textObjects;
			delete comic.prices;
			delete comic.modified;
			delete comic.format;
			delete comic.resourceURI;
			delete comic.images;
			delete comic.series;
			delete comic.stories;
			comic.imageSrc = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
			comic.date = formatDate(`${comic.dates[0].date}`);
			comic.issueNumber = comic.issueNumber.toString();
			comic.creatorName = formatCreatorName(comic.creators.items[0]);
			comic.totalFromThisSet = totalResults || 100;
			delete comic.thumbnail;
			delete comic.dates;
		})
	}
	function formatCreatorName(creator: any) {
		if (!creator) return "N/A";
		if (creator) return `${creator.name}`;
	}
	function formatDate(dateToFormat: string) {
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		let rawDate = new Date(dateToFormat);
		let month = rawDate.getMonth();
		let day = rawDate.getDate();
		let year = rawDate.getFullYear();
		return `${months[month]} ${day}, ${year}`;
	}
	return [comicsData, fetchAndHandleData];
}
export default useApiFetch;