import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { AppStateProvider } from "../main/app-main";

function AppMentors() {
    const _appState = React.useContext(AppStateProvider);
    const {appState} = _appState;

    const hasMentors = appState.length === 0 ? true : false;

    return (
        <Box sx={{
            flex: 1, 
            height: '100%', 
            padding: '1rem', 
            boxSizing: 'border-box',
            borderLeft: '1px solid rgb(136, 153, 166)'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0 0 2rem'
            }}>
                <Typography variant='h6' component='h2'>
                    MENTORS
                </Typography>
                <Button variant='outlined' color='info'>
                    ADD MENTOR
                </Button>
            </Box>
            <Box>
                {
                    hasMentors &&
                    <Typography variant='body2' component='span'>
                        No mentors.
                    </Typography>
                
                }
            </Box>
        </Box>
    )
};

export default AppMentors;