import { ApiProperty } from "@nestjs/swagger"
import { View_for_post } from "@prisma/client"
import { IsInt } from "class-validator"

export class ViewEntity implements View_for_post {
    
    @IsInt()
    idView:number

    @ApiProperty()
    @IsInt()
    userId:number

    @ApiProperty()
    @IsInt()
    postId:number

}

/* model View_for_post {
  idView Int  @id @default(autoincrement())
  userId Int
  user   User @relation(fields: [userId], references: [idUser])
  postId Int
  post   Post @relation(fields: [postId], references: [idPost])
} */