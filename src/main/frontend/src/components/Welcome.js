import React from "react";

import { Jumbotron } from "react-bootstrap";

export default function Welcome(props) {
	return (
		<Jumbotron>
			<h1>{props.heading}</h1>
			<blockquote className="blockquote mb-0">
				<p1>{props.desc}</p1>
			</blockquote>
		</Jumbotron>
	);
}
