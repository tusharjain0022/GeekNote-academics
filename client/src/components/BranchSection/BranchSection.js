import "./BranchSection.css";
import Resources from "./Resources/Resources";
import Landing from "./LandingSection/Landing";
import Calendar from "./Calendar/Calendar";
import Contributor from "./Contributor/Contributor";
import { useEffect, useState } from "react";
import axios from "axios";

function BranchSection(props) {
	const [subjects, setSubjects] = useState([]);
	const apiBaseURL = process.env.REACT_APP_GEEKNOTE_API || `http://localhost:3001`;

	useEffect(() => {
		axios
			.get(`${apiBaseURL}${props.link}`)
			.then((res) => {
				console.log(res.data);
				setSubjects(res.data);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<div className='branchsection'>
			<Landing name={props.name} intro={props.intro} />
			<Resources subjects={subjects} />
			<Calendar timetable={props.timetable} />
			<Contributor name={props.shortName} />
		</div>
	);
}
export default BranchSection;
