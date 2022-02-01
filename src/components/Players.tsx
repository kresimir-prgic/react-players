import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import API_CONFIG from "../common/api.config";
import { Player } from "../common/player.model";

const Players: React.FC<{}> = () => {
	const [players, setPlayers] = useState<Array<Player>>();

	useEffect(() => {
		axios
			.get(
				`https://cdn.contentful.com/spaces/${API_CONFIG.CONTENTFUL_SPACE_ID}/environments/${API_CONFIG.CONTENTFUL_ENVIRONMENT}/entries?access_token=${API_CONFIG.CONTENTFUL_ACCESS_TOKEN}`
			)
			.then((response) => {
				console.log(response);
				setPlayers(response.data.items);
			});
	}, []);

	return (
		<div>
			{players ? (
				<ul>
					{players.map((player) => (
						<li key={player.fields.id}>{player.fields.name}</li>
					))}
				</ul>
			 ) : (
				"Loading..."
			)}
		</div>
	);
};

export default Players;
