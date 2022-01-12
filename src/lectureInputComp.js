// import { render } from "@testing-library/react";
import DatePicker  from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import React, {useState, useEffect} from "react"; 
// import ReactDOM from 'react-dom';

function LectureInputComp(props) {
  const [lectureObj, updateLectureObj] = useState(props.lectureObj);

  useEffect(()=> {
    if(lectureObj.lectureState === 'DISPLAYLECNAME')
    {
      props.onSave(lectureObj);
    }
  });
  
  

  function handleInputValue(event){
    const lecture = {...lectureObj,...{lectureName:event.target.value}};
    updateLectureObj(lecture);
  }
  
  const handleOnSave = (event) =>{
    const lecture = {...lectureObj,...{lectureState:"DISPLAYLECNAME"}};
    updateLectureObj(lecture);
  }
  const handleOnRemoveLec = (event) =>{
    props.onRemoveLec(lectureObj);
}
const setStartDate = (date) =>{
  const lecture = {...lectureObj,...{startDate : date}};
  updateLectureObj(lecture);
}
const setEndDate = (date) =>{
  const lecture = {...lectureObj,...{endDate : date}};
  updateLectureObj(lecture);
}
 
    return (
      <div key = {props.lecIndex} className = "addNewLecture">
        <div    id = {"section" + props.lectureObj.id} className = "sections">
            <label>Lecture {props.lecNum}: </label>
            <input   id ={"inputEle" + props.lectureObj.id} type = "text" onChange={handleInputValue} className = "lectureName" maxLength = {80} placeholder = "Enter Lecture name"  value = {lectureObj.lectureName} />
            <DatePicker selected = {lectureObj.startDate} placeholderText = "Select start date." dateFormat = "dd/MM/yyyy" onChange = {setStartDate} showYearDropdown showMonthDropdown />
            <DatePicker selected = {lectureObj.endDate} minDate = {lectureObj.startDate} placeholderText = "Select end date." dateFormat = "dd/MM/yyyy" onChange = {setEndDate} showYearDropdown showMonthDropdown />
            <div  id = {"saveAndRemoveBtn" + props.lectureObj.id} className = "saveAndCancleButtonsContainer" >
                <button  className = "Remove" onClick = {handleOnRemoveLec}>Remove</button>
                <button  className ="saveLectureName" onClick ={handleOnSave}>Save Lecture</button>
            </div>
            
        </div>
      </div> 
    );
  }
  
  export default LectureInputComp;