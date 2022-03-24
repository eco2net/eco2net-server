import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('photos')
export class PhotosController {

    @Get(":id")
    getPicture(@Param() param, @Res() res) {
        res.sendFile(param.id,{ root: './images' })
    }
}