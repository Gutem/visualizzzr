### Visualizzzr

Dependencies:  
 * Nodejs  
 * NPM

#### TL;DR;
`gulp` or `gulp build`

#### Building
First of all, you have to execute this command at your _Terminal_:
```
npm install
```
This command installs all _DevDependencies_ at _package.json_ file to use the Gulp as build runner.

#### Gulp

I'm using Gulp as a build runner.
In the _gulpfile.js_ you will find the tasks below:

##### Clean
```
gulp clean
```
This task wipes all files at dist's folder.

##### SASS
```
gulp sass
```
This task compiles, autoprefix, organize (using CSSComb) and minify SASS/SCSS files and copy 'em to it's assets's folder at dist's folder.

##### Scripts
```
gulp scripts
```
This task concat, minify and copy all scripts files to it's assets's folder at dist's folder.

##### Fonts
```
gulp fonts
```
This task copies all custom Fonts files to it's assets's folder at dist's folder.

##### Jade
```
gulp jade
```
This task compiles Jade files and copy 'em to assets's folder at dist's folder.

##### Images
```
gulp images
```
This task optimizes Images files and copy 'em to it's assets's folder at dist's folder.

##### Vendor
```
gulp vendor
```
This task copies Vendor's files to dist's folder.

##### Build
```
gulp build
```
Run all above tasks in the order showned above.

Obs.: `gulp` fallbacks to this task as default.

##### Watch
```
gulp watch
```
The `watch` task run all the tasks, as the `build` task, but keeps listen to changes on the files, running the related task, i.e. if the changes are in the Jade file, it will run only the Jade task, and run the special task `browserSync` that will reload the browser and inject the changes without Developer interaction.