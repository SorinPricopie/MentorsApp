import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import React, { Dispatch, useReducer } from "react";
import {AppState, Semester, Year} from "./state-model";
import AppDepartments from "../departments/app-departments";
import AppMentors from "../mentors/app-mentors";
import Years from "../years/years";

export const AppStateProvider = React.createContext({} as {
    appState: AppState;
    dispatch: Dispatch<REDUCER_ACTIONS>;
});

export interface DeleteYearPayload {
    departmentID: number,
    yearID: number
}


export interface DeleteSemesterPayload {
    departmentID: number,
    yearID: number,
    semesterID: number
}

export interface LanguageRithm {
    rithm: string,
    id: number
}

export const enum DISPATCH_ACTIONS {
    ADD_DEPARTMENT,
    DELETE_DEPARTMENT,
    CLICK_DEPARTMENT_LIST,
    ADD_YEAR,
    DELETE_YEAR,
    CLICK_YEAR_LIST,
    ADD_SEMESTER,
    DELETE_SEMESTER,
    CLICK_SEMESTER_LIST,
    ADD_LANGUAGE,
    ADD_MENTOR
};

export const LANGUAGE_RITHM: LanguageRithm[] = [
    {
        rithm: '1/1',
        id: 1
    },
    {
        rithm: '2/1',
        id: 2
    },
    {
        rithm: '3/1',
        id: 3
    },
    {
        rithm: '2/2',
        id: 4
    },
]

type REDUCER_ACTIONS = {
    type:  DISPATCH_ACTIONS,
    payload?: string | number | DeleteYearPayload | DeleteSemesterPayload
}

