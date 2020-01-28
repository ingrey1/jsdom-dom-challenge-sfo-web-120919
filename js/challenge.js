// 1. As a user, I should see the timer increment every second once the page has loaded.
// 2. As a user, I can manually increment and decrement the counter using the plus and minus buttons.
// 3. As a user, I can 'like' an individual number of the counter. I should see count of the number of 'likes' associated with that number.
// 4. As a user, I can pause the counter, which should 

//   * pause the counter
//   * disable all buttons except the pause button
//   * the pause button should then show the text "resume."

//   When 'resume' is clicked, it should restart the counter and re-enable the buttons.
// 5. As a user, I can leave comments on my gameplay, such as: "Wow, what a fun game this is."
const counterElement = document.querySelector("#counter");
const plusElement = document.querySelector("#plus");
const minusElement = document.querySelector("#minus");
const pauseElement = document.querySelector("#pause");
const likeElement = document.querySelector("#heart");
const displayLikesElement = document.querySelector(".likes");
const commentList = document.querySelector("#list");
const commentSubmitForm = document.querySelector("#comment-form");
const commentBox = document.querySelector("#comment-input"); 

let timer;

function getLikes(li) {
    const parts = li.textContent.split(":");
    const value = parseInt(parts[parts.length - 1].trim());
    return value;
    
}

function getNumber(li) {

    const parts = li.textContent.split(":");
    const value = parseInt(parts[0].split(" ")[0].trim());
    return value;
}

function setNumberLikes(li, identifier, new_value) {
    li.textContent = `${identifier} has this many likes: ${new_value}`
}

function updateDisplayLikes() {
    let found = null;
    const new_like_num = parseInt(counterElement.textContent);
    Array.from(displayLikesElement.children).forEach( (child) => {

    if (getNumber(child) === new_like_num) {
       found = child;
       
    }
  });
  
  if (!found) { // no like for num, add new li for that number with count of likes
      const new_child = document.createElement('li');
      setNumberLikes(new_child, new_like_num, 1);
      displayLikesElement.append(new_child);
    
  } else { // there is already at least one like; increment old li text value
    
     setNumberLikes(found, getNumber(found)  , getLikes(found) + 1)
  } 

}



function incrementCounter() {

    let value = parseInt(counterElement.textContent);
    value += 1;
    counterElement.textContent = value;
   
}

function addComment(comment) {
    const newComment = document.createElement("li");
    newComment.textContent = comment;
    
    commentList.append(newComment);
    console.log("children: ", commentList.children)

}

function decrementCounter() {

    let value = parseInt(counterElement.textContent);
    value -= 1;
    counterElement.textContent = value;
   
}

function setDisable(status) {
    plusElement.disabled = status;
    minusElement.disabled = status;
    likeElement.disabled = status;
}

function togglePause() {

    if (timer) {
        text = pauseElement.innerHTML;
        if (text === 'resume') {
            pauseElement.innerHTML = 'pause';
            setDisable(false);
            timer = setInterval(function(){ 
                incrementCounter();
            }, 1000);
          
        } else {
            pauseElement.innerHTML = 'resume';
            setDisable(true);
            clearInterval(timer);      
     
        }
    }

}




document.addEventListener('DOMContentLoaded', function(){
    timer = setInterval(function(){ 
        incrementCounter();
    }, 1000);
})

plusElement.addEventListener('click', function() {

    incrementCounter();

})

minusElement.addEventListener('click', function() {

    decrementCounter();

})

pauseElement.addEventListener('click', function() {

    togglePause();

})

likeElement.addEventListener('click', function() {
  
    updateDisplayLikes()

})

commentSubmitForm.addEventListener('submit', function(e) {
    e.preventDefault()
    addComment(commentBox.value);
})





