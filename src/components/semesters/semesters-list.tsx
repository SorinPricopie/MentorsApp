import Box from "@mui/material/Box";
import { useContext } from "react";
import { AppStateProvider, DISPATCH_ACTIONS, DeleteSemesterPayload } from "../main/app-main";
import { Department, Year } from "../main/state-model";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppLanguages from "../languages/app-languages";

function SemestersList(props: {department: Department, year: Year}) {
    const _appState = useContext(AppStateProvider);
    const {dispatch} = _appState;

    const {department, year} = props;

    const List = () => year.semesters.map((semester) => {
        return (
            <Box key={semester.id}>
            <Box 
                  sx={{
                    padding: '0 0 0 1.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'inherit'
                }}
                onClick={() => handleOnClickSemesterList({departmentID: department.id, yearID: year.id, semesterID: semester.id})}
            >
                <Box>
                    <Tooltip title={`Delete semester ${year.year}`}>
                        <IconButton 
                            color='warning' 
                            size='small'
                            sx={{
                                marginRight: '0.5rem',
                                boxSizing: 'inherit'
                            }}
                            onClick={() => handleOnDeleteSemester({departmentID: department.id, yearID: year.id, semesterID: semester.id})}
                        >
                            {<DeleteOutlineIcon /> }
                        </IconButton>
                    </Tooltip>
                </Box>
                <Tooltip title={`${semester.clicked ? 'Close' : 'Open'} semester ${year.year}`}>
                    <Box sx={{
                        display: 'inherit',
                        alignItems: 'inherit',
                        padding: '0.25rem 0 0',
                        boxSizing: 'inherit'
                    }}>
                        Semester {semester.semester}
                        {semester.clicked ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                    </Box>
                </Tooltip>
            </Box>
            {
                semester.clicked &&
                <AppLanguages department={department} year={year} semester={semester}/>
            }
            </Box>
        )
    });

    const handleOnDeleteSemester = (data: DeleteSemesterPayload) => {
      dispatch({type: DISPATCH_ACTIONS.DELETE_SEMESTER, payload: data})  
    }

    const handleOnClickSemesterList = (data: DeleteSemesterPayload) => {
        dispatch({type: DISPATCH_ACTIONS.CLICK_SEMESTER_LIST, payload: data})
    }

    return (
        <>
            {<List />}
        </>
    )
};

export default SemestersList;