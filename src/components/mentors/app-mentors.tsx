import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useMemo, useState } from "react";
import { AppStateProvider } from "../main/app-main";
import deepOrange from "@mui/material/colors/deepOrange";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddMentorForm from "./add-mentor-form";
import MentorsList from "./mentors-list";
import EastIcon from '@mui/icons-material/East';

function AppMentors() {
    const _appState = React.useContext(AppStateProvider);
    const {appState} = _appState;

    const hasMentors = useMemo(() => appState.mentorsList && appState.mentorsList.length > 0 ? true : false, [appState]);

    const hasLanguages = useMemo(() => {
        let result = false;
        if(appState.departmentsList) {
            appState.departmentsList.forEach(department => 
                department.years.forEach(
                    year => year.semesters.forEach(semester => {
                        if(semester.languages.length > 0) {
                            result = true;
                            return
                        }
                        }
                    )
                    )
                )
            }
        return result;
    }, [appState]
    ) 

    const [isAddMentorBtnClicked, setIsAddMentorBtnClicked] = useState(false);

    const handleIsAddMentorFormVisible = () => setIsAddMentorBtnClicked(prev => prev = !prev);

    return (
        <Box sx={{flex: 1, boxSizing: 'inherit', padding: '1rem'}}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 0 0 -0.75rem',
                boxSizing: 'inherit'
            }}>
                <Tooltip title='Add mentor'>
                    <span>
                        <IconButton 
                            color='info' 
    
                            sx={{
                                marginRight: '0.5rem',
                                boxSizing: 'inherit'
                            }}
                            disabled = {isAddMentorBtnClicked || !hasLanguages}
                            onClick={() => handleIsAddMentorFormVisible()} 
                        >
                            {<AddCircleOutlineIcon />}
                        </IconButton>
                    </span>
                </Tooltip>
                <Typography variant='h6' component='h2'>
                    MENTORS
                </Typography>
            </Box>
            {
                isAddMentorBtnClicked &&
                <Box>
                    {<AddMentorForm isAddMentorFormVisible = {handleIsAddMentorFormVisible}/>}
                </Box>
            }
            <Box sx={{
                padding: '1rem 0',
                boxSizing: 'inherit'
            }}>
                {
                    hasLanguages ? 
                        (
                        hasMentors ? 
                            <Box>
                                {<MentorsList />}
                            </Box> :
                            <Typography variant='body2' component='span' color={deepOrange[400]}>
                                No mentors, please add one.
                            </Typography>

                        ) :
                        <Typography variant='body2' component='span' color={deepOrange[400]}>
                            In order to add a mentor you need at least one language, please add one.
                            <Box sx={{
                                display: 'flex'
                            }}>
                                <Typography variant='body2'>
                                    (Department
                                </Typography>
                                {<EastIcon sx={{margin: '-0.1rem 0.5rem 0', width: '1rem'}} />}
                                <Typography variant='body2'>
                                    Year
                                </Typography>
                                {<EastIcon sx={{margin: '-0.1rem 0.5rem 0', width: '1rem'}} />}
                                <Typography variant='body2'>
                                    Semester
                                </Typography>
                                {<EastIcon sx={{margin: '-0.1rem 0.5rem 0', width: '1rem'}} />}
                                <Typography variant='body2'>
                                    Language)
                                </Typography>
                            </Box>
                        </Typography>
                }
            </Box>
        </Box>
    )
};

export default AppMentors;