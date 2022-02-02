import React, { CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";

const header: CSSProperties = {
	fontSize: "24px",
	backgroundColor: "#788B91",
	padding: "10px 15px",
	borderRadius: "8px 8px 0 0",
};
const link: CSSProperties = {
	textDecoration: "none",
	color: "#fff",
};

const Header: React.FC<{}> = () => {
	const location = useLocation();
	console.log(location);

	let linkName = "Home";
	if (location.pathname !== "/") {
		linkName = "Back";
	}

	return (
		<header style={header}>
			<div>
				<Link style={link} to="/">
					{linkName}
				</Link>
			</div>
		</header>
	);
};

export default Header;
