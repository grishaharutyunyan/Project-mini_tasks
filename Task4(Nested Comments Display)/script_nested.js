// comments data
const comments = [
    {
        id: 1,
        text: "This is the first comment",
        parentId: null,
        replies: [
            {
                id: 2,
                text: "This is a reply to the first comment",
                parentId: 1,
                replies: [
                    {
                        id: 3,
                        text: "This is a nested reply",
                        parentId: 2,
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        text: "This is an independent comment",
        parentId: null,
        replies: [
            {
                id: 5,
                text: "This is a nested . reply",
                parentId: 4,
                replies: [
                    {
                        id: 6,
                        text: "This is a nested .. reply",
                        parentId: 5,
                        replies: []
                    }

                ]
            }
        ]
    },

];


function generateCommentHTML(comment, level) {

    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.style.marginLeft = `${level * 30}px`;
    commentDiv.textContent = comment.text;


    document.getElementById("comments-container").appendChild(commentDiv);


    for (const reply of comment.replies) {
        generateCommentHTML(reply, level + 1);
    }
}

for (const comment of comments) {
    generateCommentHTML(comment, 0);
}

