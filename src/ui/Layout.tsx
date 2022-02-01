import React, { CSSProperties } from "react";

const mainWrapper: CSSProperties = {
  padding: "30px"
}

const Layout: React.FC<{}> = (props) => {
	return <main style={mainWrapper}>{props.children}</main>;
};

export default Layout;
