import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API_CONFIG from "../common/api.config";

interface State {
	id: string;
	photoId: string;
}

const pageWrapper: CSSProperties = {
	background: "#FFF",
	padding: "30px",
};

const PlayerDetails: React.FC<{}> = () => {
	const { state } = useLocation();
	const { id, photoId } = state as State;
	console.log(state);
	const [details, setDetails] = useState({
		name: "",
		position: "",
    totalEarnings: 0
	});
	const [photoUrl, setPhotoUrl] = useState();

	useEffect(() => {
		axios
			.get(
				`https://cdn.contentful.com/spaces/${API_CONFIG.CONTENTFUL_SPACE_ID}/environments/${API_CONFIG.CONTENTFUL_ENVIRONMENT}/entries/${id}?access_token=${API_CONFIG.CONTENTFUL_ACCESS_TOKEN}`
			)
			.then((response) => {
				console.log(response);
				setDetails(response.data.fields);
			});

		axios
			.get(
				`https://cdn.contentful.com/spaces/${API_CONFIG.CONTENTFUL_SPACE_ID}/environments/${API_CONFIG.CONTENTFUL_ENVIRONMENT}/assets/${photoId}?access_token=${API_CONFIG.CONTENTFUL_ACCESS_TOKEN}`
			)
			.then((response) => {
				console.log(response);
				setPhotoUrl(response.data.fields.file.url);
			});
	}, []);

	return (
		<div style={pageWrapper}>
			{details ? (
				<div>
					<h1>{details.name}</h1>
					<img src={photoUrl} alt="" />
					<p>
            Position: {details.position}<br />
            Total earnings: {new Intl.NumberFormat().format(details.totalEarnings)}
          </p>
				</div>
			) : (
				"Loading..."
			)}
		</div>
	);
};

export default PlayerDetails;
