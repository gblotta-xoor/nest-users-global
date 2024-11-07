import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class BodyValidationPipe implements PipeTransform<any> {
    async transform(value: any) {
        if (!Object.keys(value).length) {
            throw new BadRequestException('You must provide some data within the body.');
        }

        return value;
    }
}