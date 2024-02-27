import Image from 'next/image';
import styles from "../../styles/Footer.module.css";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<Image
				src="/logo.svg"
				alt="Comic Closet logo"
				width={110}
				height={110}
			/>
			<p>
				<a>Privacy Policy</a>|<a>Terms of Service</a>
			</p>
			<p>Copyright 2022. Comic Closet, LLC. All rights reserved.</p>
		</footer>
	)
}

export default Footer;