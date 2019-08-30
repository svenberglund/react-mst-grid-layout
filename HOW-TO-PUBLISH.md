# Follow the below steps to publish

Note: merging and publishing is basically all we do in this branch. 
Webpack builds, test runs and unit tests are done in dev and demo branches, here we just compile and publish the node module. 
Bump the version with "-beta" suffix if changes still are to be tested (which is conveniently done in "demo" branch).

Note2: We compile the node module with npx. If you don't have it installed (failing
with the `run dist` commmand below) you might install it globally with `sudo npm i -g npx`;

## (1) Merge all changes in the framework from dev branch to here

## (2) `npm install`
 
## (3) Bump version number in package.json

## (4) Run the following

```
npm run dist

npm publish

```

Done!



