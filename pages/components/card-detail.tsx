import cardstyles from '../../styles/card.module.css';

export function Detail({ comic }: any) {
	if (!comic) return null;
	return (
		<div className={cardstyles.detail} data-testid="detailComponent">
			<h3 data-testid="title">{comic.title || "N/A"}</h3>
			<ul>
				<li>
					<span className={cardstyles.detail_label}>Issue:	</span>
					<span className={cardstyles.detail_data} data-testid="issue">{comic.issueNumber || "N/A"}</span>
				</li>

				<li>
					<span className={cardstyles.detail_label}>Published:</span>
					<br />
					<span className={cardstyles.detail_data} data-testid="date">{comic.date || "N/A"}</span>
				</li>

				<li>
					<span className={cardstyles.detail_label}>Creators:</span>
					<br />
					<span className={cardstyles.detail_data} data-testid="creators">{comic.creatorName || "N/A"}</span>
				</li>
			</ul>
		</div>
	)
}

export default Detail;