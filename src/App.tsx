import './app.css';
import AppMain from './components/main/app-main';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTheme, ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import amber from '@mui/material/colors/amber';
import grey from '@mui/material/colors/grey';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box sx={{
      bgcolor: 'background.default',
      color: 'text.primary',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <header>
        {<AppHeader theme = {theme} colorMode = {colorMode}/>}
      </header>
      <main style={{
        width: '100%',
        flex: 'auto'
      }}>
        {<AppMain theme = {theme} />}
      </main>
      <footer>
        {<AppFooter theme = {theme} />}
      </footer>
    </Box>
  )
}

const AppHeader = (props: {theme: Theme, colorMode: { toggleColorMode: () => void; }}) => {
  const {theme, colorMode} = props;

  return (
    <Box sx={{
        height: '100%',
        padding: '1rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: theme.palette.mode.toString() === 'dark' ? '#15202B' : 'lightgray',
        boxSizing: 'inherit'
    }}>
        <Box sx={{
            padding: '0 0 0 1.4rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            boxSizing: 'inherit'
        }}>
            <Box sx={{margin: '0.25rem 1rem 0 -0.25rem', boxSizing: 'inherit'}}>
              <style>
                {
                  `
                  .react_logo {
                    animation: logo-spin infinite 20s linear;
                  }
                  
                  @keyframes logo-spin {
                    from {
                      transform: rotate(0deg);
                    }
                    to {
                      transform: rotate(360deg);
                    }
                  }
                  `
                }
              </style>
              <img 
                className='react_logo'
                src="src/assets/react.svg" 
                alt='react logo' />
            </Box>
            <Typography 
              variant='body1' 
              component='span'
            >
                <strong>MENTORS ASSIGNEMENTS REACT APP</strong>
            </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            boxSizing: 'inherit'
          }}
        >
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
    </Box>
  )
};

const AppFooter = (props: {theme: Theme}) => {
  const {theme} = props;
  return (
    <Box sx={{
        padding: '0.5rem 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        background: theme.palette.mode.toString() === 'dark' ? '#15202B' : 'lightgray',
        boxSizing: 'inherit'
    }}>
        <Typography 
          variant='body2' 
          component='span' 
          sx={{color: 'text.secondary', boxSizing: 'inherit'}}
        >
            Tech stack: React 18, Mui 5 
        </Typography>
    </Box>
  )
}

function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme: Theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
          ? {
              primary: amber,
              divider: amber[200],
              text: {
                primary: grey[900],
                secondary: grey[800],
              },
            }
          : {
              primary: {
                main: '#15202B'
              },
              divider: '#FFFFFF',
              background: {
                default: '#15202B',
                paper: '#15202B',
              },
              text: {
                primary: '#FFFFFF',
                secondary: '#8899A6',
              }
            }),
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;
