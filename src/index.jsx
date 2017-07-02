import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { pink500, darkBlack } from 'material-ui/styles/colors';
import App from './components/App';
import './style.scss';

const root = document.getElementById('root');

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: pink500,
    textColor: darkBlack,
  }
});

render(
  <AppContainer>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </AppContainer>,
  root,
);

if (module.hot) module.hot.accept(App, () => render(App));

