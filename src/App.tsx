import React, { CSSProperties } from "react";

const containerStyles: CSSProperties = {
	margin: "1rem",
	textAlign: "center",
	fontSize: "24px",
};

const App: React.FC<{}> = () => {
	return (
		<div style={containerStyles}>
			<h1>React Players</h1>
		</div>
	);
};

export default App;
