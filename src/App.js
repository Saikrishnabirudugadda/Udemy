import React, {useState, useEffect} from "react"; 
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import LinearProgress from '@mui/material/LinearProgress';
import LectureInputComp from './lectureInputComp.js';
import LectureDisplayComp from './lectureDisplayComp';

function App() {
  const [lectureArr, updateLectureArr] = useState([]);
  const [loadingStatus, updateLoadingStatus] = useState('loading')
  useEffect(() =>{

    const getLectureData = () =>{
      fetch('https://jsonblob.com/api/jsonBlob/929962219803000832').then( response => response.json()).then((data) => 
      updateLectureArr(data))
      updateLoadingStatus('loaded');  
  };
  getLectureData();
  }, [])
  console.log(lectureArr);
  function addNewLecture (event){
    updateLectureArr([...lectureArr, { id: createUUID(), startDate: "", endDate: "", lectureState: "EDITLECNAME", lectureName: "", articleStatus: false, article: []}]);
  }

  const handleOnSave = (lectureObj) =>{
    console.log(lectureObj);
    const updatedLectureArr = [...lectureArr];
    let lecObjIndex = updatedLectureArr.findIndex(obj => obj.id === lectureObj.id);
    updatedLectureArr[lecObjIndex] = lectureObj;
    updateLectureArr(updatedLectureArr);
  }
 const handleOnRemoveLec = (lectureObj) =>{
   const updatedLectureArr = [...lectureArr];
   let lecObjIndex = updatedLectureArr.findIndex(obj => obj.id === lectureObj.id)
   updatedLectureArr.splice(lecObjIndex, 1);
   updateLectureArr(updatedLectureArr);
   console.log(lectureArr);
 } 
 
function createUUID(){
 
  return uuidv4();
}
  return (
   
      <div className ="addNewLectureContain" >
            <div className = "addButton" >
                    <input type = "button"   id = "addNewLecture" onClick={addNewLecture} value = "ADD" ></input>
                    <button id = "saveLectures" >Save</button>
          </div>
          {loadingStatus === 'loading' && <LinearProgress color="secondary" />}
          {lectureArr.map((lecObj, index) =>{
            return lecObj.lectureState === 'EDITLECNAME' ? 
            <LectureInputComp key = {lecObj.id} lectureObj = {lecObj} lecNum = {index + 1}  onSave = {handleOnSave} onRemoveLec = {handleOnRemoveLec} /> :
            <LectureDisplayComp  key = {lecObj.id} lectureObj = {lecObj} lecNum = {index + 1} onRemoveLec = {handleOnRemoveLec} setLecEditState = {handleOnSave} />;

            })
          }
      </div>
    
    
  );

}

export default App;
