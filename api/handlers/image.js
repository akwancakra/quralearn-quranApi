const fs = require('fs');
const path = require('path');

class ImageHandler {
  static getRandomImage(directory, res) {
    const imageDirectory = path.join(__dirname, '../../data/images', directory);

    // Membaca daftar file gambar di direktori
    fs.readdir(imageDirectory, (err, files) => {
      if (err) {
        return res.status(500).send({
          code: 500,
          status: 'Internal Server Error',
          message: 'Error reading image directory.',
          data: {}
        });
      }

      // Memilih gambar secara acak dari daftar gambar
      const randomIndex = Math.floor(Math.random() * files.length);
      const randomImage = files[randomIndex];

      if (randomImage) {
        // Baca konten gambar
        const imagePath = path.join(imageDirectory, randomImage);
        const imageContent = fs.readFileSync(imagePath);

        // Mendapatkan tipe konten gambar berdasarkan ekstensi file
        const contentType = path.extname(randomImage) === '.png' ? 'image/png' : 'image/jpeg';

        // Atur tipe konten respons sesuai dengan jenis gambar yang digunakan
        res.setHeader('Content-Type', contentType);

        // Kirim gambar sebagai respons
        res.status(200).send(imageContent);
      } else {
        return res.status(404).send({
          code: 404,
          status: 'Not Found',
          message: 'No images found in the directory.',
          data: {}
        });
      }
    });
  }

  static getRandomImageQuote(_, res) {
    ImageHandler.getRandomImage('quote', res);
  }

  static getRandomImageFunfact(_, res) {
    ImageHandler.getRandomImage('funfact', res);
  }

  static getImageByFileName(req, res) {
    const requestedFileName = req.params.file; // Mengambil nama file dari parameter

    // Membaca direktori gambar berdasarkan rute
    const directory = req.params.directory;
    if (directory !== 'quote' && directory !== 'funfact') {
      return res.status(400).send({
        code: 400,
        status: 'Bad Request',
        message: 'Invalid image directory.',
        data: {}
      });
    }

    ImageHandler.getImageByFileNameFromDirectory(directory, requestedFileName, res);
  }

  static getImageByFileNameFromDirectory(directory, requestedFileName, res) {
    const imageDirectory = path.join(__dirname, '../../data/images', directory);
    const imagePath = path.join(imageDirectory, requestedFileName);

    // Periksa apakah file tersebut ada
    if (fs.existsSync(imagePath)) {
      // Baca konten gambar
      const imageContent = fs.readFileSync(imagePath);

      // Mendapatkan tipe konten gambar berdasarkan ekstensi file
      const contentType = path.extname(requestedFileName) === '.png' ? 'image/png' : 'image/jpeg';

      // Atur tipe konten respons sesuai dengan jenis gambar yang digunakan
      res.setHeader('Content-Type', contentType);

      // Kirim gambar sebagai respons
      res.status(200).send(imageContent);
    } else {
      return res.status(404).send({
        code: 404,
        status: 'Not Found',
        message: 'Image not found.',
        data: {}
      });
    }
  }
}

module.exports = ImageHandler;
