export interface AppState {
    departmentsList: Department[],
    mentorsList: Mentor[],
    languagesList?: Language[]
}

export interface Department {
    name: string
    id: number
    years: Year[]
    clicked: boolean
}

export interface Year {
    year: number
    id: number
    semesters: Semester[]
    clicked: boolean
}

export interface Semester {
    semester: number
    id: number
    languages: Language[]
    clicked: boolean
}

export interface Language {
    name: string
    id: string
    rithm: string
    groups: number
    clicked: boolean
}

export interface Mentor {
    name: string
    id: number
    canTeach: string[]
    assignements: Assignement[]
    totalEffort: number
}
  
export interface Assignement {
    id: number | string,
    departmentName: string
    departmentID: number
    year: number
    semester: number
    language: string
    languageID: string
    rithm: string
    hasVideo: boolean
    groups: number
    effort: number
}