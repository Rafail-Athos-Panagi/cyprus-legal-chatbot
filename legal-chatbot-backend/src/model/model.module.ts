import { Module } from '@nestjs/common';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { PythonService } from './python.service';

@Module({
  controllers: [ModelController],
  providers: [ModelService , PythonService],
})
export class ModelModule {}
