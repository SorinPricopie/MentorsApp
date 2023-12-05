import { ChangeEvent, useContext, useState } from "react";
import { AppStateProvider, DISPATCH_ACTIONS } from "../main/app-main";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddDepartmentForm(props: {isAddDepartmentFormVisible: () => void}) {
    const _appState = useContext(AppStateProvider);
    const {dispatch} = _appState;

    const [departmentNameInput, setDepartmentNameInput] = useState('FrontEnd');
    const [isDepartmentNameInputValid, setIsDepartmentNameInputValid] = useState(true);
    const handleDepartmentNameInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(e) {
            setIsDepartmentNameInputValid(e.target.value.length > 0 ? true : false);
            setDepartmentNameInput(e.target.value);
        }
    }

    function onSaveDepartment(e: any) {
        e.preventDefault();
        dispatch({type: DISPATCH_ACTIONS.ADD_DEPARTMENT, payload: departmentNameInput.toString()});
        props.isAddDepartmentFormVisible();
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
                ADD DEPARTMENT FORM
            </Typography>
            <Typography
                variant='body1'
                component='h3'
                sx={{
                    padding: '0.5rem 0'
                }}
            >
                Department's name:
            </Typography>
            <form noValidate onSubmit={(e) => onSaveDepartment(e)}>
                <Box>
                    <TextField
                        required
                        id="departmentNameInput"
                        error= {!isDepartmentNameInputValid}
                        label= {isDepartmentNameInputValid ? '' : 'Required'}
                        defaultValue={departmentNameInput}
                        onChange={(e) => handleDepartmentNameInput(e)}
                    />
                </Box>
                <Box sx={{
                    padding: '1rem 0 0',
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
                        onClick={() => props.isAddDepartmentFormVisible()}
                    >
                        CANCEL
                    </Button>
                    <Button 
                        type='submit'
                        variant='outlined' 
                        color='success'
                        disabled={!isDepartmentNameInputValid}
                        onClick={(e) => onSaveDepartment(e)}
                    >
                        SAVE
                    </Button>
                </Box>
            </form>
        </Box>
    )
};

export default AddDepartmentForm;