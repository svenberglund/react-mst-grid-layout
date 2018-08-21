import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './models/asyncAPIWrapper';
import './models/asyncSubscriber';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
