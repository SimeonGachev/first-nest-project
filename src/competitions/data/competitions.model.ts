import { CreateCompetitionDto } from "../dto/createCompetitionDto";

export class CompetitionsModel{
    constructor(private competitions: any[]){}

    getAllCompetitions() {
        return this.competitions
    }

    findCompetitionById(targetId: number){
        return this.competitions.find(({ id }: CreateCompetitionDto) => id === targetId)
    }

    addCompetition(competitionInfo: any){
        this.competitions.push(competitionInfo)
    }

    joinCompetition(targetId: number){
        const competition = this.competitions.find(
            ({ id }: CreateCompetitionDto) => id === targetId
        )
        
    }
} 