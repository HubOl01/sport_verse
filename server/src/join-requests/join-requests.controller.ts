import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JoinRequestsService } from './join-requests.service';
import { CreateJoinRequestDto } from './dto/create-join-request.dto';
import { UpdateJoinRequestDto } from './dto/update-join-request.dto';

@ApiTags('join-requests')
@Controller('join-requests')
export class JoinRequestsController {
  constructor(private readonly joinRequestsService: JoinRequestsService) {}

  /**
   * Отправка запроса на присоединение к группе
   */
  @Post('groups/:groupId/join')
  @ApiOperation({ summary: 'Request to join a private training group' })
  @ApiResponse({
    status: 201,
    description: 'Join request created successfully',
  })
  async requestToJoinGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body('athleteId', ParseIntPipe) athleteId: number,
  ) {
    return this.joinRequestsService.requestToJoinGroup(groupId, athleteId);
  }

  /**
   * Получение всех запросов на присоединение
   */
  @Get()
  @ApiOperation({ summary: 'Get all join requests' })
  @ApiResponse({ status: 200, description: 'List of join requests' })
  findAll() {
    return this.joinRequestsService.findAll();
  }

  /**
   * Получение одного запроса по ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a join request by ID' })
  @ApiResponse({ status: 200, description: 'Join request details' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.joinRequestsService.findOne(id);
  }

  /**
   * Обработка запроса тренером (одобрение/отклонение)
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Approve or reject a join request' })
  @ApiResponse({
    status: 200,
    description: 'Join request updated successfully',
  })
  async handleJoinRequest(
    @Param('id', ParseIntPipe) requestId: number,
    @Body('status') status: 'approved' | 'rejected',
    @Body('trainerId', ParseIntPipe) trainerId: number,
  ) {
    return this.joinRequestsService.handleJoinRequest(
      requestId,
      status,
      trainerId,
    );
  }

  /**
   * Удаление запроса
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a join request' })
  @ApiResponse({
    status: 200,
    description: 'Join request deleted successfully',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.joinRequestsService.remove(id);
  }
}
