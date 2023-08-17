import { ScoresDto } from './scoresDto';

export class CreateCompetitionDto {
  id: number;
  organiser: string;
  name: string;
  createdOn: number;
  modifiedOn: number;
  partitipants: Array<string>;
  scores: any;
  status: string;
}
