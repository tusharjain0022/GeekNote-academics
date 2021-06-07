import React from "react";
import { useEffect, useState } from "react";
import "./ChangeSubject.css";
import { Button } from "react-bootstrap";
import Axios from 'axios';
import { Modal } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {

  const [obj,setObj]=useState({
    name: props.params.name,
    year: props.params.year,
    semester: props.params.semester,
    branch: props.params.branch,
  })

  const setPrev=(()=>{
    setObj({
      name: props.params.name,
      year: props.params.year,
      semester: props.params.semester,
      branch: props.params.branch,
    })
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObj(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const UpdateChanges=((id)=>{
    Axios.put(`http://localhost:3001/updateSubject/${id}`,obj);
    window.location.reload();
  })

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Id: {props.params.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Name: </label>
        <input type="text" onChange={handleChange} value={obj.name} name="name"></input><br />
        <label>Year: </label>
        <input type="text" onChange={handleChange} value={obj.year} name="year"></input><br />
        <label>Semester: </label>
        <input type="text" onChange={handleChange} value={obj.semester} name="semester"></input><br />
        <label>Branch: </label>
        <input type="text" onChange={handleChange} value={obj.branch} name="branch"></input><br />
        <button onClick={setPrev}> Set Previous Values  </button>
        

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>UpdateChanges(props.params.id)}>Update Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}







const CardSubject = (props) => {

  const [modalShow, setModalShow] = React.useState(false);

  const handleDelete=((id)=>{
    Axios.delete(`http://localhost:3001/deleteSubjetc/${id}`);
    window.location.reload();
  })

  return (
    <div className="card changeSubject-card">
      <div className="cardContent text-center py-2">
        <h5> Name: {props.name}</h5>
        <p> Year: {props.year}</p>
        <p> Semester: {props.semester}</p>
        <p> Branch: {props.branch}</p>
      </div>
      <div className="buttonSection">
        <button className="updateButton" onClick={() => setModalShow(true)}>Update</button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          params={props}
        />
        <button type="button" className="deleteButton" onClick={ ()=>handleDelete(props.id) } > Delete </button>
      </div>
    </div>
  );
};


function ChangeSubject() {

  const [form, setForm] = useState(0);
  function handleChange(newValue) {
    setForm(newValue);
  }

  const [datatoShow,setDatatoShow]=useState([]);
  useEffect(()=>{
    Axios.get("http://localhost:3001/changeSubject").then((response)=>{
      setDatatoShow(response.data);
    });
  },[]);

  return (
    <section className="changeSubject-section container">
      <div className="row">
        <div className="col-12">
          <h1 className="heading" style={{ display:'flex', justifyContent:'center' }}>
            Modify and Update Subject's
          </h1>
          <hr
            className="d-lg-none"
            style={{ borderTop: "1px solid #ccd6f6", width: "70%" }}
          ></hr>
        </div>
        <div className="col-12">
          <div className="allcards">
            <div className="cards">
              {datatoShow.map((branch) => {
                return (
                  <CardSubject
                    id={branch._id}
                    name={branch.name}
                    year={branch.year}
                    semester={branch.semester}
                    branch={branch.branch}
                    onChange={handleChange}
                    form={form}
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

export default ChangeSubject;