import { PartialType } from '@nestjs/mapped-types';
import { CreateBidNegotiationDto } from './create-bid-negotiation.dto';

export class UpdateBidNegotiationDto extends PartialType(CreateBidNegotiationDto) {}
