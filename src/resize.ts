import sharp from 'sharp';
const inputPath = 'images/fullsize';
const outputPath = 'images/thumbnails';


//function to resize fullsize image into thumbnail
export default async function resize(
    filename: string,
    width: number,
    height: number
): Promise<string> {
    {
        const resizedImagePath =
            await `${outputPath}/${filename}-${width}x${height}.jpg`;
        await sharp(`${inputPath}/${filename}.jpg`)
            .resize(width, height)
            .toFile(resizedImagePath);
        return resizedImagePath;
    }
}

export { resize, inputPath, outputPath };
