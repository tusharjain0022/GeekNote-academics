import React from "react";
import "./Landing.css";

function Landing(props) {
	return (
		<>
			<div className='landing-section'>
				<div className='text_land'>
					<h1>{props.name} Semester Section</h1>
					<p>{props.intro}</p>
				</div>
			</div>
		</>
	);
}
export default Landing;
