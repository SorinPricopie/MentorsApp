import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { AppStateProvider, DeleteSemesterPayload } from "../main/app-main";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Department, Semester, Year } from "../main/state-model";
import AppAddLanguageForm from "./app-add-language-form";
import deepOrange from "@mui/material/colors/deepOrange";

function AppLanguages(props: {department: Department, year: Year, semester: Semester}) {
    const _appState = useContext(AppStateProvider);
    const {dispatch} = _appState;

    const {department, year, semester} = props;

    const [hasLanguage, setHasLanguage] = useState(false);

    const [isAddLanguageFormVisible, setIsAddLanguageFormVisible] = useState(false)

    useEffect(() => {
        setHasLanguage(semester.languages.length > 0 ? true : false)
    }, [semester]);

    const handleAddLanguage = (data: DeleteSemesterPayload) => {
        setIsAddLanguageFormVisible(prev => prev = !prev);
    }
    
    return (
        <Box>
            <Box sx={{
                padding: '0 0 0 2rem',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Tooltip title='Add language'>
                    <IconButton
                        color='info' 
                        sx={{
                            marginRight: '0.5rem'
                        }}
                        disabled = {isAddLanguageFormVisible}
                        onClick={() => handleAddLanguage({departmentID: department.id, yearID: year.id, semesterID: semester.id})}
                    >
                        {<AddCircleOutlineIcon />}
                    </IconButton>
                </Tooltip>
                    <Typography
                    id='languagesLabel'
                    variant='body1'
                    component='p'
                >
                    Languages:
                </Typography>
            </Box>
            <Box sx={{
                padding: '0 0 0 5rem'
            }}>
                <Box>
                    {isAddLanguageFormVisible &&
                        <AppAddLanguageForm />
                    }
                </Box>
                {hasLanguage ? 
                    <Box>
                        Languages.
                    </Box> :
                    <Box>
                        <Typography variant='body2' component='span' color={deepOrange[400]}>
                            No languages, please add one.
                        </Typography>
                    </Box>
                }
            </Box>
        </Box>
    )
};

export default AppLanguages;