import React, {useState} from "react"; 
function ArticleEditComp(props) {
        const [objectArticle, updateArticleObj] = useState(props.articleObj)



        const handleTextarea = (event) =>{
                const articleObj = {...objectArticle,...{text: event.target.value}}
                updateArticleObj( articleObj);
        }
        const handleSaveTextarea = () =>{
                console.log(objectArticle);
                const  articleObj = {...objectArticle,...{state: "DISPLAY"}};
                updateArticleObj( articleObj);
                console.log(articleObj);
                props.onHandleArticleDisplayState(articleObj);
        }
        const handleCancelEdit = () =>{
                const  articleObj = {...objectArticle,...{state: "DISPLAY"}};
                updateArticleObj(articleObj);
                props.onHandleArticleDisplayState(articleObj);
        }
    return (
        
            <div>
            <div><label>Article: {props.articleNum}</label></div>
            <textarea id = {objectArticle.id} rows = "5" cols = "50" onChange = {handleTextarea} value = {objectArticle.text} placeholder = "Enter text here." > </textarea>
            <button onClick = {handleCancelEdit}>Cancel</button>
            <button onClick = {handleSaveTextarea}>Save</button>
            </div>
    );
  }
  
  export default ArticleEditComp;