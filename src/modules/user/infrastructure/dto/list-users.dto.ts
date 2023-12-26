import { SortDirection } from '@shared/domain/repositories/searchable-repository-contracts';
import { IsOptional } from 'class-validator';
import { SearchInput } from '@shared/application/dto/search-input';

export class ListUsersDto implements SearchInput {
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
