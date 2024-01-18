import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import React, { Dispatch, useReducer } from "react";
import {AppState, Assignement, Language, Mentor, Semester, Year} from "./state-model";
import AppDepartments from "../departments/app-departments";
import AppMentors from "../mentors/app-mentors";

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

export interface DeleteLanguagePayload {
    departmentName: string,
    departmentID: number,
    yearID: number,
    semesterID: number,
    name?: string
    id?: string
    rithm?: string
    groups?: number
}

export interface AssignMentorPayload {
    id: number,
    assignement: Assignement
}

export interface EditMentorLanguagesPayload {
    id: number,
    canTeach: string[]
}

export interface DeleteAssignementPayload {
    mentorID: number,
    assignementID: string
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
    DELETE_LANGUAGE,
    CLICK_LANGUAGE_LIST,
    ADD_MENTOR,
    ASSIGN_MENTOR,
    DELETE_ASSIGNED_MENTOR,
    UPDATE_MENTOR_LANGUAGES
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
    payload?: 
        string | 
        number | 
        DeleteYearPayload | 
        DeleteSemesterPayload | 
        DeleteLanguagePayload | 
        Mentor |
        AssignMentorPayload |
        EditMentorLanguagesPayload |
        DeleteAssignementPayload
}

const isNotDuplicate = (arr: string[], item: string): boolean => {
    return arr.includes(item) ? false : true;
}

const effortMatrix = [
    {
        rithm: '1/1',
        videoEffort: 1,
        groupsDivider: 2
    },
    {
        rithm: '2/1',
        videoEffort: 2,
        groupsDivider: 2
    },
    {
        rithm: '3/1',
        videoEffort: 3,
        groupsDivider: 2
    },
    {
        rithm: '2/2',
        videoEffort: 2,
        groupsDivider: 1
    }
];

const calculateEffort = (assignement: Assignement) => {
    const effort = effortMatrix.filter( effort => effort.rithm === assignement.rithm)[0];
    return effort.videoEffort + assignement.groups / effort.groupsDivider;
}

