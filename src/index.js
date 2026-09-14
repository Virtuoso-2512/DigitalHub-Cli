import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalProvider from './GlobalParent';
import reportWebVitals from './reportWebVitals';

export default function RenderApp(){
  ReactDOM.render(
    <StrictMode>
      <GlobalProvider> <App/> </GlobalProvider>
    </StrictMode>,
    document.getElementById('root')
  )
}
RenderApp();

reportWebVitals();
