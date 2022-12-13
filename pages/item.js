import Story from "../components/story.js";
import Comment from "../components/Comments.js";
import view from "../utils/view.js";
import baseUrl from "../utils/baseUrl.js";

export default async function Item() {
    let story = null;
    let hasComments = false;
    let hasError = false; 
     
    try {
        story =  await getStory();
        hasComments =  story.comments.length > 0;
    } catch(error) {
        hasError = true;
    }

    if(hasError) {
        view.innerHTML = `<div class="error">Error Fetching Content</div>`
    }

    view.innerHTML =  `
        <div>
            ${Story(story)}
        </div>
        <hr/>
        ${hasComments ? story.comments.map(comment => Comment(comment)).join('' ) : "No Comments"}
    `
}

async function getStory() {
    const storyId = window.location.hash.split('?id=')[1];
    const response = await fetch(`${baseUrl}/item/${storyId}`)
    const story = await response.json()
    // console.log(story)
    return story
}