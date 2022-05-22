import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./entities/region.entity";

@Injectable()
export class RegionService {
    constructor(
      @InjectRepository(Region)
      private regionRepository: Repository<Region>
    ) {}

    create(createRegionDto: CreateRegionDto) {
        return this.regionRepository.save(createRegionDto);
    }

    findAll() {
        return this.regionRepository.find();
    }

    findOne(id: number) {
        return this.regionRepository.findOne(+id);
    }

    async update(id: number, updateRegionDto: UpdateRegionDto) {
      await this.regionRepository.update(id, updateRegionDto)
        return `region #${id} updated successfully`;
    }

    async remove(id: number) {
      await this.regionRepository.delete(+id)
        return `region #${id} deleted successfully`;
    }
}
