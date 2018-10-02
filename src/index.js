import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './message-relay/psWorkerRelayPublisher';
import './message-relay/psSubscriber';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
