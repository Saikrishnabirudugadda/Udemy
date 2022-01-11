import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid'; 
import ArticleEditComp from "./articleEditComp";
import ArticleDisplayComp from "./articleDisplayComp";
function ArticleListComp(props) {
      
        const [articleArr, updateArticleArr] = useState(props.articleArr);
        
        const addNewArticle = () =>{
                updateArticleArr([...articleArr,{articleId : createUUID(), text : "", state: "EDIT"}])
        }
        const createUUID = () =>{
                return uuidv4();
        }
        const saveArticleState = (articleObj) =>{  
                const articleArrClone = [...articleArr];
                updateArticleArr(articleArrClone); 
                let articleIndex = articleArrClone.findIndex(object => object.articleId === articleObj.articleId);
                articleArrClone[articleIndex] = articleObj;
                updateArticleArr(articleArrClone); 
                props.onHandleArticleEditOrDisplayState(articleArrClone);
        }
        const deleteArticle = (articleObj) =>{
                const articleArrClone = [...articleArr];
                let articleIndex = articleArrClone.findIndex(object => object.articleId === articleObj.articleId);
                articleArrClone.splice(articleIndex, 1);
                updateArticleArr(articleArrClone); 
                props.onHandleArticleEditOrDisplayState(articleArrClone);
        }
    return (
        
            <div className = "content">
            <button onClick = {props.onHandleRemoveArtcileComp}>Cancel</button>
            <button onClick = {addNewArticle}>Add Article</button>
            <div className = "articleContentDiv">
                    {articleArr.map((article, index) =>{

                           return article.state === 'EDIT' ?  ( <ArticleEditComp key = {article.articleId} articleNum = {index +1} articleObj = {article}  onHandleArticleDisplayState = {saveArticleState}  />) :
                           (<ArticleDisplayComp key = {article.articleId}  articleNum = {index +1} articleObj = {article} onHandleRemoveArticle = {deleteArticle} onHandleArticleEditState = {saveArticleState}/>)

                    })
                            
                    }            
            </div>
            </div>
    );
  }
  
  export default ArticleListComp;