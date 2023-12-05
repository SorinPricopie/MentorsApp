import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Department, Semester, Year } from "../main/state-model";
import AppAddLanguageForm from "./app-add-language-form";
import deepOrange from "@mui/material/colors/deepOrange";
import AppLanguagesList from "./app-languages-list";

function AppLanguages(props: {department: Department, year: Year, semester: Semester}) {

    const {department, year, semester} = props;

    const [hasLanguage, setHasLanguage] = useState(semester.languages.length > 0);

    const [isAddLanguageFormVisible, setIsAddLanguageFormVisible] = useState(false)

    useEffect(() => {
        const hasLanguages = semester.languages.length > 0;
        setHasLanguage(hasLanguages ? true : false);
    }, [semester]);

    const handleAddLanguage = (e: any) => {
        e.preventDefault();
        setIsAddLanguageFormVisible(prev => prev = !prev);
    }
    
    return (
        <Box>
            <Box sx={{
                padding: '0 0 0 3.7rem',
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'inherit'
            }}>
                <Tooltip title='Add language'>
                    <IconButton
                        color='info' 
                        sx={{
                            marginRight: '0.5rem',
                            boxSizing: 'inherit'
                        }}
                        disabled = {isAddLanguageFormVisible}
                        onClick={(e) => handleAddLanguage(e)}
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
                margin:'0 0 0 4.5rem',
                boxSizing: 'inherit'
            }}>
                <Box>
                    {isAddLanguageFormVisible &&
                        <AppAddLanguageForm department={department} year={year} semester={semester} isFormVisible={handleAddLanguage} />
                    }
                </Box>
                {hasLanguage ? 
                    <Box>
                        {<AppLanguagesList department={department} year={year} semester={semester} />}
                    </Box>:
                    <Box>
                        <Typography 
                            variant='body2' 
                            component='span' 
                            color={deepOrange[400]}
                        >
                            No languages, please add one.
                        </Typography>
                    </Box>
                }
            </Box>
        </Box>
    )
};

export default AppLanguages;