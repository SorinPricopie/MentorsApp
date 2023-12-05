import Box from "@mui/material/Box";
import { Department, Semester, Year } from "../main/state-model";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AppStateProvider, DISPATCH_ACTIONS, DeleteLanguagePayload } from "../main/app-main";
import { useContext } from "react";
import AppAssignMentors from "../assign-mentors/app-assign-mentors";

function AppLanguagesList(props: {department: Department, year: Year,  semester: Semester}) {
    const _appState = useContext(AppStateProvider);
    const {dispatch} = _appState;
    const {department, year, semester} = props;

    const handleOnClickLanguageList = (data: DeleteLanguagePayload) => {
        dispatch({
            type: DISPATCH_ACTIONS.CLICK_LANGUAGE_LIST,
            payload: data
        })
    };

    const handleOnDeleteLanguage = (e: any, data: DeleteLanguagePayload) => {
        e.preventDefault();
        dispatch({
            type: DISPATCH_ACTIONS.DELETE_LANGUAGE,
            payload: data
        })
    };

    const List = () => {
        const result = semester.languages.map((language, index) => {
                return (
                    <Box 
                        key={language.id}
                        margin='0 0 0 1.5rem'
                    >
                        <Box 
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                boxSizing: 'inherit'
                            }}
                            onClick={() => handleOnClickLanguageList({
                                departmentID: department.id,
                                yearID: year.id,
                                semesterID: semester.id,
                                id: language.id
                            })}   
                        >
                            <Box>
                                <Tooltip title={`Delete ${language.name}`}>
                                    <IconButton 
                                        color='warning' 
                                        size='small'
                                        sx={{
                                            marginRight: '0.5rem',
                                            boxSizing: 'inherit'
                                        }}
                                        onClick={(e) => handleOnDeleteLanguage(e, {
                                            departmentID: department.id,
                                            yearID: year.id,
                                            semesterID: semester.id,
                                            id: language.id
                                        })}
                                    >
                                        {<DeleteOutlineIcon /> }
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Tooltip title={`${language.clicked ? 'Close' : 'Open'} ${language.name}`}>
                                <Box sx={{
                                    display: 'inherit',
                                    alignItems: 'inherit',
                                    padding: '0.25rem 0 0',
                                    boxSizing: 'inherit'
                                }}>
                                    {index + 1}. {language.name}
                                    {language.clicked ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                                </Box>
                            </Tooltip>
                        </Box>
                        {
                            language.clicked &&
                            <AppAssignMentors department={department} year={year} semester={semester} language={language} />
                        }
                    </Box>
                )
            })

        return result;
    }

    return (
        <Box>
            {<List />}
        </Box>
    )
};

export default AppLanguagesList;