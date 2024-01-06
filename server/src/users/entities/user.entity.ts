import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
    @ApiProperty({ required: false})
    idUser: number;
    @ApiProperty({ required: false, default: 'test@test.tt' })
    email: string;
    @ApiProperty({ default: 'test' })
    username: string = 'test';
    @ApiProperty({ required: false, nullable: true})
    idUsername: string | '';
    @ApiProperty({ required: false, default: "https://sun6-20.userapi.com/impg/Pu7YGIlBWPmDkiuzAEDCvKRx4KWScdw7Bquizg/KQjrBVk8hL8.jpg?size=1024x1024&quality=96&sign=7efd05f6ab573527e8a2fbdbc47ddf93&type=album" })
    url_avatar: string = "https://sun6-20.userapi.com/impg/Pu7YGIlBWPmDkiuzAEDCvKRx4KWScdw7Bquizg/KQjrBVk8hL8.jpg?size=1024x1024&quality=96&sign=7efd05f6ab573527e8a2fbdbc47ddf93&type=album";
    @ApiProperty({ required: false, default: false })
    isCoach: boolean = false;
    @ApiProperty({ required: false, default: false })
    isBan: boolean = false;
    @ApiProperty({ required: false, default: false })
    isOffical: boolean = false;
    @ApiProperty({ required: false })
    createdAt: Date;
}
