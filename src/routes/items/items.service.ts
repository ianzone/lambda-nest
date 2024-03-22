import { Injectable } from '@nestjs/common';
import type { CreateItemDto } from './dto/create-item.dto';
import type { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  create(createItemDto: CreateItemDto) {
    return 'This action adds a new item';
  }

  findAll() {
    return 'This action returns all items';
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
