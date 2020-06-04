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

//take a text sectio and make it into a li element 
function createListElement(text) {
    const liElement = document.createElement('li');
    liElement.innerText = text;
    return liElement
}

// todo list 
function loadTasks() {
  fetch('/list-tasks').then(response => response.json()).then((tasks) => {
    const taskListElement = document.getElementById('task-list');
    tasks.forEach((task) => {
      taskListElement.appendChild(createTaskElement(task));
    })
  });
}

// Creates an element that represents a task, including its delete button. 
function createTaskElement(task) {
  const taskElement = document.createElement('li');
  taskElement.className = 'task';

  const titleElement = document.createElement('span');
  titleElement.innerText = task.title;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteTask(task);

    // Remove the task from the DOM.
    taskElement.remove();
  });

  taskElement.appendChild(titleElement);
  taskElement.appendChild(deleteButtonElement);
  return taskElement;
}

// Tells the server to delete the task. 
function deleteTask(task) {
  const params = new URLSearchParams();
  params.append('id', task.id);
  fetch('/delete-task', {method: 'POST', body: params});
}