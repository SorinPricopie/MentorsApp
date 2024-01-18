import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { AppStateProvider, DISPATCH_ACTIONS } from "../main/app-main";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { Language } from "../main/state-model";

function AddMentorForm(props: {isAddMentorFormVisible: () => void}) {
    const _appState = useContext(AppStateProvider);
    const {appState, dispatch} = _appState;

    const [mentorNameInput, setMentorNameInput] = useState('John Doe');
    const [isMentorNameInputValid, setIsMentorNameInputValid] = useState(true);
    const handleMentorNameInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(e) {
            setIsMentorNameInputValid(e.target.value.length > 0 ? true : false);
            setMentorNameInput(e.target.value)
        }
    };

    let languages: Language[] = appState.languagesList || [];
    let uniqueLanguagesList: Language[] = [];
    languages.forEach(language => {
        if(uniqueLanguagesList.length > 0) {
            if(!uniqueLanguagesList.map(item => item.name).includes(language.name)) {
                uniqueLanguagesList = [...uniqueLanguagesList, language]
            }
        } else {
            uniqueLanguagesList = [...uniqueLanguagesList, language];
        }
    });
    
    useEffect(() => {
        languages = appState.languagesList || [];
        languages.forEach(language => {
            if(uniqueLanguagesList.length > 0) {
                if(!uniqueLanguagesList.map(item => item.name).includes(language.name)) {
                    uniqueLanguagesList = [...uniqueLanguagesList, language]
                }
            } else {
                uniqueLanguagesList = [...uniqueLanguagesList, language];
            }
        });
        setCanTeach(uniqueLanguagesList.map(language => language.name) || []);
    }, [appState])


    const [canTeach, setCanTeach] = useState<string[]>(uniqueLanguagesList.map(language => language.name) || []);
    const handleCanTeach = (event: SelectChangeEvent<typeof canTeach>) => {
        const {
            target: { value },
          } = event;
          setCanTeach(
            typeof value === 'string' ? value.split(',') : value,
          );
    };

    const onSaveMentor = (e: any) => {
        e.preventDefault();
        props.isAddMentorFormVisible();
        dispatch({
            type: DISPATCH_ACTIONS.ADD_MENTOR,
            payload: {
                name: mentorNameInput,
                id: 0,
                canTeach: canTeach,
                assignements: []
            }
        })
    };

    return (
        <Box sx={{
            border: '1px solid whitesmoke',
            borderRadius: '5px',
            padding: '1rem',
            margin: '1rem 0',
            boxSizing: 'inherit'
        }}>
            <Typography
                variant="h6"
                component='p'
                sx={{
                    padding: '0 0 1rem'
                }}
            >
                ADD MENTOR FORM
            </Typography>
            {isMentorNameInputValid.toString()}
            <Typography
                variant='body1'
                component='h3'
                sx={{
                    padding: '0.5rem 0'
                }}
            >
                Mentor's name:
            </Typography>
            <form noValidate onSubmit={(e) => onSaveMentor(e)}>
                <Box sx={{
                    padding: '1rem 0',
                    boxSizing: 'inherit',
                    display: 'flex',
                    gap: '10px'
                }}>
                    <label style={{
                        width: '100%'
                    }}>
                        <Typography sx={{
                            padding: '0.5rem 0',
                            boxSizing: 'inherit'
                        }}>
                            Mentor name:
                        </Typography>
                        <TextField
                            required
                            id="departmentNameInput"
                            error= {!isMentorNameInputValid}
                            label= {isMentorNameInputValid ? '' : 'Required'}
                            defaultValue={mentorNameInput}
                            fullWidth
                            onChange={(e) => handleMentorNameInput(e)}
                        />
                    </label>
                    <label style={{
                        width: '100%'
                    }}>
                        <Typography sx={{
                            padding: '0.5rem 0',
                            boxSizing: 'inherit'
                        }}>
                            Can teach:
                        </Typography>
                        <FormControl style={{
                            minWidth: '100%'
                        }}>
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
                    </label>
                </Box>
                <Box sx={{
                    padding: '1rem 0 0',
                    margin: '0 0 0 -0.5rem',
                    boxSizing: 'inherit'
                }}>
                    <Button sx={{
                        margin: '0 0.5rem 0',
                        boxSizing: 'inherit'
                    }}
                        type='button'
                        variant='outlined' 
                        color='info'
                        onClick={() => props.isAddMentorFormVisible()}
                    >
                        CANCEL
                    </Button>
                    <Button 
                        type='submit'
                        variant='outlined' 
                        color='success'
                        disabled={canTeach.length === 0}
                        onClick={(e) => onSaveMentor(e)}
                    >
                        SAVE
                    </Button>
                </Box>
            </form>
        </Box>
    )
};

export default AddMentorForm;