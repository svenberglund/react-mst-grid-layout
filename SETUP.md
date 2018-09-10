Describes setup of the project stack. 

Prereqs: npm (install node.js with your ntive package manager and den do npm init)

## (0) A plain react project with 'hidden' configs for weback, bable ...etc. 

```
sudo npm install -g -y create-react-app
create-react-app <your-app-name>
cd <my-app-name>
npm start

```
To create a deployment bundle
```
npm run build
```
## (0.1) extra react stuff

Buttons and other gui commponents 
```
npm install semantic-ui-react --save
npm install semantic-us-css --save
```

## (1) Add react-app-rewire to gain control of babel (alternative is to eject)
By doing this we can add support for decorators and other js additions.

https://github.com/timarney/react-app-rewired
https://www.leighhalliday.com/mobx-create-react-app-without-ejecting

```
npm install react-app-rewired --save-dev

```

## (2) Add MST 

```
npm install mobx --save
npm install mobx-react --save
npm install mobx-state-tree --save
npm install react-app-rewire-mobx --save
```

## (3) Support for web workers via react-app-rewire
npm install react-app-rewired worker-loader --save-dev