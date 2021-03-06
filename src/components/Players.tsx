import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_CONFIG from "../common/api.config";
import { Player } from "../common/player.model";
import PlayerCard from "./PlayerCard";

const pageWrapper: CSSProperties = {
	background: "#FFF",
};
const playersWrapper: CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
	gridGap: "30px",
	margin: "0",
	padding: "30px",
};
const buttonWrapper: CSSProperties = {
	textAlign: "center",
};
const button: CSSProperties = {
	position: "relative",
	bottom: "-20px",
	height: "40px",
	padding: "0 20px",
	border: "none",
	borderRadius: "5px",
	background: "#788B91",
	color: "#FFF",
	cursor: "pointer",
};

const Players: React.FC<{}> = () => {
	let [limit, setLimit] = useState<number>(10);
	const [players, setPlayers] = useState<Array<Player>>();
	const [total, setTotal] = useState<number>(0);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(
				`https://cdn.contentful.com/spaces/${API_CONFIG.CONTENTFUL_SPACE_ID}/environments/${API_CONFIG.CONTENTFUL_ENVIRONMENT}/entries?access_token=${API_CONFIG.CONTENTFUL_ACCESS_TOKEN}&limit=${limit}`
			)
			.then((response) => {
				console.log(response);
				setPlayers(response.data.items);
				setTotal(response.data.total);
			});
	}, []);

	const loadMore = () => {
		setLimit((limit += 6));
		axios
			.get(
				`https://cdn.contentful.com/spaces/${API_CONFIG.CONTENTFUL_SPACE_ID}/environments/${API_CONFIG.CONTENTFUL_ENVIRONMENT}/entries?access_token=${API_CONFIG.CONTENTFUL_ACCESS_TOKEN}&limit=${limit}`
			)
			.then((response) => {
				setPlayers(response.data.items);
			});
	};

	const onClick = (player: Player) => {
		if (player.fields.nickname === "Dendi") {
			console.log("It's me! Dendi!");
			navigate(`/player/${player.sys.id}`, {
				state: { id: player.sys.id, photoId: player.fields.photo.sys.id },
			});
		} else {
			alert("Sorry! Only Dendi has profile page. Find him!");
			throw "Sorry! We're looking for Dendi.";
		}
	};

	return (
		<div style={pageWrapper}>
			{players ? (
				<ul style={playersWrapper}>
					{players.map((player) => (
						<PlayerCard
							key={player.fields.id}
							id={player.fields.id}
							name={player.fields.name}
							position={player.fields.position}
							photoId={player.fields.photo.sys.id}
							flagId={player.fields.countryFlag.sys.id}
							onCardClick={() => onClick(player)}
						/>
					))}
				</ul>
			) : (
				"Loading..."
			)}
			{limit <= total && (
				<div style={buttonWrapper}>
					<button style={button} onClick={loadMore}>
						Load more
					</button>
				</div>
			)}
		</div>
	);
};

export default Players;
