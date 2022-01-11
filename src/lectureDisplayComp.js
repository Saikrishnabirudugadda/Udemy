import React, {useState, useEffect} from "react"; 
// import moment from 'moment'
// import Calendar from 'ciqu-react-calendar'
// import { DatePicker } from '@y0c/react-datepicker';
import ArticleListComp from "./articleListComp";
function LectureDisplayComp(props) {

     const [lectureObj, updateLectureObj] = useState(props.lectureObj);
    useEffect(()=> {
    if(lectureObj.lectureState === 'EDITLECNAME')
      {
        props.setLecEditState(lectureObj);
      }
  
  });

    const handleEditLecInput = (event) =>{
    const lecture = {...lectureObj,...{lectureState: "EDITLECNAME"}};
    updateLectureObj(lecture);
    }
    const handleOnRemoveLec = (event) =>{
    props.onRemoveLec(lectureObj);
    }   

const setArticleToListState = () =>{
    const lecture = {...lectureObj,...{articleStatus: true}};
    updateLectureObj(lecture);
    props.setLecEditState(lecture);
    }

  const  setArticleToEditOrDisplayState = (articleArr) =>{
    const lecture = {...lectureObj,...{article: articleArr}};
    updateLectureObj(lecture);
    props.setLecEditState(lecture);
    }

  const removeAtricleComp = () =>{
    const lecture = {...lectureObj,...{articleStatus: false}};
    updateLectureObj(lecture);

  //  const onChangeDate = (value, inputValue) => {
  //     console.log(value.format('YYYY-MM-DD'))
  //     this.setState({value});
  //   }
  
  //   const onOpenChangeDate = (status) => {
  //     console.log('open status: ' + status);
  //   }
  
  //   const onDisabledDate = (currentDate, inputValue) => {
  //     return false;
  //   }
}


    return (
        <div className = "addNewLecture">
            <div id = {"section" + props.lectureObj.id} className = "sections">
                <label>Lecture</label> <label>{props.lecNum}:</label>
                    <label id = {"label" +  props.lectureObj.id}> {lectureObj.lectureName} </label>
                    <button id = {"edit" +  props.lectureObj.id} onClick = {handleEditLecInput} >
                        <span className="glyphicon glyphicon-edit">Edit</span>
                    </button>
                    <button id = {"del" +  props.lectureObj.id} onClick = {handleOnRemoveLec} >
                        <span className="glyphicon glyphicon-remove"></span>Remove</button>
                    <button onClick = {setArticleToListState} >Add content</button>
                    {/* <div style={{height: '80px'}}>
                    <Calendar
                      onChange={onChangeDate}
                      value={moment()}
                      allowClear={true}
                      disabled={false}
                      placeholder={'Select start date'}
                      format={'YYYY-MM-DD'}
                      onOpenChange={onOpenChangeDate}
                      disabledDate={onDisabledDate}
                    />
                      <DatePicker dateFormat = "DD/MM/YYYY" startPlaceholder = "Select start date" endPlaceholder = "Select end date"/>
                    </div> */}
                    {
                        lectureObj.articleStatus && <ArticleListComp key = {lectureObj.id + "articleList"} articleArr= {lectureObj.article} 
                        onHandleRemoveArtcileComp = {removeAtricleComp} onHandleArticleEditOrDisplayState = {setArticleToEditOrDisplayState} />
                        
                    }
                    
            </div> 
        </div> 
    );
  }
  
  export default LectureDisplayComp;