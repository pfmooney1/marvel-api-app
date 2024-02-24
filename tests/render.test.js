import React from "react";
import ComicsFeed from "../pages/components/comics-feed";
import "@testing-library/jest-dom";
// import { MemoryRouter } from 'react-router-dom';
import { getByTestId, render, screen, debug, getByText, cleanup, waitForElement } from "@testing-library/react";
global.fetch = require('jest-fetch-mock');

afterEach(() => {
	cleanup();
	console.error.mockClear();
});

console.error = jest.fn();

test('<ComicsFeed />', async () => {
	let comicsData = [
		{
			"id": 0,
			"title": "Test title",
			"issueNumber": "Test issue",
			"description": "Loading...",
			"pageCount": "Loading...",
			"series": {
				"resourceURI": "Loading...",
				"name": "Loading..."
			},
			"dates": [
				{ "type": "onsaleDate", "date": "1991-01-31T00:00:00-1200" },
				{ "type": "focDate", "date": "2099-10-30T00:00:00-0500" }
			],
			"thumbnail": {
				"path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
				"extension": "jpg"
			},
			"creators": { "available": 1, "collectionURI": "http://gateway.marvel.com/v1/public/comics/82967/creators", "items": [{ "resourceURI": "http://gateway.marvel.com/v1/public/creators/10021", "name": "Test creators", "role": "editor" }], "returned": 1 },
			"characters": { "available": 0, "collectionURI": "http://gateway.marvel.com/v1/public/comics/82967/characters", "items": [], "returned": 0 }, "stories": { "available": 2, "collectionURI": "http://gateway.marvel.com/v1/public/comics/82967/stories", "items": [{ "resourceURI": "http://gateway.marvel.com/v1/public/stories/183698", "name": "cover from Marvel Previews (2017)", "type": "cover" }, { "resourceURI": "http://gateway.marvel.com/v1/public/stories/183699", "name": "story from Marvel Previews (2017)", "type": "interiorStory" }], "returned": 2 },
			"events": { "available": 0, "collectionURI": "http://gateway.marvel.com/v1/public/comics/82967/events", "items": [], "returned": 0 }
		}
	];
	const comicsFeed = render(<ComicsFeed comicsData={comicsData} />);
	const detailComponent = comicsFeed.getByTestId("detailComponent");
	const title = comicsFeed.getByTestId("title");
	const issue = comicsFeed.getByTestId("issue");
	const date = comicsFeed.getByTestId("date");
	const creators = comicsFeed.getByTestId("creators");
	comicsFeed.debug();
	expect(detailComponent).toBeInTheDocument();
	expect(title.innerHTML).toBe("Test title");
	expect(issue.innerHTML).toBe("Test issue");
	expect(date.innerHTML).toBe("January 31, 1991");
	expect(creators.innerHTML).toBe("Test creators");
});