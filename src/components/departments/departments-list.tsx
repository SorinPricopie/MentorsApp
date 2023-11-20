import { useContext } from "react";
import { AppStateProvider, DISPATCH_ACTIONS } from "../main/app-main";
import Box from "@mui/material/Box";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Years from "../years/years";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function DepartmentsList() {
    const _appState = useContext(AppStateProvider);
    const {appState, dispatch} = _appState;

    const handleOnClickDepartmentList = (i: number) => {
        dispatch({type: DISPATCH_ACTIONS.CLICK_DEPARTMENT_LIST, payload: i});
    }

    const handleOnDeleteDeparment = (i: number) => {
        dispatch({type: DISPATCH_ACTIONS.DELETE_DEPARTMENT, payload: i});
    }

    const List = () => appState.departmentsList.map(
        (department, index) => {
            return (
                <Box
                    key={department.id}
                    sx={{
                        padding: '0 0 0 2.5rem'
                    }}
                >
                    <Box 
                        sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%'
                        }}
                        onClick={() => handleOnClickDepartmentList(department.id)}   
                    >
                        <Box>
                            <Tooltip title={`Delete ${department.name}`}>
                                <IconButton 
                                    color='warning' 
                                    size='small'
                                    sx={{
                                        marginRight: '0.5rem'
                                    }}
                                    onClick={() => handleOnDeleteDeparment(department.id)}
                                >
                                    {<DeleteOutlineIcon /> }
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Tooltip title={`${department.clicked ? 'Close' : 'Open'} ${department.name}`}>
                            <Box sx={{
                                display: 'inherit',
                                alignItems: 'inherit',
                                padding: '0.25rem 0 0'
                            }}>
                                {index + 1}. {department.name}:
                                {department.clicked ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                            </Box>
                        </Tooltip>
                    </Box>
                    {
                        department.clicked &&
                        <Box sx={{
                            padding: '0 0 0 0'
                        }}>
                            <Box sx={{
                                padding: '0 0 0 0'
                            }}>
                                {<Years department = {department} />}
                            </Box>
                        </Box>
                    }
                </Box>
        )
        }
        )

    return (
        <List />
   );
};

export default DepartmentsList;