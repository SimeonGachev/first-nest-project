import { CreateStatsDto } from "./statsDto";

export class CreateUserDto {
    id: number;
    username: string;
    stats: CreateStatsDto;
    referals: string[];
    transactions: any[];
}