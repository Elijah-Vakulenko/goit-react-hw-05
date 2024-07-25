//========== helpers ==========
import MovieAPI from 'API/API';

//========== hooks ==========
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//========== components ==========
import womanProfilePlaceholder from 'images/womanProfilePlaceholder.webp';
import manProfilePlaceholder from 'images/manProfilePlaceholder.webp';
import photoPlaceholder from 'images/photoPlaceholder.webp';

//========== styles ==========
import {
	Wrapper,
	Title,
	Message,
	List,
	Item,
	Photo,
	Info,
	Name,
	Character,
	Devider,
	CharacterSpan,
} from './CastSection.styled';

const CastSection = () => {
	const [castInfo, setCastInfo] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		MovieAPI.getMovieCredits(id).then(({ cast }) => {
			const info = cast.reduce((acc, man) => {
				const profilePlaceholder = !man.gender
					? photoPlaceholder
					: man.gender === 1
					? womanProfilePlaceholder
					: manProfilePlaceholder;
				const profilePhoto = man.profile_path
					? `https://image.tmdb.org/t/p/original/${man.profile_path}`
					: profilePlaceholder;
				const actor = {
					id: man.id,
					name: man.name,
					character: man.character,
					photo: profilePhoto,
				};
				return [...acc, actor];
			}, []);

			setCastInfo(info);
		});
	}, [id]);

	if (!castInfo) return;

	const areActors = Boolean(castInfo.length);

	return (
		<Wrapper>
			<Title>Cast</Title>
			{!areActors && <Message>We found no information about the cast.</Message>}
			{areActors && (
				<List>
					{castInfo.map(({ id, photo, name, character }) => (
						<Item key={id}>
							<Photo src={photo} alt={name} />
							<Info>
								<Name>{name}</Name>
								<Character>
									Character<Devider>I</Devider>
									<CharacterSpan>{character}</CharacterSpan>
								</Character>
							</Info>
						</Item>
					))}
				</List>
			)}
		</Wrapper>
	);
};

export default CastSection;