const sectionComment = document.querySelector(".comment-section");
let currentUser;
let currentAvatar;
function displayAComment(prim, username, createdAt, content, note, imageLink, mine){


        const primaryComment = document.createElement("div");

        if(prim === true){
                primaryComment.className = "comment primary-comment";
        }else{

                primaryComment.className = "comment secondary-comment";
        }
        
        

        commentContainer = document.createElement("div");
        commentContainer.classList.add("comment-info");


        const commentHeader = document.createElement("div");
        commentHeader.className = "comment-header";


        const commentInfos = document.createElement("div");
        commentInfos.className = "comment-infos";

        const imageAvatar = document.createElement("img");
        imageAvatar.setAttribute("src", imageLink);
        imageAvatar.setAttribute("alt", "user");
        const h3 = document.createElement("h3");
        h3.classList.add("comment-title");

        const commentDate = document.createElement("span");
        commentDate.classList.add("comment-date");

        const commentContent = document.createElement("div");
        commentContent.classList.add("comment-content");
        const commentText = document.createElement("p");
        commentText.classList.add("comment-text");

        commentInteraction = document.createElement("div");
        commentInteraction.classList.add("comment-interaction");


        h3.textContent = username;
        commentDate.textContent = createdAt;
        commentText.textContent = content;
        if(mine){
                commentInteraction.appendChild(createInteractionCRUD(true));
                const yourComment = document.createElement("span");
                yourComment.classList.add("your-comment");
                yourComment.textContent = "you";
                commentInfos.append(imageAvatar, h3, yourComment, commentDate);
        } else {
                commentInteraction.appendChild(createInteractionCRUD(false));
                commentInfos.append(imageAvatar, h3, commentDate);
        }
        
        
        commentHeader.append(commentInfos, commentInteraction);

        commentContent.appendChild(commentText);

        commentContainer.append(commentHeader, commentContent);

        

        primaryComment.appendChild(createInteractionNote(note));
        primaryComment.appendChild(commentContainer);

        const screenMobileDiv = document.createElement("div");
        screenMobileDiv.classList.add("screen-mobile");

        if(mine){
                primaryComment.appendChild(screenMobileDiv);
                screenMobileDiv.appendChild(createInteractionNote(note));
                screenMobileDiv.appendChild(createInteractionCRUD(true));
                
        } else {
                primaryComment.appendChild(screenMobileDiv);
                screenMobileDiv.appendChild(createInteractionNote(note));
                screenMobileDiv.appendChild(createInteractionCRUD(false));
                
        }

        return primaryComment;

        
}


function callDataJson(){ 
        fetch("./data.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
                console.log(data)
                for(let i = 0; i < data.comments.length; i++){

                        let dataReplies = data.comments[i].replies;
                        let dataUsername = data.comments[i].user.username;
                        let dataCreatedAt = data.comments[i].createdAt;
                        let dataContent = data.comments[i].content;
                        let dataNote = data.comments[i].score;
                        let dataImageLink = data.comments[i].user.image.webp;


                        console.log(data);  
                        // console.log(data.comments.replies[i]);

                        currentUser = data.currentUser.username;
                        currentAvatar = data.currentUser.image.webp;
                        
                        const comment = document.createElement("article");
                        comment.classList.add("total-comment");

                        if (data.currentUser.username === dataUsername){
                                comment.appendChild( displayAComment(true, dataUsername, dataCreatedAt, dataContent, dataNote, dataImageLink, true));
                        } else {
                                comment.appendChild( displayAComment(true, dataUsername, dataCreatedAt, dataContent, dataNote, dataImageLink, false));
                        }
                        
                        

                       
                        
                        if(dataReplies.length > 0){

                                const repliesContainer = document.createElement("div");
                                repliesContainer.classList.add("replies-container");
                                comment.appendChild(repliesContainer);

                                for(let v = 0; v < dataReplies.length; v++){
                               
                                        let replyUsername = dataReplies[v].user.username;
                                        let replyCreatedAt = dataReplies[v].createdAt;
                                        let replyContent = dataReplies[v].content;
                                        let replyNote = dataReplies[v].score;
                                        let replyImageLink = dataReplies[v].user.image.webp;
                                        
                                        if (data.currentUser.username === replyUsername){
                                                repliesContainer.appendChild(displayAComment(false, replyUsername, replyCreatedAt, replyContent, replyNote, replyImageLink, true));
                                        } else {
                                                repliesContainer.appendChild(displayAComment(false, replyUsername, replyCreatedAt, replyContent, replyNote, replyImageLink, false));
                                        }
                                }

                        }

                        sectionComment.appendChild(comment);

                }     
        });
}

function createInteractionNote(note){
        const noteContainer = document.createElement("div");
        noteContainer.classList.add("note-container");

        const iconPlus = document.createElement("button");
        const iconPlusImg = document.createElement("img");
        iconPlusImg.setAttribute("src", "./images/icon-plus.svg");
        iconPlusImg.setAttribute("alt", "up vote this comment");

        const strong = document.createElement("strong");
        strong.classList.add("note");
        strong.textContent = note;

        const iconMoins = document.createElement("button");
        const iconMoinsImg = document.createElement("img");
        iconMoinsImg.setAttribute("src", "./images/icon-minus.svg");
        iconMoinsImg.setAttribute("alt", "down vote this comment");

        iconPlus.appendChild(iconPlusImg);
        iconMoins.appendChild(iconMoinsImg);
        
        noteContainer.appendChild(iconPlus);
        noteContainer.appendChild(strong);
        noteContainer.appendChild(iconMoins);

        return noteContainer;

}

