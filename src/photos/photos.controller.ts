import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
@Controller('photos')
export class PhotosController {
    public photos = [];
    @Post("upload")
    @UseInterceptors(
        FileInterceptor("file", {
            dest: "./uploads",
        })
    )
    uploadSignle(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        this.photos.push(file);
        return file;
    }

    @Post("uploadMultiple")
    @UseInterceptors(FilesInterceptor('files[]', 100, {
        storage: diskStorage({
            // Destination storage path details
            destination: (req: any, file: any, cb: any) => {
                const uploadPath = './uploads';
                // Create folder if doesn't exist
                if (!existsSync(uploadPath)) {
                    mkdirSync(uploadPath);
                }
                cb(null, uploadPath);
            },
            // File modification details
            filename: (req: any, file: any, cb: any) => {
                // Calling the callback passing the random name generated with the original extension name
                cb(null, `${uuid()}${extname(file.originalname)}`);
            },
        })
    }
    ))
    uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files);
    }

    @Get()
    getAllPictures() {
        return this.photos;
    }
}