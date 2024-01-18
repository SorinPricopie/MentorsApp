import Box from "@mui/material/Box";
import { useContext } from "react";
import { AppStateProvider, DISPATCH_ACTIONS, DeleteYearPayload } from "../main/app-main";
import { Department, Year } from "../main/state-model";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Semesters from "../semesters/semesters";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


function YearsList(props: {department: Department, year: Year, index: number}) {
    const _appState = useContext(AppStateProvider);
    const {dispatch} = _appState;

    const {department, year} = props;

    const handleOnDeleteYear = (data: DeleteYearPayload) => {
        dispatch({type: DISPATCH_ACTIONS.DELETE_YEAR, payload: data});
    }

    const handleOnClickYearList = (data: DeleteYearPayload) => {
        dispatch({type: DISPATCH_ACTIONS.CLICK_YEAR_LIST, payload: data})
    }

    return (
        <Box sx={{padding: '0 0 0 4.15rem', boxSizing: 'inherit'}}>
            <Box 
                sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'inherit'
                }}
                onClick={() => handleOnClickYearList({departmentID: department.id, yearID: year.id})}
            >
                <Box>
                    <Tooltip title={
                        year.semesters.length > 0 ?
                            `Cannot delete, year contains data` :
                            `Delete year ${year.year}`
                        }
                    >
                        <span>
                            <IconButton 
                                color='warning' 
                                size='small'
                                sx={{
                                    marginRight: '0.5rem',
                                    boxSizing: 'inherit'
                                }}
                                disabled = {year.semesters.length > 0}
                                onClick={() => handleOnDeleteYear({departmentID: department.id, yearID: year.id})}
                            >
                                {<DeleteOutlineIcon /> }
                            </IconButton>
                        </span>
                    </Tooltip>
                </Box>
                <Tooltip title={`${year.clicked ? 'Close' : 'Open'} year ${year.year}`}>
                    <Box sx={{
                        display: 'inherit',
                        alignItems: 'inherit',
                        padding: '0.25rem 0 0',
                        boxSizing: 'inherit'
                    }}>
                        Year {year.year}
                        {year.clicked ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                    </Box>
                </Tooltip>
            </Box>
            {
                year.clicked &&
                <Box>
                    {<Semesters department={department} year={year} />}
                </Box>
            }
        </Box>
    )
};

export default YearsList;