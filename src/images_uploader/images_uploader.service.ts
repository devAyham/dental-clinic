import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { GraphQLError } from 'graphql';
import { extname, join } from 'path';


// need to enhancement to take any dir and multi new dir
@Injectable()
export class ImagesUploaderService {
    async store({ image, title, patient_id }: any): Promise<{
        src: string
    }> {
        const { createReadStream, filename } = await image;
        return await new Promise(async (resolve, reject) => {
            const uniqueFileName = title + "-" + Date.now() + extname(filename);
            const relativetDirPath = `/public/uploads/patients/patient_${patient_id}`
            const patientFolderPath = join(process.cwd(), relativetDirPath);
            const patientMedicalImagesFolderPath = join(patientFolderPath, `medical-images`);
            const imageFilePath = join(patientMedicalImagesFolderPath, uniqueFileName);
            console.log(relativetDirPath);

            // Create patient folder if it doesn't exist
            if (!existsSync(patientFolderPath)) {
                mkdirSync(patientFolderPath);
            }
            if (!existsSync(patientMedicalImagesFolderPath)) {
                mkdirSync(patientMedicalImagesFolderPath);
            }
            createReadStream()
                .pipe(createWriteStream(imageFilePath))
                .on('finish', () =>
                    resolve({
                        src: join(relativetDirPath, `medical-images`, uniqueFileName),
                    })
                )
                .on('error', () => {
                    reject(new GraphQLError('could not save image', {
                        extensions: {
                            code: 404,
                        },
                    }));
                });
        });
    }
}
