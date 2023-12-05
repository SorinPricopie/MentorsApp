import { useContext } from "react";
import { AppStateProvider } from "../main/app-main";
import { Mentor } from "../main/state-model";
import deepOrange from "@mui/material/colors/deepOrange";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MentorAssignementsList = () => {
    return (
        <Box>
            This is MentorAssignementsList component.
        </Box>
    )
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
                    {<MentorAssignementsList />}
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
    const canTeachList = (arr: string[]): string => {
        let result='';
        arr.forEach(item => result += item + ', ');
        
        return '(' + result.substring(0, result.length-2) + ')';
    }

    return (
        mentorsList.map((mentor, i) => {
            return (
                <Box 
                    key={mentor.id}
                    sx={{
                        padding: '1rem 2.35rem'
                    }}
                >
                    {i+1}. {mentor.name}: {canTeachList(mentor.canTeach)}
                    {<MentorAssignements mentorData={mentor} />}
                </Box>
            )
        })
    )
};

export default(MentorsList);