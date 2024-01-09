import { ApiProperty } from "@nestjs/swagger"
import { Like_for_post } from "@prisma/client";
import { IsInt } from "class-validator";

export class LikeEntity implements Like_for_post {
    @IsInt()
    idLike: number;

    @ApiProperty()
    @IsInt()
    userId: number

    @ApiProperty()
    @IsInt()
    postId: number
}

/* model Like_for_post {
  idLike Int  @id @default(autoincrement())
  userId Int
  user   User @relation(fields: [userId], references: [idUser])
  postId Int
  post   Post @relation(fields: [postId], references: [idPost])
} */