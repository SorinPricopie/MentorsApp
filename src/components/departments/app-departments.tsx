import { AppStateProvider } from "../main/app-main";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import deepOrange from "@mui/material/colors/deepOrange";
import Box from "@mui/material/Box";
import AddDepartmentForm from "./add-departments-form";
import DepartmentsList from "./departments-list";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from "@mui/material/Tooltip";

function AppDepartments() {
    const _appState = useContext(AppStateProvider);
    const {appState} = _appState;

    const [isAddDepartmentBtnClicked, setIsAddDepartmentBtnClicked] = useState(false);
    const handleIsAddDepartmentFormVisible = () => {
        setIsAddDepartmentBtnClicked(prev => prev = !prev);
    }

    return (
        <Box sx={{flex: 1, boxSizing: 'inherit', padding: '1rem'}}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0 0 0 -0.75rem',
                boxSizing: 'inherit'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'inherit'
                }}>
                    <Tooltip title='Add department'>
                        <span>
                            <IconButton 
                                color='info' 
        
                                sx={{
                                    marginRight: '0.5rem',
                                    boxSizing: 'inherit'
                                }}
                                disabled = {isAddDepartmentBtnClicked}
                                onClick={() => handleIsAddDepartmentFormVisible()} 
                            >
                                {<AddCircleOutlineIcon />}
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Typography variant='h6' component='h2'>
                        DEPARTMENTS
                    </Typography>
                </Box>
            </Box>
            {
                isAddDepartmentBtnClicked &&
                <Box>
                    {<AddDepartmentForm isAddDepartmentFormVisible = {handleIsAddDepartmentFormVisible}/>}
                </Box>
            }
            <Box sx={{
                padding: '1rem 0',
                boxSizing: 'inherit'
            }}>
                {
                    appState.departmentsList ?
                    <DepartmentsList /> :
                    <Typography 
                        variant='body2' 
                        component='span'
                        color={deepOrange[400]}
                    >
                        No departments, please add one.
                    </Typography>
                }
            </Box>
        </Box>
    )

};

export default AppDepartments;