import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useContext, useState } from "react";
import { AppStateProvider, DISPATCH_ACTIONS, LANGUAGE_RITHM } from "../main/app-main";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Department, Semester, Year } from "../main/state-model";

function AppAddLanguageForm(props: {department: Department, year: Year, semester: Semester, isFormVisible: (e: any) => void}) {
    const _appState = useContext(AppStateProvider);
    const {dispatch} = _appState;

    const {department, year, semester, isFormVisible} = props;

    const [languageNameInput, setLanguageNameInput] = useState('React');
    const [isLanguageNameInputValid, setIsLanguageNameInputValid] = useState(true);
    const handleLanguageNameInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsLanguageNameInputValid(e.target.value.length > 0 ? true : false)
        setLanguageNameInput(e.target.value);
    };

    const [languageRithm, setLanguageRithm] = useState(LANGUAGE_RITHM[0].rithm);
    const handleLanguageRithm = (e: SelectChangeEvent) => {
        setLanguageRithm(e.target.value);
    }

    const [groupsInput, setGroupsInput] = useState(1);
    const [isGroupsInputValid, setIsGroupsInputValid] = useState(true);
    const handleGroupsInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsGroupsInputValid(+e.target.value < 0 ? false : true);
        setGroupsInput(+e.target.value < 0 ? 0 : +e.target.value);
    };

    const onSubmitAddLanguageForm = (e: any) => {
        e.preventDefault();
        isFormVisible(e);
        dispatch(
            {
                type: DISPATCH_ACTIONS.ADD_LANGUAGE, 
                payload: {
                    departmentName: department.name,
                    departmentID: department.id,
                    yearID: year.id,
                    semesterID: semester.id,
                    name: languageNameInput,
                    rithm: languageRithm,
                    groups: groupsInput
                }
            }
            )
    }

    return (
        <Box sx={{
            padding: '1rem',
            border: '1px solid whitesmoke',
            borderRadius: '5px',
            margin: '1rem 0',
            boxSizing: 'inherit'
        }}>
            <form noValidate onSubmit={(e) => onSubmitAddLanguageForm(e)}>
                <Typography
                    variant="h6"
                    component='p'
                >
                    ADD LANGUAGE FORM
                </Typography>
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
                            Language name:
                        </Typography>
                        <TextField
                            required
                            type='text'
                            id="languageNameInput"
                            error= {!isLanguageNameInputValid}
                            label= {isLanguageNameInputValid ? '' : 'Required'}
                            defaultValue={languageNameInput}
                            fullWidth
                            onChange={(e) => handleLanguageNameInput(e)}
                        />
                    </label>
                    <label style={{
                        width: '100%'
                    }}>
                        <Typography sx={{
                            padding: '0.5rem 0',
                            boxSizing: 'inherit'
                        }}>
                            Language rithm
                        </Typography>
                        <FormControl style={{
                            minWidth: '100%'
                        }}>
                            <Select
                                value={languageRithm ? languageRithm : ''}
                                defaultValue={languageRithm}   
                                fullWidth
                                onChange={(e) => handleLanguageRithm(e)}
                            >
                                {LANGUAGE_RITHM.map(language => 
                                        <MenuItem key={language.id} value={language.rithm}>
                                            {language.rithm}
                                        </MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </label>
                </Box>
                <Box sx={{
                    padding: '1rem 0',
                    boxSizing: 'inherit'
                }}>
                    <label>
                        <Typography sx={{
                            padding: '0.5rem 0',
                            boxSizing: 'inherit'
                        }}>
                            No. of groups:
                        </Typography>
                        <TextField
                            style={{minWidth: '100%'}}
                            required
                            type='number'
                            InputProps={{ inputProps: { min: 0, max: 10 } }}
                            id="groupsInput"
                            error= {!isGroupsInputValid}
                            label= {isGroupsInputValid ? '' : 'Minim 0'}
                            defaultValue={groupsInput}
                            onChange={(e) => handleGroupsInput(e)}
                        />
                    </label>
                </Box>
                <Box sx={{
                    margin: '1rem 0 0 -0.5rem',
                    boxSizing: 'inherit'
                }}>
                    <Button sx={{
                        margin: '0 0.5rem 0',
                        boxSizing: 'inherit'
                    }}
                        type='button'
                        variant='outlined' 
                        color='info'
                        onClick={(e) => {e.preventDefault(); isFormVisible(e)}}
                    >
                        CANCEL
                    </Button>
                    <Button 
                        type='submit'
                        variant='outlined' 
                        color='success'
                        disabled={!isLanguageNameInputValid || !isGroupsInputValid}
                    >
                        SAVE
                    </Button>
                </Box>
            </form>
        </Box>
    )
};

export default AppAddLanguageForm;