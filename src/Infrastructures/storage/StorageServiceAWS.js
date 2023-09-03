const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const StorageService = require('../../Domains/storage/StorageService');

class StorageServiceAWS extends StorageService {
  constructor(AWS) {
    super();
    this._S3 = new AWS();
  }

  async writeFile(file, meta) {
    const s3Client = new S3Client({ region: 'ap-southeast-1' });

    const parameters = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${+new Date()}${(meta.filename).replace(/ /g, '_')}`,
      Body: file._data,
      ContentType: meta.headers['content-type'],
    };

    try {
      const Location = `https://${parameters.Bucket}.s3.ap-southeast-1.amazonaws.com/${parameters.Key}`;

      const command = new PutObjectCommand(parameters);
      const response = await s3Client.send(command);
      console.log(response);

      return Location;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = StorageServiceAWS;
