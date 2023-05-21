import { PartialType } from '@nestjs/swagger';
import { CreateTopicoDto } from './create-topico.dto';

export class UpdateTopicoDto extends PartialType(CreateTopicoDto) {}
