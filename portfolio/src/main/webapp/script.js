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
  factContainer.innerText = "You found a hidden fact! \n \n" + fact + "\n \n Reload the page, and this fact will disappear";
}

// adds start from where
var bar1 = new ProgressBar.Line(htmlBar, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '100%'}
});

bar1.animate(1.0); 

// the following is prob not needed
//
// const spans = document.querySelectorAll('h1 span')
// spans.forEach(span => span.addEventListener ('mouseover',function(e){
//   span.classList.add('animated', 'rubberBand')
// }))
//
// spans.forEach(span => span.addEventListener ('mouseout',function(e){
//   span.classList.remove('animated', 'rubberBand')
// }))
//
// const htmlBar = document.querySelector('.bar-html')
// const jsBar = document.querySelector('.bar-javascript')
// const pythonBar = document.querySelector('.bar-python')
// const javaBar = document.querySelector('.bar-java')
//
// var t1 = new TimelineLite()
//
// t1.fromTo(htmlBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(90% - 6px)`, ease: Power4.easeOut})
//   .fromTo(jslBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(90% - 6px)`, ease: Power4.easeOut})
//   .fromTo(pythonlBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(90% - 6px)`, ease: Power4.easeOut})
//   .fromTo(javalBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(90% - 6px)`, ease: Power4.easeOut})
//
//   const contoller = new ScrollMagic.Controller()
//   const scene = new ScrollMagic.Scene({
//     triggerElement: '.skills',
//     triggerHook: 0
//   })
//   .setTween(t1)
//   .addTo(controller)

  // const showRequiredCategory = event => {
  //   const getId = event.id
  //   const link = documnet.querySelectorAll()
  //
  // }
