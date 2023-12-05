import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { AppStateProvider, DISPATCH_ACTIONS, DeleteYearPayload } from "../main/app-main";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from "@mui/material/Typography";
import { Department, Year } from "../main/state-model";
import SemestersList from "./semesters-list";

function Semesters(props: {department: Department, year: Year}) {
    const _appState = useContext(AppStateProvider);
    const {dispatch} = _appState;

    const {department, year} = props;

    const [canAddSemester, setCanAddSemester] = useState(true);

    useEffect(() => {
        setCanAddSemester(year.semesters.length === 2 ? false : true);
    }, [year])

    const handleOnAddSemester = (data: DeleteYearPayload) => {
        dispatch({type: DISPATCH_ACTIONS.ADD_SEMESTER, payload: data});
        if(year.semesters.length) {

        }
    };

    return (
            <Box sx={{padding: '0  0 0 1.9rem'}}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    boxSizing: 'inherit'
                }}>
                    <Tooltip title='Add semester'>
                        <IconButton 
                            color='info' 
                            size='small'
                            sx={{
                                marginRight: '0.5rem',
                                boxSizing: 'inherit'
                            }}
                            disabled = {!canAddSemester}
                            onClick={() => handleOnAddSemester({departmentID: department.id, yearID: year.id})}
                        >
                            {<AddCircleOutlineIcon />}
                        </IconButton>
                    </Tooltip>
                    <Typography variant='body1' component='p'>
                        Semesters:
                    </Typography>
                </Box>
                {<SemestersList department={department} year={year} />}
            </Box>
    )
};

export default Semesters;