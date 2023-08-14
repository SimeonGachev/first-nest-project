import { Injectable } from "@nestjs/common";

@Injectable()
export class GetUserById{
    get(id: string): string{
        return `user #${id}`;
    }
}