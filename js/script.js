const sectionComment = document.querySelector(".comment-section");
function displayAComment(prim, username, createdAt, content, note, imageLink){


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

        commentInfos.append(imageAvatar, h3, commentDate);
        commentInteraction.appendChild(createInteractionCRUD(false));
        commentHeader.append(commentInfos, commentInteraction);

        commentContent.appendChild(commentText);

        commentContainer.append(commentHeader, commentContent);

        

        primaryComment.appendChild(createInteractionNote(note));
        primaryComment.appendChild(commentContainer);

        return primaryComment;

        
}


function callDataJson(method){ 
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


                        console.log(dataReplies);  
                        // console.log(data.comments.replies[i]);

                        
                        
                        const comment = document.createElement("article");
                        comment.classList.add("total-comment");

                        comment.appendChild( displayAComment(true, dataUsername, dataCreatedAt, dataContent, dataNote, dataImageLink));
                        

                       
                        
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
                                        
                                        
                                        repliesContainer.appendChild(displayAComment(false, replyUsername, replyCreatedAt, replyContent, replyNote, replyImageLink));
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
        }

        return commentInteraction;
}


callDataJson();
