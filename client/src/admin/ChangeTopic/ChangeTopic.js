import React from "react";
import { useEffect, useState } from "react";
import "./ChangeTopic.css";
import { Button } from "react-bootstrap";
import Axios from 'axios';
import { Modal } from 'react-bootstrap';
import axios from "axios";

function MyVerticallyCenteredModal(props) {

    const [obj,setObj]=useState({
      branch: props.params.branch,
      year: props.params.year,
      semester: props.params.semester,
      subject: props.params.subject,
      topic: props.params.topic,
      link: props.params.link,
      note: props.params.note,
      video: props.params.video,
    })
  
    const setPrev=(()=>{
      setObj({
        branch: props.params.branch,
        year: props.params.year,
        semester: props.params.semester,
        subject: props.params.subject,
        topic: props.params.topic,
        link: props.params.link,
        note: props.params.note,
        video: props.params.video,
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
      Axios.put(`http://localhost:3001/updateTopic/${id}`,obj);
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
          <label>Branch: </label>
          <input type="text" onChange={handleChange} value={obj.branch} name="branch"></input><br />
          <label>Year: </label>
          <input type="text" onChange={handleChange} value={obj.year} name="year"></input><br />
          <label>Semester: </label>
          <input type="text" onChange={handleChange} value={obj.semester} name="semester"></input><br />
          <label>Subject: </label>
          <input type="text" onChange={handleChange} value={obj.subject} name="subject"></input><br />
          <label>Topic: </label>
          <input type="text" onChange={handleChange} value={obj.topic} name="topic"></input><br />
          <label>Link: </label>
          <input type="text" onChange={handleChange} value={obj.link} name="link"></input><br />
          <label>Note: </label>
          <input type="text" onChange={handleChange} value={obj.note} name="note"></input><br />
          <label>Video: </label>
          <input type="text" onChange={handleChange} value={obj.video} name="video"></input><br />
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
      Axios.delete(`http://localhost:3001/deleteTopic/${id}`);
      window.location.reload();
    })

    return (
      <div className="card changeSubject-card">
        <div className="cardContent text-center py-2">
          <p> Branch: {props.branch}</p>
          <p> Year: {props.year}</p>
          <p> Semester: {props.semester}</p>
          <p> Subject: {props.subject}</p>
          <p> Topic: {props.topic}</p>
          <p> Link: {props.link}</p>
          {props.note===true && <p> Learninig Note</p> }
          {props.video===true && <p> Learninig Video</p> }
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
  


function ChangeTopic() {
    const [form, setForm] = useState(0);
    function handleChange(newValue) {
      setForm(newValue);
    }
  
    const [datatoShow,setDatatoShow]=useState([]);
    useEffect(()=>{
      Axios.get("http://localhost:3001/changeTopic").then((response)=>{
        setDatatoShow(response.data);
      });
    },[]);
  
    const [addTop,setTop]=useState({
        branch: '',
        year: '',
        semester: '',
        subject: '',
        topic: '',
        link: '',
        note: '',
        video: ''
    })
  
    const nullifyAddTop=()=>{
      setTop({
        branch: '',
        year: '',
        semester: '',
        subject: '',
        topic: '',
        link: '',
        note: '',
        video: ''
      })
    }
  
    const handleformchange=(e)=>{
      const { name, value } = e.target;
      setTop(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleAddSubject=(()=>{
      axios.post(`http://localhost:3001/insertTopic`,addTop);
      nullifyAddTop();
      window.location.reload();
    })
  
  
    return (
      <section className="changeSubject-section container">
  
        <div className="add_sub_section">
          <h1 style={{ display:'flex', justifyContent:'center', color:'greenyellow' }}>Add Topic</h1>
  
  
          <label style={{ color: 'yellow' }}>Branch: </label>
          <input type="text" onChange={handleformchange} value={addTop.branch} name="branch"></input><br />
          <label style={{ color: 'yellow' }}>Year: </label>
          <input type="text" onChange={handleformchange} value={addTop.year} name="year"></input><br />
          <label style={{ color: 'yellow' }}>Semester: </label>
          <input type="text" onChange={handleformchange} value={addTop.semester} name="semester"></input><br />
          <label style={{ color: 'yellow' }}>Subject: </label>
          <input type="text" onChange={handleformchange} value={addTop.subject} name="subject"></input><br />
          <label style={{ color: 'yellow' }}>Topic: </label>
          <input type="text" onChange={handleformchange} value={addTop.topic} name="topic"></input><br />
          <label style={{ color: 'yellow' }}>Link: </label>
          <input type="text" onChange={handleformchange} value={addTop.link} name="link"></input><br />
          <label style={{ color: 'yellow' }}>Note: </label>
          <input type="text" onChange={handleformchange} value={addTop.note} name="note"></input><br />
          <label style={{ color: 'yellow' }}>Video: </label>
          <input type="text" onChange={handleformchange} value={addTop.video} name="video"></input><br />
          <button onClick={handleAddSubject}> Add Topic  </button>
  
        </div>
  
  
  
        <div className="row">
          <div className="col-12">
            <h1 className="heading" style={{ display:'flex', justifyContent:'center', color:'greenyellow' }}>
              Modify and Update Topic's
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
                      branch={branch.branch}
                      year={branch.year}
                      semester={branch.semester}
                      subject={branch.subject}
                      topic={branch.topic}
                      link={branch.link}
                      note={branch.note}
                      video={branch.video}
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

export default ChangeTopic;