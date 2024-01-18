import { useContext, useState } from "react";
import { AppStateProvider, DISPATCH_ACTIONS } from "../main/app-main";
import { Language, Mentor } from "../main/state-model";
import deepOrange from "@mui/material/colors/deepOrange";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

const MentorAssignementsList = (props: {mentorData: Mentor}) => {
    const {mentorData} = props;

    const result = mentorData.assignements.map((assignement, index) => {
        return (
            <Box key={assignement.id} sx={{padding: '0 0 0 1rem'}}>
                <Box sx={{padding: '0 0 0.5rem 1rem'}}>
                    <Box sx={{margin: '0 0 0 -1.25rem'}}>
                        {index + 1}. Department: {assignement.departmentName}
                    </Box>
                    <Box>
                        Year: {assignement.year}
                    </Box>
                    <Box>
                        Semester: {assignement.semester}
                    </Box>
                    <Box>
                        Language: {assignement.language}
                    </Box>
                    <Box>
                        Rithm: {assignement.rithm}
                    </Box>
                    <Box>
                        Has video series: {assignement.hasVideo ? 'YES' : 'NO'}
                    </Box>
                    <Box>
                        Assigned groups: {assignement.groups}
                    </Box>
                    <Box>
                        Effort: {assignement.effort}
                    </Box>
                </Box>
            </Box>
        )
    });

    return (
        <>
            <Box sx={{margin: '0.5rem 0 0.5rem'}}>
                Assignements:
            </Box>
            {result}
            <Box sx={{margin: '0.5rem 0 0'}}>
                Total effort: {mentorData.totalEffort}
            </Box>
        </>
    );
}

const MentorAssignements = (props: {mentorData: Mentor}) => {
    const {mentorData} = props;

    return (
            <Box
                sx={{
                    padding: '0 0 0 1.25rem'
                }}
            >
                {mentorData.assignements.length > 0 ?
                <Box>
                    {<MentorAssignementsList mentorData = {mentorData} />}
                </Box> :
                <Box>
                    <Typography color={deepOrange[400]}>
                        No assignements yet. 
                    </Typography>
                </Box>
                }
            </Box>
    )
}

function MentorsList() {
    const {appState} = useContext(AppStateProvider);
    const {mentorsList} = appState;
    const _appState = useContext(AppStateProvider);
    const {dispatch} = _appState;

    const canTeachList = (arr: string[]): string => {
        let result='';
        arr.forEach(item => result += item + ', ');
        
        return result.substring(0, result.length-2);
    }

    let uniqueLanguagesList = [] as unknown as Language[];
    const languages: Language[] = appState.languagesList || [];
    languages.forEach(language => {
        if(!uniqueLanguagesList.map(item => item.name).includes(language.name)) {
            uniqueLanguagesList = [...uniqueLanguagesList, language]
        }
    })

    const [canTeach, setCanTeach] = useState<string[]>([...new Set(languages.map(language => language.name))] || []);
    const handleCanTeach = (event: SelectChangeEvent<typeof canTeach>) => {
        const {
            target: { value },
          } = event;
          setCanTeach(
            typeof value === 'string' ? value.split(',') : value,
          );
    };
    const [clickedRowID, setClickedRowID] = useState(-1);
    const handleOnCancelEditLanguageClick = () => {
        setClickedRowID(() => -1);
    };
    const handleOnEditLanguageClick = (mentorID: number) => {
        setClickedRowID(() => mentorID);
    }

    const handleEditMentorLanguagesClick = (mentorId: number) => {
        dispatch({
            type: DISPATCH_ACTIONS.UPDATE_MENTOR_LANGUAGES,
            payload: {
                id: mentorId,
                canTeach: canTeach
            }
        });
        setClickedRowID(() => -1);
    }

    return (
        mentorsList.map((mentor, i) => {
            return (
                <Box 
                    key={mentor.id}
                    sx={{
                        padding: '1rem 2.35rem',
                        boxSizing: 'inherit',
                    }}
                >
                    <Box sx={{display: 'flex'}}>
                        <Box>
                            {i+1}. {mentor.name}
                        </Box>
                        <Box sx={{margin: '0 0 0 1rem'}}>
                            <Tooltip title='Print'>
                                <PrintOutlinedIcon color='info' />
                            </Tooltip>
                        </Box>
                    </Box>
                    {
                        mentor.id !== clickedRowID ? 
                        <Box sx={{
                            boxSizing: 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Box sx={{margin: '0 0.25rem 0 1.15rem'}}>
                                Can teach: {canTeachList(mentor.canTeach)}
                            </Box>
                            <Tooltip title="Edit">
                                <IconButton
                                    onClick={() => handleOnEditLanguageClick(mentor.id)}
                                >
                                    <BuildCircleOutlinedIcon color='info' />
                                </IconButton>
                            </Tooltip>
                        </Box> :
                        <Box sx={{margin: '0 0.25rem 0 1.15rem'}}>
                            <label style={{
                                width: '100%'
                            }}>
                                <Typography sx={{
                                    padding: '0.5rem 0',
                                    boxSizing: 'inherit'
                                }}>
                                    Can teach:
                                </Typography>
                                <FormControl style={{minWidth: '100%'}}>
                                    <Select
                                        multiple
                                        value={canTeach}
                                        defaultValue={['0']}
                                        renderValue={(selected) => selected.join(', ')}
                                        onChange={(e) => handleCanTeach(e)}
                                    >
                                        {uniqueLanguagesList.map((language) => (
                                            <MenuItem key={language.id} value={language.name}>
                                                <Checkbox checked={canTeach.indexOf(language.name) > -1} />
                                                <ListItemText primary={language.name} />
                                            </MenuItem>
                                        ))}
                                        </Select>
                                </FormControl>
                                <Box sx={{
                                    padding: '1rem 0 0',
                                    margin: '0 0 1.5rem -0.5rem',
                                    boxSizing: 'inherit'
                                }}>
                                    <Button sx={{
                                        margin: '0 0.5rem 0',
                                        boxSizing: 'inherit'
                                    }}
                                        type='button'
                                        variant='outlined' 
                                        color='info'
                                        onClick={() => handleOnCancelEditLanguageClick()}
                                    >
                                        CANCEL
                                    </Button>
                                    <Button 
                                        type='submit'
                                        variant='outlined' 
                                        color='success'
                                        disabled={canTeach.length === 0}
                                        onClick={() => handleEditMentorLanguagesClick(mentor.id)}
                                    >
                                        SAVE
                                    </Button>
                                </Box>
                            </label>
                        </Box>
                    }
                    {<MentorAssignements mentorData={mentor} />}
                </Box>
            )
        })
    )
};

export default(MentorsList);