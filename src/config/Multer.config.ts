import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import * as multer from 'multer';
require('dotenv').config();

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

const s3 = new AWS.S3();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Multer upload options
export const multerOptions = {
    // Enable file size limits
    limits: {
        fileSize: +process.env.MAX_FILE_SIZE,
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },

    storage: multerS3({
        s3: s3,
        bucket: AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        filename: (req: any, file: any, cb: any) => {
            // Calling the callback passing the random name generated with the original extension name
            cb(null, `${Date.now().toString()}${extname(file.originalname)}`);
        },
    })
};