import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import API_CONFIG from "../common/api.config";

const cardWrapper: CSSProperties = {
  borderRadius: "8px 8px 0 0",
  overflow: "hidden",
  background: "#788B91",
  color: "#FFF"
};
const cardPhoto: CSSProperties = {
  width: "100%",
  height: "250px",
  objectFit: "cover",
  objectPosition: "top"
};
const cardFooter: CSSProperties = {
  padding: "15px",
  display: "flex"
};
const countryFlag: CSSProperties = {
  borderRadius: "100%",
  background: "#FFF",
  width: "45px",
  height: "45px",
  marginRight: "15px"
};
const playerName: CSSProperties = {
  margin: "0 0 5px"
};

const PlayerCard: React.FC<{
	name: string;
	position: string;
	photoId: string;
  flagId: string;
}> = ({ name, position, photoId, flagId }) => {
	const [photo, setPhoto] = useState();
	const [flag, setFlag] = useState();

	useEffect(() => {
		axios
			.get(
				`https://cdn.contentful.com/spaces/${API_CONFIG.CONTENTFUL_SPACE_ID}/environments/${API_CONFIG.CONTENTFUL_ENVIRONMENT}/assets/${photoId}?access_token=${API_CONFIG.CONTENTFUL_ACCESS_TOKEN}`
			)
			.then((response) => {
				// console.log(response);
				setPhoto(response.data.fields.file.url);
			});

		axios
			.get(
				`https://cdn.contentful.com/spaces/${API_CONFIG.CONTENTFUL_SPACE_ID}/environments/${API_CONFIG.CONTENTFUL_ENVIRONMENT}/assets/${flagId}?access_token=${API_CONFIG.CONTENTFUL_ACCESS_TOKEN}`
			)
			.then((response) => {
				// console.log(response);
				setFlag(response.data.fields.file.url);
			});
	}, []);

	return (
		<div style={cardWrapper}>
			<img style={cardPhoto} src={photo} alt="" />
			<div style={cardFooter}>
				<img style={countryFlag} src={flag} alt="" />
				<div>
					<h3 style={playerName}>{name}</h3>
					<span>{position}</span>
				</div>
			</div>
		</div>
	);
};

export default PlayerCard;
