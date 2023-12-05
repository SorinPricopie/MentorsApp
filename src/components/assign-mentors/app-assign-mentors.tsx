import Box from "@mui/material/Box";
import { Department, Language, Mentor, Semester, Year } from "../main/state-model";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { AppStateProvider, DISPATCH_ACTIONS } from "../main/app-main";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { blue, deepOrange, lime, yellow } from "@mui/material/colors";

function AssignMentorForm(props: {
    department: Department,
    year: Year,
    semester: Semester,
    language: Language
}) {
    const {department, year, semester, language} = props;
    const _appState = useContext(AppStateProvider);
    const {appState, dispatch} = _appState;

    const hasMentors = appState.mentorsList ? 
        (appState.mentorsList.length > 0 ? true : false) :
        false;

    let availableMentorList:string[] = [];
        if(appState && appState.mentorsList) {
            appState.mentorsList.forEach(mentor => {
                if(mentor.canTeach.includes(language.name)) {
                    availableMentorList = [...availableMentorList, mentor.name]
                }
            })
        }

    const [hasMentorsList, setHasMentorsList] = useState(hasMentors);

    const [mentorsList, setMentorsList] = useState(availableMentorList[0] || '')

    const handleAddMentor = (e: any, data?: Mentor) => {
        e.preventDefault();
        dispatch({
            type: DISPATCH_ACTIONS.ADD_MENTOR,
            payload: data
        })
    };

    const onAssignMentor = (e: any) => {
        e.preventDefault();
    }

    return (
        <Box>
            {
                hasMentors && availableMentorList.length > 0 ?
                <Box>
                    <form noValidate onSubmit={(e) => onAssignMentor(e)}>
                        <label style={{
                            width: '100%'
                        }}>
                            <Typography sx={{
                                padding: '0.5rem 0',
                                boxSizing: 'inherit'
                            }}>
                                Assign to:
                            </Typography>
                            <FormControl style={{
                                minWidth: '100%'
                            }}>
                                <Select
                                    value={mentorsList}
                                    defaultValue={mentorsList[0]}
                                    onChange={(e) => handleAddMentor(e)}
                                >
                                    {availableMentorList.map((mentor) => (
                                        <MenuItem key={mentor} value={mentor}>
                                            <ListItemText primary={mentor} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </label>
                        <Box sx={{
                            margin: '1rem 0 0',
                            boxSizing: 'inherit'
                        }}>
                            <Button 
                                type='submit'
                                variant='outlined' 
                                color='success'
                                onClick={(e) => e.preventDefault()}
                            >
                                ASSIGN
                            </Button>
                        </Box>
                    </form>
                </Box> :
                <Box>
                    <Typography
                        variant='body2'
                        component='p'
                        color={deepOrange[400]}
                    >
                        No mentors to be assigned for this language. Please add one.
                    </Typography>
                </Box>
            }
        </Box>
    )
};

function AppAssignMentors(props: {
    department: Department,
    year: Year,
    semester: Semester,
    language: Language
}) {
    const {department, year, semester, language} = props;
    return (
        <Box sx={{
            margin: '1rem 0 1rem 2.75rem',
            boxSizing: 'inherit',
            border: '1px solid whitesmoke',
            borderRadius: '5px',
            padding: '1rem',
        }}>
            <Box sx={{
                boxSizing: 'inherit',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Typography
                    variant='body1'
                    component='p'
                >
                    <strong>Rithm: {language.rithm}</strong>
                </Typography>
                <Typography
                    variant='body1'
                    component='p'
                >
                    <strong>Available groups: {language.groups}</strong>
                </Typography>
                <Typography
                    variant='body1'
                    component='p'
                >
                    <strong>Assigned groups: 0/{language.groups}</strong>
                </Typography>
            </Box>
            <Box sx={{
                boxSizing: 'inherit',
                padding: '1rem 0 0'
            }}>
                {<AssignMentorForm department={department} year={year} semester={semester} language={language} />}
            </Box>
            <Box
                sx={{
                    boxSizing: 'inherit',
                    margin: '2.5rem 0 0'
                }}
            >
                ASSIGNED MENTORS:
            </Box>
        </Box>
    )
};

export default AppAssignMentors;