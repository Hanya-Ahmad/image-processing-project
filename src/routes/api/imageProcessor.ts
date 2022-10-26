import express, { Request, Response } from 'express';
import fs from 'fs';
import { resize, inputPath, outputPath } from '../../resize';

const imageProcessor = express.Router();


imageProcessor.get(
    '/',
    async (request: Request, reponse: Response): Promise<void> => {
        const filename = (await request.query.filename) as string;
        const width =
            (await request.query.width) === undefined
                ? 1000
                : Number(request.query.width);
        const height =
            (await request.query.height) === undefined
                ? 1000
                : Number(request.query.height);
        const thumbnailImage = `${outputPath}/${filename}_${width}_${height}.jpg`;
        const fullsizeImage = `${inputPath}/${filename}.jpg`;

        if (Object.keys(request.query).length === 0) {
            reponse.status(200).send('imageProcessor');
        } else if (fs.existsSync(thumbnailImage)) {
            reponse.status(200).sendFile(thumbnailImage, { root: './' });
        } else if (filename === undefined) {
            reponse.status(400).send('Please add a filename path.');
        } else if (!width || !height || width < 1 || height < 1) {
            reponse
                .status(400)
                .send('Please enter a positive number for height and width.');
        } else if (!fs.existsSync(fullsizeImage)) {
            reponse.status(404).send('Image not found.');
        } else {
            const newThumbnail = await resize(filename, width, height);
            reponse.status(200).sendFile(newThumbnail, { root: './' });
        }
    }
);

export default imageProcessor;
