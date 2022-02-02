import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PlayerDetails from "./components/PlayerDetails";
import Players from "./components/Players";
import Layout from "./ui/Layout";

const App: React.FC<{}> = () => {
	return (
		<BrowserRouter>
			<Header />
			<Layout>
				<Routes>
					<Route path="/" element={<Players />} />
					<Route path="/player/:id" element={<PlayerDetails />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