const reducer = (state: AppState, action:  REDUCER_ACTIONS): AppState => {
    let result: AppState = state;
    switch (action.type) {
        case DISPATCH_ACTIONS.ADD_DEPARTMENT: {
                const id = state.departmentsList && state.departmentsList.length > 0 ? state.departmentsList[state.departmentsList.length - 1].id + 1 : 1;
                result = state.departmentsList && action.payload && isNotDuplicate(state.departmentsList.map(department => department.name), action.payload as string) ?
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
                
                localStorage.setItem('appMentorData:', JSON.stringify(result))
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
            const {
                departmentName, 
                departmentID, 
                yearID, 
                semesterID,
                name,
                rithm,
                groups
            } = action.payload as DeleteLanguagePayload;
            const department = state.departmentsList.filter(department => department.id === departmentID)[0];
            const year = department.years.filter(year => year.id === yearID)[0];
            const semester = year.semesters.filter(semester => semester.id === semesterID)[0];

            const incrementIdx = (lastIdx: string) => {
                const splitter = lastIdx.indexOf('-');
                const incrementedIdx = +lastIdx.substring(splitter + 1) + 1;
                return departmentName + yearID + semesterID + '-' +incrementedIdx;
            }

            let uniqueIdx = '';

            if(name && isNotDuplicate(semester.languages.map(language => language.name), name)) {
                const newLanguageID: string = semester.languages.length > 0 ? 
                incrementIdx(semester.languages[semester.languages.length - 1].id) :
                departmentName + yearID + semesterID + '-' + 1;

                uniqueIdx = newLanguageID;
    
                const newSemesterLanguage: Language = {
                    name: name || '',
                    id: newLanguageID,
                    rithm: rithm || '',
                    groups: groups || 0,
                    clicked: false
                };
    
                state.departmentsList.forEach(department => {
                    if(department.id === departmentID) {
                        department.years.forEach(year => {
                            if(year.id === yearID) {
                                year.semesters.forEach(semester => {
                                    if(semester.id === semesterID) {
                                        semester.languages = [...semester.languages, newSemesterLanguage]
                                    }
                                })
                            }
                        })
                    }
                });
    
                const newLanguage: Language = {
                    name: name || '',
                    id: uniqueIdx,
                    rithm: '',
                    groups: 0,
                    clicked: false
                };
    
                const hasLanguage = state.languagesList && state.languagesList.length > 0 ? true : false;

                state.languagesList = !hasLanguage ?
                    [newLanguage] : [...(state.languagesList || []), newLanguage]

               
                result = {...state};
            }
            break;
        }
        case DISPATCH_ACTIONS.DELETE_LANGUAGE: {
            const {departmentID, yearID, semesterID, id} = action.payload as DeleteLanguagePayload;
            state.departmentsList.forEach(department => {
                if(department.id === departmentID) {
                    department.years.forEach(year => {
                        if(year.id === yearID) {
                            year.semesters.forEach(semester => {
                                if(semester.id === semesterID) {
                                    semester.languages = semester.languages.filter(language => language.id !== id);
                                }
                            })
                        }
                    })
                }
            });

            state.languagesList = state.languagesList?.filter(lannguage => lannguage.id !== id);

            result = {...state};
            break;
        }
        case DISPATCH_ACTIONS.CLICK_LANGUAGE_LIST: {
            const {departmentID, yearID, semesterID, id} = action.payload as DeleteLanguagePayload;
            state.departmentsList.forEach(department => {
                if(department.id === departmentID) {
                    department.years.forEach(year => {
                        if(year.id === yearID) {
                            year.semesters.forEach(semester => {
                                if(semester.id === semesterID) {
                                    semester.languages.forEach(language => {
                                        if(language.id === id) {
                                            language.clicked = !language.clicked;
                                        } else {
                                            language.clicked = language.clicked;
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            });
            
            result = {...state};
            break;
        }
        case DISPATCH_ACTIONS.ADD_MENTOR: {
            const {name, canTeach} = action.payload as Mentor;
                const id = state && state.mentorsList && state.mentorsList.length > 0 ? state.mentorsList[state.mentorsList.length - 1].id + 1 : 1;
                result = name && state.mentorsList && isNotDuplicate(state.mentorsList.map(mentor => mentor.name), name) ?
                    {
                        ... state,
                        mentorsList: [
                            ...state.mentorsList,
                            {
                                name: name ? name.toString() : '',
                                id: id,
                                canTeach: canTeach,
                                assignements: [],
                                totalEffort: 0
                            }
                        ]
                    } :
                    {
                        ... state,
                        mentorsList: [
                            {
                                name: name ? name.toString() : '',
                                id: id,
                                canTeach: canTeach,
                                assignements: [],
                                totalEffort: 0
                            }
                        ]
                    };
            break;
        }
        case DISPATCH_ACTIONS.ASSIGN_MENTOR: {
            const {id, assignement} = action.payload as AssignMentorPayload;
            const newId = (id: number | string): string => {
                const number = +(id.toString().replace(/[^0-9]/g, "")) + 1;
                return number.toString();
            }

            state.mentorsList.forEach(mentor => {
                if(mentor.id === id) {
                    assignement.id = mentor.assignements.length > 0 ? assignement.language + '&&&&&' + newId(mentor.assignements[mentor.assignements.length - 1].id) : assignement.language + '&&&&&' + '1';
                    assignement.effort = calculateEffort(assignement);
                    mentor.assignements = [...mentor.assignements, assignement];
                };

                if(mentor.assignements.length === 1) {
                    mentor.totalEffort = mentor.assignements[0].effort
                }

                if(mentor.assignements.length > 1) {
                    mentor.totalEffort = mentor.assignements.map(item => item.effort).reduce((previous,current) => previous + current)
                }
            });

            result = {...state};

            break;
        }
        case DISPATCH_ACTIONS.DELETE_ASSIGNED_MENTOR: {
            const {mentorID, assignementID} = action.payload as DeleteAssignementPayload;

            state.mentorsList.forEach(mentor => {
                if(mentor.id === mentorID) {
                    mentor.assignements = mentor.assignements.filter(assignement => assignement.id !== assignementID);
                }
            });

            result = {...state};

            break;
        }
        case DISPATCH_ACTIONS.UPDATE_MENTOR_LANGUAGES: {
            const {id, canTeach} = action.payload as EditMentorLanguagesPayload;
            const newMentorsList = state.mentorsList;
            newMentorsList.forEach(mentor => {
                if(mentor.id === id) {
                    mentor.canTeach = canTeach
                }
            })
            result = {
                ...state,
                mentorsList : newMentorsList
            }
            
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
    
    const _appState = JSON.parse(localStorage.getItem('appMentorData:') || '{}') || {};

    const [appState, dispatch] = useReducer(reducer, _appState as AppState);

    const memoAppState = React.useMemo(() => ({appState, dispatch}), [_appState])

    if(Object.keys(appState).length > 0) {
        localStorage.removeItem('appMentorData:');
        localStorage.setItem('appMentorData:', JSON.stringify(appState));
    };

    return (
        <Box sx={{
            background: theme.palette.mode.toString() === 'dark' ? '#192734' : 'white',
            boxSizing: 'inherit',
            minHeight: '100%',
            flex: 'auto'
        }}>
            <AppStateProvider.Provider value={memoAppState}>
                <Box sx={{
                    display: 'flex',
                    padding: '1rem 1rem 1rem',
                    gap: '1rem',
                    boxSizing: 'inherit',
                    minHeight: '88.25vh'
                }}>
                    <Box sx={{
                        boxSizing: 'inherit',
                        width: '100%'
                    }}>
                        {<AppDepartments />}
                    </Box>
                    <Box sx={{
                        boxSizing: 'inherit',
                        width: '100%',
                        borderLeft: '1px solid rgb(136, 153, 166)'
                    }}>
                        {<AppMentors />}
                    </Box>
                </Box>
            </AppStateProvider.Provider>
        </Box>
    )
};

export default AppMain;