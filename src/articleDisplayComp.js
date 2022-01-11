import React, {useState} from "react"; 
function ArticleDisplayComp(props) {
    const [objectArticle, updateArticleObj] = useState(props.articleObj)

         const handleEditArticle = () =>{
            const  articleObj = {...objectArticle,...{state: "EDIT"}};
            updateArticleObj( articleObj);
            props.onHandleArticleEditState(articleObj);
    }
        const removeArticle = () =>{
            props.onHandleRemoveArticle(objectArticle);
            
    }

    return (
        
            <div>
                <label>Article: {props.articleNum}</label>
                <p>Content: {objectArticle.text}</p>
                <button onClick = {removeArticle}>Remove</button>
                <button onClick = {handleEditArticle}>Edit</button>
            </div>
    );
  }
  
  export default ArticleDisplayComp;