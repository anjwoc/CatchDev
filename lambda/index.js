const AWS = require('aws-sdk');
const Sharp = require('sharp');

const s3 = new AWS.S3({ region: 'ap-northeast-2' });

exports.handler = async (event, context, callback) => {
  // event 객체에 Bucket들 이름이 들어있다.
  const Bucket = event.Records[0].s3.Bucket.name;
  // key는 파일 이름의 확장자를 제외한 앞부분
  const Key = event.Records[0].s3.object.key;
  const filename = Key.split('/')[Key.split('/').length-1];
  const ext = Key.split('.')[Key.split('.').length-1];
  console.log(Key, filename, ext);
  const requireFormat = ext === 'jpg' ? 'jpeg' : ext; // sharp에서는 jpg 대신에 jpeg를 사용한다.
  try{
    const s3Object = await S3.getObject({ // S3에서 이미지를 받아온다.
      Bucket,
      Key,
    }).promise();
    console.log('original', s3Object.Body.length);
    const resizeImage = await Sharp(s3Object.Body)
      .resize(800, 800, {
        fit: 'inside',
      })
      .toFormat(requireFormat)
      .toBuffer();
    console.log('resize', resizeImage.length);
    await S3.putObject({
      Body: resizeImage,
      Bucket,
      Key: `thumb/${filename}`
    }).promise();
    return callback(null, `thumb/${filename}`);

  }catch(err){
    console.error(err);
    return callback(err);
  }
};