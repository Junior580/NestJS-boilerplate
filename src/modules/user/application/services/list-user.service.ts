import {
  UserRepository,
  UserSearchParams,
  UserSearchResult,
} from '@modules/user/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@shared/application/dto/pagination-output';
import { SearchInput } from '@shared/application/dto/search-input';
import { UserOutput, UserOutputMapper } from '../dto/user-output.dto';

export type ListUserInput = SearchInput;

type Output = PaginationOutput<UserOutput>;

@Injectable()
export class ListUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: ListUserInput) {
    const params = new UserSearchParams(input);
    const searchResult = await this.userRepository.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: UserSearchResult): Output {
    const items = searchResult.items.map((item) => {
      return UserOutputMapper.toOutput(item);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}
