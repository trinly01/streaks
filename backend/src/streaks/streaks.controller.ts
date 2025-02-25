import { Controller, Get, Param } from '@nestjs/common';
import { StreaksService } from './streaks.service';

@Controller('streaks')
export class StreaksController {

  constructor(private readonly streaksService: StreaksService) {}

  @Get(':case')
  getStreakByCase(@Param('case') caseParam: string) {
    return this.streaksService.getStreak(caseParam);
  }
}