const reducer = (state: AppState, action:  REDUCER_ACTIONS): AppState => {
    let result: AppState = state;
    switch (action.type) {
        case DISPATCH_ACTIONS.ADD_DEPARTMENT: {
            const id = state.departmentsList && state.departmentsList.length > 0 ? state.departmentsList[state.departmentsList.length - 1].id + 1 : 1;
            result = state.departmentsList ?
                {
                    ... state,
                    departmentsList: [
                        ...state.departmentsList,
                        {
                            name: action.payload ? action.payload.toString() : '',
                            id: id,
                            years: [
                                {
                                    year: 1,
                                    id: 1,
                                    semesters: [
                                        {
                                            semester: 1,
                                            id: 1,
                                            languages: [],
                                            clicked: false
                                        }
                                    ],
                                    clicked: false
                                }
                            ],
                            clicked: false
                        }
                    ]
                } :
                {
                    ... state,
                    departmentsList: [
                        {
                            name: action.payload ? action.payload.toString() : '',
                            id: id,
                            years: [
                                {
                                    year: 1,
                                    id: 1,
                                    semesters: [
                                        {
                                            semester: 1,
                                            id: 1,
                                            languages: [],
                                            clicked: false
                                        }
                                    ],
                                    clicked: false
                                }
                            ],
                            clicked: false
                        }
                    ]
                };
            break;
        }
        case DISPATCH_ACTIONS.CLICK_DEPARTMENT_LIST: {
            state.departmentsList.forEach(department => {
                if(department.id === action.payload) {
                    department.clicked = !department.clicked
                } else {
                    department.clicked = department.clicked
                }
            });
            result = {...state};
            break;
        }
        case DISPATCH_ACTIONS.DELETE_DEPARTMENT: {
            state.departmentsList = state.departmentsList.filter(department => department.id !== action.payload);
            result = {...state};
            break;
        }
        case DISPATCH_ACTIONS.ADD_YEAR: {
            const department = state.departmentsList.filter(department => department.id === action.payload)[0];
            const id: number = department.years.length > 0 ? 
                department.years[department.years.length - 1].id + 1 :
                1;
            const newYearItem: Year = {
                year: id,
                id: id,
                semesters: [
                    {
                        semester: 1,
                        id: 1,
                        languages: [],
                        clicked: false
                    }
                ],
                clicked: false
            };
            state.departmentsList.forEach(department => {
                if(department.id === action.payload) {
                    department.years = [...department.years, newYearItem];
                } else {
                    department.years = department.years;
                }
            })
            result = {...state};
            break;
        }
        case DISPATCH_ACTIONS.DELETE_YEAR: {
            const {departmentID, yearID} = action.payload as DeleteYearPayload;

            state.departmentsList.forEach(department => {
                if(department.id === departmentID) {
                    department.years = department.years.filter(year => year.id !== yearID);
                }
            });
            result = {...state};
            break;
        }
        case DISPATCH_ACTIONS.CLICK_YEAR_LIST: {
            const {departmentID, yearID} = action.payload as DeleteYearPayload;
            state.departmentsList.forEach(department => {
                if(department.id === departmentID) {
                    department.years.forEach(year => {
                        if(year.id === yearID) {
                            year.clicked = !year.clicked;
                        } else {
                            year.clicked = year.clicked;
                        }
                    })
                }
            });
            result = {...state};
            break;
        }
        case DISPATCH_ACTIONS.ADD_SEMESTER: {
            const {departmentID, yearID} = action.payload as DeleteYearPayload;
            const department = state.departmentsList.filter(department => department.id === departmentID)[0];
            const year = department.years.filter(year => year.id === yearID)[0];
            const id: number = year.semesters.length > 0 ? 
                year.semesters[year.semesters.length - 1].id + 1 :
                1;
            const newSemester: Semester = {
                semester: id,
                id: id,
                languages: [],
                clicked: false
            };

            state.departmentsList.forEach(department => {
                if(department.id === departmentID) {
                    department.years.forEach(year => {
                        if(year.id === yearID) {
                            year.semesters = [...year.semesters, newSemester]
                        }
                    })
                }
            });

            result = {...state};
            break;
        }
        case DISPATCH_ACTIONS.DELETE_SEMESTER: {
            const {departmentID, yearID, semesterID} = action.payload as DeleteSemesterPayload;

            state.departmentsList.forEach(department => {
                if(department.id === departmentID) {
                    department.years.forEach(year => {
                        if (year.id === yearID) {
                            year.semesters = year.semesters.filter(semester => semester.id !== semesterID)
                        }
                    })
                }
            })

            result = {...state};
            break;
        }
        case DISPATCH_ACTIONS.CLICK_SEMESTER_LIST: {
            const {departmentID, yearID, semesterID} = action.payload as DeleteSemesterPayload;

            state.departmentsList.forEach(department => {
                if(department.id === departmentID) {
                    department.years.forEach(year => {
                        if(year.id === yearID) {
                            year.semesters.forEach(semester => {
                                if(semester.id === semesterID) {
                                    semester.clicked = !semester.clicked;
                                } else {
                                    semester.clicked = semester.clicked;
                                }
                            })
                        }
                    })
                }
            });

            result = {...state};
            break;
        }
        case DISPATCH_ACTIONS.ADD_LANGUAGE: {

            result = {...state};
            break;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
    return result;
}

function AppMain(props: {theme: Theme}) {
    const {theme} = props;

    const _appState = {};

    // const [appState, setAppState] = useState(_appState);
    const [appState, dispatch] = useReducer(reducer, _appState as AppState);

    const memoAppState = React.useMemo(() => ({appState, dispatch}), [_appState])
    return (
        <Box sx={{
            height: '100%',
            background: theme.palette.mode.toString() === 'dark' ? '#192734' : 'white',
        }}>
            <AppStateProvider.Provider value={memoAppState}>
                <Box sx={{
                    display: 'flex',
                    padding: '1rem 1rem 1rem',
                    gap: '1rem',
                    height: '100%',
                    boxSizing: 'border-box'
                }}>
                    {<AppDepartments />}
                    {<AppMentors />}
                </Box>
            </AppStateProvider.Provider>
        </Box>
    )
};

export default AppMain;