import { useEffect, useState } from "react";

function useLocalStorage(key: string, initialValue: any) {
	// const [favoritesList, setStoredValue] = useState(() => {
	// 	if (typeof window === "undefined") {
	// 		return initialValue;
	// 	}
	// 	try {
	// 		const item = window.localStorage.getItem(key);
	// 		return item ? JSON.parse(item) : initialValue;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return initialValue;
	// 	}
	// });
	const [favoritesList, setStoredValue] = useState([]);
	useEffect(() => {
		if (window.localStorage) {
			let item : any = window.localStorage.getItem(key);
			if (item) {
				setStoredValue(JSON.parse(item));
			}
		}
	}, []);
	const setValue = (value: any) => {
		try {
			const valueToStore = value instanceof Function ? value(favoritesList) : value;
			setStoredValue(valueToStore);
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.log(error);
		}
	};
	function addFavorite(value: any) {
		let tempArray = [...favoritesList];
		if (tempArray.length >= 10) return;
		tempArray.push(value);
		setValue(tempArray);
		if (typeof window !== "undefined") {
			window.localStorage.setItem(key, JSON.stringify(tempArray));
		}
	};
	function removeFavorite(index: number) {
		let tempArray = [...favoritesList];
		tempArray.splice(index, 1);
		setValue(tempArray);
		if (typeof window !== "undefined") {
			window.localStorage.setItem(key, JSON.stringify(tempArray));
		}
	};
	function clearStorage() {
		setStoredValue([]);
		if (typeof window !== "undefined") {
			window.localStorage.removeItem(key);
		}
	};


	return [favoritesList, setValue, addFavorite, removeFavorite, clearStorage];
}
export default useLocalStorage;