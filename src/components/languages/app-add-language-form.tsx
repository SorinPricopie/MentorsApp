import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { LANGUAGE_RITHM } from "../main/app-main";

function AppAddLanguageForm() {
    const [languageNameInput, setLanguageNameInput] = useState('Language name');
    const [isLanguageNameInputValid, setIsLanguageNameInputValid] = useState(true);
    const handleLanguageNameInput = (e) => {
        console.log(e)
    };

    const [languageRithm, setLanguageRithm] = useState(LANGUAGE_RITHM[0].rithm);

    const [groupsInput, setGroupsInput] = useState(1);
    const [isGroupsInputValid, setIsGroupsInputValid] = useState(true);
    const handleGroupsInput = (e) => {
        console.log(e)
    };

    return (
        <Box sx={{
            padding: '1rem',
            border: '1px solid whitesmoke',
            borderRadius: '5px'
        }}>
            <form noValidate>
                <TextField
                    required
                    type='text'
                    id="languageNameInput"
                    error= {!isLanguageNameInputValid}
                    label= {isLanguageNameInputValid ? '' : 'Required'}
                    defaultValue={languageNameInput}
                    onChange={(e) => handleLanguageNameInput(e)}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Language rithm</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue='1/1'    
                    >
                        {LANGUAGE_RITHM.map(language => 
                                <MenuItem key={language.id} value={language.rithm}>
                                    {language.rithm}
                                </MenuItem>)
                        }
                    </Select>
                </FormControl>
                <TextField
                    required
                    type='number'
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                    id="groupsInput"
                    error= {!isGroupsInputValid}
                    label= {isGroupsInputValid ? '' : 'Required'}
                    defaultValue={groupsInput}
                    onChange={(e) => handleGroupsInput(e)}
                />
            </form>
        </Box>
    )
};

export default AppAddLanguageForm;