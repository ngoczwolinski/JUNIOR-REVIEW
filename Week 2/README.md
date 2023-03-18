# Week 2

## DOM Manipulation

## Fetch

[Visualization for Event Loop](https://www.jsv9000.app/)

## React

# Week 3: a focus on redux

## Redux

3 golden rules of React:

- State is imutable
- State should be maintained in the top level components
- Props can only passed from parent to child, not sibiling to sibling

Redux is a state management for React

- Here is a basic breakdown of its cycle
- Dispatch & Action

![redux cycle](https://cdn-images-1.medium.com/max/2000/1*QxZJEXWhsS-YuG5SZsRgjA.png)

### Folder Structure for Redux App:

| Folders/Files | Description                                                                                                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| actions       | Contains action creators                                                                                                                                                                  |
| constants     | Contains action types => using constant for action types helps prevents typo and Intellisence will give drop down                                                                         |
| reducer       | Contains intial state & reducer function for updating state                                                                                                                               |
| store.js      | The central/Redux store of CURRENT state. We use createStore, and passed in the Reducer. When reducer return new state, the state within Redux store will be updated => trigger re-render |
| containers    | Contains react components: _MainContainer.jsx_                                                                                                                                            |
| components    | Contains react components: _Counter.jsx_                                                                                                                                                  |

## UI/UX (ig uessss)

something something colors!

Have fun!

CSS Flexbox cheatsheet:

![CSS Flexbox](https://css-tricks.com/wp-content/uploads/2022/02/css-flexbox-poster.png)

CSS Grid cheatsheet:

![CSS grid](https://css-tricks.com/wp-content/uploads/2022/02/css-grid-poster.png)

## Node/Express

Node is a runtime enviroment that allows us to run JS on the server-side outside of the browser.
Express provides us a series of methods to handle HTTP requests, middleware functions and to modularize routes.

## Async

https://javascript.info/async-await

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

A good diagram of promises:

![Promise Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)
