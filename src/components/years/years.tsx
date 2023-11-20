import Box from "@mui/material/Box";
import YearsList from "./years-list";
import { Department } from "../main/state-model";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { AppStateProvider, DISPATCH_ACTIONS } from "../main/app-main";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Years(props: {department: Department}) {
    const {department} = props;
    const _appState = useContext(AppStateProvider);
    const {dispatch} = _appState;

    const [canAddYear, setCanAddYear] = useState(true);

    useEffect(() => {
        setCanAddYear(department.years.length < 5 ? true : false)
    }, [department])

    const List = () => department.years.map((year, i) => {
        return (
            <Box key={year.id}>
                {<YearsList department={department} year = {year} index={i}/>}
            </Box>
        )
    });

    const handleAddYear = (semesterID: number) => {
        dispatch({type: DISPATCH_ACTIONS.ADD_YEAR, payload: semesterID})
    }

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 0 0 2rem'
            }}>
                <Tooltip title='Add year'>
                    <IconButton
                        color='info' 
                        sx={{
                            marginRight: '0.5rem'
                        }}
                        disabled={!canAddYear}
                        onClick={() => handleAddYear(department.id)}
                    >
                        {<AddCircleOutlineIcon />}
                    </IconButton>
                </Tooltip>
                <Typography
                    variant='body1'
                    component='p'
                >
                    Years:
                </Typography>
            </Box>
            {<List />}
        </Box>
    )
};

export default Years;