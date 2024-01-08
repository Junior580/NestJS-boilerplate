import { SortDirection } from '@shared/domain/repositories/searchable-repository-contracts';
import { IsOptional } from 'class-validator';
import { ListUserInput } from '@modules/user/application/services/list-user.service';

export class ListUsersDto implements ListUserInput {
  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;

  @IsOptional()
  sort?: string;

  @IsOptional()
  sortDir?: SortDirection;

  @IsOptional()
  filter?: string;
}
