import Box from "@mui/material/Box";
import { Department, Language, Semester, Year } from "../main/state-model";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { AppStateProvider, DISPATCH_ACTIONS } from "../main/app-main";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { deepOrange } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function AssignMentorForm(props: {
    department: Department,
    year: Year,
    semester: Semester,
    language: Language,
    availableMentorList: {mentorName: string, mentorId: number}[]
}) {
    const {department, year, semester, language, availableMentorList} = props;
    const _appState = useContext(AppStateProvider);
    const {dispatch} = _appState;

    const [hasVideoSeries, setHasVideoSeries] = useState('YES');
    const handleVideoSeriesClick = (e: SelectChangeEvent<string>) => {
        e.stopPropagation();
        setHasVideoSeries(e.target.value as string);
    }

    const [noOfAssignedGroups, setNoOfAssignedGroups] = useState(0);
    const handleNoOfGroupsClick = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.stopPropagation();
        setNoOfAssignedGroups(+e.target.value < 0 ? 0 : +e.target.value);
    }

    const [mentor, setMentor] = useState(availableMentorList[0].mentorName)
    const handleChangeMentor = (e: any) => {
        e.stopPropagation();
        setMentor(e.target.value);
    };

    const [isAssignFormVisible, setIsAssignFormVisible] = useState(true);
    const handleAssignFormVisibilityClick = () => {
        setIsAssignFormVisible(() => !isAssignFormVisible);
    }

    const onAssignMentor = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const mentorId = availableMentorList.filter(m => m.mentorName === mentor)[0].mentorId;
        dispatch({
            type: DISPATCH_ACTIONS.ASSIGN_MENTOR,
            payload: {
                id: mentorId,
                assignement: {
                    id: 0,
                    departmentID: department.id,
                    departmentName: department.name,
                    year: year.year,
                    semester: semester.semester,
                    language: language.name,
                    languageID: language.id,
                    rithm: language.rithm,
                    hasVideo: hasVideoSeries === 'YES' ? true : false,
                    groups: noOfAssignedGroups,
                    effort: 0
                }
            }
        })
    }

    return (
        <Box>
            <Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box sx={{margin: '0 0.5rem 0 0'}}>
                        ASSIGNEMENT FORM
                    </Box>
                    <Box>
                        <Tooltip title={isAssignFormVisible ? 'HIDE ASSIGNMENT FORM' : 'SHOW ASSIGNMENT FORM'}>
                                <IconButton
                                    color='info'
                                    onClick={() => handleAssignFormVisibilityClick()}
                                >
                                    {
                                        !isAssignFormVisible ?
                                        <VisibilityOutlinedIcon /> :
                                        <VisibilityOffOutlinedIcon />
                                    }
                                </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                {
                    isAssignFormVisible &&
                    <form noValidate onSubmit={(e) => onAssignMentor(e)}>
                        <Box
                            sx={{
                                boxSizing: 'inherit',
                                display: 'flex',
                                alignItems: 'center',
                                margin: '0.25rem 0 0'
                            }}
                        >
                            <Box
                                sx={{
                                    width: '15rem'
                                }}
                            >
                                <Typography>
                                    Assign to:
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <FormControl style={{
                                    minWidth: '100%'
                                }}>
                                    <Select
                                        value={mentor}
                                        defaultValue={mentor}
                                        onChange={(e) => handleChangeMentor(e)}
                                    >
                                        {availableMentorList.map((mentor) => (
                                            <MenuItem key={mentor.mentorId} value={mentor.mentorName}>
                                                <ListItemText primary={mentor.mentorName} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                boxSizing: 'inherit',
                                display: 'flex',
                                alignItems: 'center',
                                margin: '1rem 0 0'
                            }}
                        >
                            <Box
                                sx={{
                                    width: '15rem'
                                }}
                            >
                                <Typography>
                                    Has video series?
                                </Typography>   
                            </Box>
                            <Box
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <FormControl style={{
                                    minWidth: '100%'
                                }}>
                                    <Select
                                        value={hasVideoSeries}
                                        onChange={(e) => handleVideoSeriesClick(e)}
                                    >
                                        <MenuItem value={'YES'}>
                                            <ListItemText primary={'YES'} />
                                        </MenuItem>
                                        <MenuItem value={'NO'}>
                                            <ListItemText primary={'NO'} />
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                boxSizing: 'inherit',
                                display: 'flex',
                                alignItems: 'center',
                                margin: '1rem 0 0'
                            }}
                        >
                            <Box
                                sx={{
                                    width: '15rem'
                                }}
                            >
                                <Typography>
                                    No. of assigned groups:
                                </Typography>   
                            </Box>
                            <Box
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <TextField
                                    sx={{minWidth: '100%'}}
                                    variant="outlined"
                                    type='number'
                                    value={noOfAssignedGroups}
                                    onChange={(e) => handleNoOfGroupsClick(e)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{
                            margin: '1rem 0 0',
                            boxSizing: 'inherit'
                        }}>
                            <Button 
                                type='submit'
                                variant='outlined' 
                                color='success'
                            >
                                ASSIGN
                            </Button>
                        </Box>
                    </form>
                }
            </Box>
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
    const _appState = useContext(AppStateProvider);
    const {appState, dispatch} = _appState;

    interface assignedMentor {
        mentorId: number,
        mentorName: string,
        hasVideoSeries: boolean,
        groups: number,
        effort: number,
        assignementId: string
    }
    const [assignedMentorsList, setAssignedMentorsList] = useState([] as assignedMentor[]);

    useEffect(() => {
        if(appState.mentorsList) {
            appState.mentorsList.forEach(mentor => {
                mentor.assignements.forEach(assignement => {
                    if(
                        +assignement.departmentID === department.id &&
                        assignement.year === year.year &&
                        assignement.semester === semester.semester &&
                        assignement.language === language.name
                        ) {

                        const newItem: assignedMentor = {
                            mentorId: mentor.id,
                            mentorName: mentor.name,
                            hasVideoSeries: assignement.hasVideo,
                            groups: assignement.groups,
                            effort: assignement.effort,
                            assignementId: assignement.id.toString()
                        };
                        setAssignedMentorsList(prev => prev = [...prev, newItem])
                    }
                })
            });
        }
    }, [appState])

    const [assignedGroups, setAssignedGroups] = useState(0);

    useEffect(() => {
        const newAssignedGroups = assignedMentorsList.map((assignedMentor) => assignedMentor.groups).reduce((prev, current) => 
            prev + current, 0
        );
        setAssignedGroups(newAssignedGroups);
    }, [assignedMentorsList])

    const hasMentors = appState.mentorsList ? 
        (appState.mentorsList.length > 0 ? true : false) :
        false;

    const handleDeleteAssignementClick = (mentorID: number, assignementID: string) => {
        dispatch({
            type: DISPATCH_ACTIONS.DELETE_ASSIGNED_MENTOR,
            payload: {mentorID: mentorID, assignementID: assignementID}
        })
    }

    let availableMentorList:{mentorName: string, mentorId: number}[] = [];

    if(appState && appState.mentorsList) {
        appState.mentorsList.forEach(mentor => {
            if(mentor.canTeach.includes(language.name)) {
                availableMentorList = [...availableMentorList, {mentorName: mentor.name, mentorId: mentor.id}]
            }
        })
    }

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
                    <strong>Assigned groups: {assignedGroups}/{language.groups}</strong>
                </Typography>
            </Box>
            <Box sx={{
                boxSizing: 'inherit',
                padding: '1rem 0 0'
            }}>
                {
                    hasMentors && availableMentorList.length > 0 ?
                        <AssignMentorForm
                            department={department}
                            year={year}
                            semester={semester}
                            language={language} 
                            availableMentorList = {availableMentorList}
                        
                        />
                        :
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
            {
                assignedMentorsList.length > 0 &&
                <>
                    <Box
                        sx={{
                            boxSizing: 'inherit',
                            margin: '2.5rem 0 0'
                        }}
                    >
                        ASSIGNED MENTORS:
                    </Box>
                    {
                        assignedMentorsList.map((assignement, i) => {
                            return (
                                <Box
                                    key={crypto.randomUUID()}
                                    sx={{boxSizing: 'inherit', display: 'flex', margin: '1rem 0 0'}}
                                >
                                    <Tooltip title='Delete assignement'>
                                        <IconButton 
                                            color='warning' 
                                            size='small'
                                            sx={{
                                                margin: '0.3rem 0.5rem 0 0',
                                                boxSizing: 'inherit',
                                                height: '1rem'
                                            }}
                                            onClick={() => handleDeleteAssignementClick(assignement.mentorId, assignement.assignementId)}
                                        >
                                            {<DeleteOutlineIcon /> }
                                        </IconButton>
                                    </Tooltip>
                                    <Box>
                                        <Box>{i + 1}. {assignement.mentorName}</Box>
                                        <Box>
                                            <Typography>Has video series: {assignement.hasVideoSeries ? 'YES' : 'NO'}</Typography>
                                            <Typography>Groups: {assignement.groups}</Typography>
                                            <Typography>Effort: {assignement.effort}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ) 
                        })
                    }
                </>
            }
        </Box>
    )
};

export default AppAssignMentors;