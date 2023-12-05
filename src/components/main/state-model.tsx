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
    id: number
    rithm: string
    groups: number
    clicked: boolean
}

export interface Mentor {
    name: string
    id: number
    canTeach: string[]
    assignements: Assignement[]
}
  
export interface Assignement {
    departmentName: string
    departmentID: number
    year: number
    semester: number
    language: string
    languageID: number
    rithm: string
    hasVideo: boolean
    groups: number
    effort: number
}