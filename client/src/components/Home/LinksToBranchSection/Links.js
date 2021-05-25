import "./Links.css";
import { Link } from "react-router-dom";
import branches from "../../../data/branches.json";
import hline from "../../../images/horline.svg";
import attachment from "../../../images/attatchment.svg";
// ###################################################################################
// import Axios from "axios";                         // uncomment when using databse
// import { useEffect, useState } from "react";       // uncomment when using databse
// ###################################################################################



// code for fetching data from json files :->> start
const Branch = (props) => {
  return (
    <div className="card resource-card">
      <div className="cardContent text-center py-2">
        <h4>{props.name}</h4>

        <p
          style={{
            fontStyle: "normal",
            fontWeight: "350",
          }}
        >
          {props.name} Autumn Semester consist {props.autumn_sub} subjects while
          spring semester consist {props.spring_sub} subjects.
        </p>
        <div className="mb-4">
          {" "}
          <Link to={props.autumn_link} className="semesterButton">
            Autumn Semester
          </Link>
          <Link to={props.spring_link} className="semesterButton">
            Spring Semester
          </Link>
        </div>
      </div>
    </div>
  );
};
function Links() {
  return (
    <section className="resource-section container" id="resources">
      <div className="row">
        <div className="hline d-none d-lg-block">
          <img src={hline} alt="hline" className="hline-pic"></img>
        </div>
        <div className="col-12">
          <h1 className="heading">
            <img
              src={attachment}
              alt="logo"
              style={{
                width: "5vh",
                height: "5vh",
                margin: "5px 5px",
              }}
            />{" "}
            Resources
          </h1>
          <hr
            className="d-lg-none"
            style={{ borderTop: "1px solid #ccd6f6", width: "70%" }}
          ></hr>
        </div>
        <div className="col-12">
          <div className="allcards">
            <div className="cards">
              {branches.map((branch) => {
                return (
                  <Branch
                    name={branch.name}
                    autumn_link={branch.semester[0].link}
                    spring_link={branch.semester[1].link}
                    autumn_sub={branch.semester[0].totalSub}
                    spring_sub={branch.semester[1].totalSub}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Links;
// code for fetching data from json files :->> end

// ##############################################################################################################

// code for fetching data from database:->> start
// const Branch = (props) => {
//   return (
//     <div className="card resource-card">
//       <div className="cardContent text-center py-2">
//         <h4>{props.name}</h4>

//         <p
//           style={{
//             fontStyle: "normal",
//             fontWeight: "350",
//           }}
//         >
//           {props.name} Autumn Semester consist {props.autumn_sub} subjects while
//           spring semester consist {props.spring_sub} subjects.
//         </p>
//         <div className="mb-4">
//           {" "}
//           <Link to={props.autumn_link} className="semesterButton">
//             Autumn Semester
//           </Link>
//           <Link to={props.spring_link} className="semesterButton">
//             Spring Semester
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };


// function Links() {

//     const [datatoShow,setDatatoShow]=useState([]);
//     useEffect(()=>{
//       Axios.get("http://localhost:3001").then((response)=>{
//         setDatatoShow(response.data);
//       });
//     },[]);

//   return (
//     <section className="resource-section container" id="resources">
//       <div className="row">
//         <div className="hline d-none d-lg-block">
//           <img src={hline} alt="hline" className="hline-pic"></img>
//         </div>
//         <div className="col-12">
//           <h1 className="heading">
//             <img
//               src={attachment}
//               alt="logo"
//               style={{
//                 width: "5vh",
//                 height: "5vh",
//                 margin: "5px 5px",
//               }}
//             />{" "}
//             Resources
//           </h1>
//           <hr
//             className="d-lg-none"
//             style={{ borderTop: "1px solid #ccd6f6", width: "70%" }}
//           ></hr>
//         </div>
//         <div className="col-12">
//           <div className="allcards">
//             <div className="cards">
//               {datatoShow.map((branch) => {
//                 return (
//                   <Branch
//                     name={branch.name}
//                     autumn_link={branch.semester[0].link}
//                     spring_link={branch.semester[1].link}
//                     autumn_sub={branch.semester[0].totalSub}
//                     spring_sub={branch.semester[1].totalSub}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Links;
// code for fetching data from database:->> end 