export interface AppState {
    departmentsList: Department[],
    mentorsList: Mentor[]
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
}

export interface Mentor {
    name: string
    id: number
    canTeach: number[]
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