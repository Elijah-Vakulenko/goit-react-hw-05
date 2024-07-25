//========== helpers ==========
import MovieAPI from 'API/API';

//========== hooks ==========
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//========== styles ==========
import {
	Wrapper,
	Title,
	Message,
	List,
	Item,
	Author,
	Devider,
	AuthorSpan,
	Content,
} from './ReviewsSection.styled';

const ReviewsSection = () => {
	const [reviews, setReviews] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		MovieAPI.getMovieReviews(id).then(reviews => {
			const info = reviews.reduce((acc, review) => {
				const rev = {
					id: review.id,
					name: review.author,
					content: review.content,
				};
				return [...acc, rev];
			}, []);

			setReviews(info);
		});
	}, [id]);

	if (!reviews) return;

	const areReviews = Boolean(reviews.length);

	return (
		<Wrapper>
			<Title>Rewiews</Title>
			{!areReviews && <Message>This movie has no reviews yet.</Message>}
			{areReviews && (
				<>
					<Message>This movie has {reviews.length} reviews.</Message>
					<List>
						{reviews.map(({ id, name, content }) => (
							<Item key={id}>
								<Author>
									Author<Devider>I</Devider>
									<AuthorSpan>{name}</AuthorSpan>
								</Author>
								<Content>{content}</Content>
							</Item>
						))}
					</List>
				</>
			)}
		</Wrapper>
	);
};

export default ReviewsSection;