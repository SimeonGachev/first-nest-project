import { CreateCompetitionDto } from "../dto/createCompetitionDto";
import { ScoresDto } from "../dto/scoresDto";

export class CompetitionsModel{
    constructor(private competitions: any[]){}

    getAllCompetitions() {
        return this.competitions
    }

    findCompetitionById(targetId: number){
        return this.competitions.find(({ id }: CreateCompetitionDto) => id == targetId)
    }

    addCompetition(competitionInfo: any){
        const {organiser, name}: {organiser: string; name: string} = competitionInfo

        if(!organiser) throw new Error("please log in")

        if(!name) throw new Error("name for the tournament must be provided")

        const newCompetition = {
            id: this.competitions.length+1,
            organiser: organiser,
            name: name,
            createdOn: Date.now(),
            modifiedOn: Date.now(),
            partitipants: [],
            scores: {},
            status: "Open",
        }

        this.competitions.push(newCompetition)

        return newCompetition
    }

    joinCompetition(targetId: number, username: string){
        const { partitipants } = this.competitions.find(
            ({ id }: CreateCompetitionDto) => id == targetId
        )
        
        partitipants.push(username)

        return partitipants
    }

    closeCompetition(targetId: number, scores: ScoresDto){
        const competition = this.competitions.find(
            ({ id }: CreateCompetitionDto) => id == targetId
        )
        
        competition.scores = scores;
        competition.status = "Closed";
        competition.modifiedOn = Date.now();

        return competition;
    }
} 

export const competitions = new CompetitionsModel([]);