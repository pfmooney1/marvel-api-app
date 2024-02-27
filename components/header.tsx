import Image from 'next/image';
import { useState } from 'react';
import headerStyles from '/styles/header.module.css';

export function Header({ favoritesList }: any) {
	const [navCollapsed, toggleNavCollapsed] = useState(false)

	function toggleNav() {
		toggleNavCollapsed(prev => !prev);
	}

	function showNav() {
		if (navCollapsed) return `${headerStyles.navBar}`;
		if (!navCollapsed) return `${headerStyles.navBar} ${headerStyles.navCollapsed}`;
	}
	let visible = showNav();
	return (
		<header className={headerStyles.header}>
			<Image
				src="/logo.svg"
				alt="Comic Closet logo"
				className={headerStyles.CCLogo}
				width={120}
				height={120}
			/>
			<nav className={visible}>
				{!navCollapsed ? <><a href="#" className={headerStyles.hidden}>Home</a><a href="#" className={headerStyles.hidden}>Shop</a></> : <><a href="#">Home</a><a href="#">Shop</a></>}

				<a href="#">
					<i className="fas fa-bolt"></i>
					{!navCollapsed ? <span className={headerStyles.hidden}>My Favorites</span> : <span>My Favorites</span>}
					<span className={headerStyles.favoritesCount} suppressHydrationWarning>   ({favoritesList.length})</span>
				</a>
				<button className={headerStyles.hamburger} onClick={toggleNav}>
					<i className="fas fa-bars"></i>
				</button>
			</nav>
			<Image
				src="/halftone.png"
				alt="Image fade"
				className={headerStyles.halftone}
				width={2880}
				height={352}
			/>
			<h1 className={headerStyles.pageTitle}>Comic Closet</h1>
		</header>
	)
}
export default Header;