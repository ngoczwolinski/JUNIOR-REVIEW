1. Create a project folder.
2. cd to folder and run 'npm init' to create package.json.  This will keep track of any dependencies (for development or production) that you install with 'npm install.'  Make sure to answer the questions in the terminal, you can hit enter if you're not sure.  And you can edit the package.json file later on.
https://nodesource.com/blog/the-basics-getting-started-with-npm
3. I like to get webpack out of the way, even if I don't have any client folder to bundle.  Run 'npm install webpack webpack-cli --save-dev'
webpack is a bundler, webpack-cli lets you run webpack in the terminal, and --save-dev means webpack will be a development dependency ---> check your package.json and you will see both modules installed!
https://webpack.js.org/guides/getting-started/

4. Create a folder called src -- this is the folder we will be actively building out the front end in.  Inside src folder, create the file index.js (remember, this the entry point specified in package.json)


