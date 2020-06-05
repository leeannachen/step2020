// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */

function addRandomGreeting() {
  const facts =
      ['I have a tabby cat named Poppy.', 'I was in a drumline.', 'I\'m part of Y Fashion House at Yale.', 'I love to paint.', 'I am from Nashville.'];

  // Pick a random greeting.
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('message-container');

  factContainer.innerText = "You found a hidden fact! \n \n" + fact;
}

// Fetches comments
function getComments() {
    console.log("Fetching comments")
    const responsePromise = fetch('/data');
    responsePromise.then(handleResponse);
}

// Handles response stream by converting it to text and passing the result to addQuoteToDom().
function handleResponse(response) {
  console.log('Handling the response.');
  const textPromise = response.text();
  textPromise.then(addCommentsToDom);
}

function addCommentsToDom(comments) {
  console.log("Adding the following comments to DOM: " + comments);
  const commentContainer = document.getElementById('comment-container');
  commentContainer.innerText = comments;  
}

//take a text section and make it into a li element 
function createListElement(text) {
    const liElement = document.createElement('li');
    liElement.innerText = text;
    return liElement
}

// todost 
function loadComments() {
  fetch('/list-comments').then(response => response.json()).then((comments) => {
    const commentListElement = document.getElementById('comment-list');
    comments.forEach((comment) => {
      commentListElement.appendChild(createCommentElement(comment));
    })
  });
}

// Creates an element that represents a comment, including its delete button. 
function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.className = 'comment';

  const titleElement = document.createElement('span');
  titleElement.innerText = comment.title;

  const userElement = document.createElement('span');
  userElement.innerText = comment.user;

  const timeElement = document.createElement('span');
  timeElement.innerText = comment.time;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteComment(comment);

    // Remove the comment from the DOM.
    commentElement.remove();
  });

  commentElement.appendChild(titleElement);
  commentElement.appendChild(userElement);
  commentElement.appendChild(timeElement);
  commentElement.appendChild(deleteButtonElement);
  return commentElement;
}

// Tells the server to delete the comment. 
function deleteComment(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
 fetch('/delete-comment', {method: 'POST', body: params});
}