function createInteractionCRUD(mine){
        const mobileSize = window.matchMedia("(max-width: 700px)");

        const commentInteraction = document.createElement("div");
        commentInteraction.classList.add("comment-interaction");

        const buttonReply = document.createElement("button");
        buttonReply.classList.add("btn-reply");

        const imageReply = document.createElement("img");
        imageReply.setAttribute("src", "./images/icon-reply.svg");
        imageReply.setAttribute("alt", "reply");

        const spanReply = document.createElement("span");
        spanReply.textContent = "Reply";

        buttonReply.appendChild(imageReply);
        buttonReply.appendChild(spanReply);

        commentInteraction.appendChild(buttonReply);


        buttonReply.addEventListener("click", function(){

               let targetToDisplay;
                
                mobileSize.matches ? targetToDisplay = this.parentNode.parentNode.parentNode.parentNode : targetToDisplay = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;


                let targetUsername;
                if(mobileSize.matches){
                        targetUsername = this.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[1].textContent;
                } else {
                        targetUsername = this.parentNode.parentNode.parentNode.childNodes[0].childNodes[1].textContent;         
                }
                

                


                targetToDisplay.insertBefore(displayInputToReply(targetUsername), targetToDisplay.childNodes[1]);
                
                console.log("en bas: targetToDisplay");
                console.log(targetToDisplay);
        });
        // FIN ADD EVENT LISTENER

        if(mine){
                const buttonDelete = document.createElement("button");
                buttonDelete.classList.add("delete");

                const imageDelete = document.createElement("img");
                imageDelete.setAttribute("src", "./images/icon-delete.svg");
                imageDelete.setAttribute("alt", "delete");

                const spanDelete = document.createElement("span");
                spanDelete.textContent = "Delete";

                buttonDelete.appendChild(imageDelete);
                buttonDelete.appendChild(spanDelete);

                commentInteraction.appendChild(buttonDelete);
                imageReply.setAttribute("src", "./images/icon-edit.svg");
                spanReply.textContent = "Edit";


                buttonDelete.addEventListener("click", function(){

                        let targetToRemove;
                        if(mobileSize.matches){
                                targetToRemove = commentInteraction.parentNode.parentNode;
                        } else {
                                targetToRemove = commentInteraction.parentNode.parentNode.parentNode.parentNode;
                        }
                        

                        targetToRemove.classList.contains("secondary-comment") ? targetToRemove.parentNode.removeChild(targetToRemove) : targetToRemove.parentNode.parentNode.removeChild(targetToRemove.parentNode);
                });


        }

        return commentInteraction;
}


callDataJson();


const sendCommentButton = document.querySelector("#post-message");

sendCommentButton.addEventListener("click", function(event){
        event.preventDefault();
        const commentToSend = document.querySelector("#comment");

        const commentArticle = document.createElement("article");
        commentArticle.classList.add("total-comment");

        commentArticle.appendChild(displayAComment(true, currentUser, "seconds ago", commentToSend.value, 0, currentAvatar, true));
        sectionComment.appendChild(commentArticle);
});


function displayInputToReply(userToReply) {
        const postCommentContainer = document.createElement("div");
        postCommentContainer.classList.add("post-comment-container");
        postCommentContainer.classList.add("secondary-comment");

        const form = document.createElement("form");
        form.classList.add("post-comment-form");

        const img = document.createElement("img");
        img.setAttribute("src", currentAvatar);
        img.setAttribute("alt", "My avatar");

        const textArea = document.createElement("textarea");
        textArea.setAttribute("placeholder", "Add a comment");
        textArea.setAttribute("name", "comment");
        textArea.value = "@" + userToReply;
        

        const button = document.createElement("button");
        button.classList.add("btn-post-comment");
        button.textContent = "Reply";
        button.setAttribute("type", "submit");

        form.appendChild(img);
        form.appendChild(textArea);
        form.appendChild(button);

        postCommentContainer.appendChild(form);

        button.addEventListener("click", function(e){
                e.preventDefault();

                const comment = this.parentElement.parentElement.parentElement;
                const commentContent = this.parentNode.childNodes[1].value;
                comment.style.Width = "96%";

                if (this.parentElement.parentElement.parentElement.classList.contains("replies-container")) {
                        comment.appendChild(displayAComment(false, currentUser, "seconds ago", commentContent, 0, currentAvatar, true));
                } else if (this.parentElement.parentElement.parentElement.classList.contains("total-comment") && comment.childNodes.length ===  2) {
                        const reppliesContainer = document.createElement("div");
                        reppliesContainer.classList.add("replies-container");
                        reppliesContainer.appendChild(displayAComment(false, currentUser, "seconds ago", commentContent, 0, currentAvatar, true));
                        comment.appendChild(reppliesContainer);
                }  else if (this.parentElement.parentElement.parentElement.classList.contains("total-comment") && comment.childNodes.length === 3) {
                        comment.childNodes[2].appendChild(displayAComment(false, currentUser, "seconds ago", commentContent, 0, currentAvatar, true));
                }      

                this.parentElement.parentElement.remove();
                // this.parentElement.parentElement.remove();

                
                
                        // if (1 === 1){
                        //         comment.appendChild( displayAComment(false, currentUser, "seconds ago", commentContent, 0, currentAvatar, true));
                        // } else {
                        //         comment.appendChild( displayAComment(false, currentUser, "seconds ago", commentContent, 0, currentAvatar, true));
                        // }

                // si c'est le seul ptn de commentaire
                // const repliesContainer = document.createElement("div");
                // repliesContainer.classList.add("replies-container");
                // comment.appendChild(repliesContainer);



                //End of life of this element who deserve to post a repply
                
        });

        return postCommentContainer;
}