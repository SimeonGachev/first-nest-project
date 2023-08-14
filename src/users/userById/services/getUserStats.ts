import { Injectable } from "@nestjs/common";

@Injectable()
export class GetUserStats{
    get(id: string): string{
        return `user #${id} stats`;
    }
}