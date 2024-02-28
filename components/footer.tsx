import Image from 'next/image';
import styles from "/styles/Footer.module.css";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<Image
				src="/logo.svg"
				alt="Comic Closet logo"
				width={110}
				height={110}
			/>
			<p>Made by Patrick Mooney</p>
			<p>
				<a href="https://patrickmooney.tech">See my portfolio</a>
			</p>
		</footer>
	)
}

export default Footer;