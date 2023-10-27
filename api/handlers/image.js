const fs = require('fs');
const path = require('path');

class ImageHandler {
  static getRandomImageQuote(_, res) {
    const imageDirectory = path.join(__dirname, '../../data/images/quote');

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

        // Kirim gambar sebagai respons dengan tipe konten yang sesuai
        res.setHeader('Content-Type', 'image/jpeg'); // Atur tipe konten sesuai dengan jenis gambar yang digunakan
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

  static getRandomImageFunfact(_, res) {
    const imageDirectory = path.join(__dirname, '../../data/images/funfact');

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

        // Kirim gambar sebagai respons dengan tipe konten yang sesuai
        res.setHeader('Content-Type', 'image/jpeg'); // Atur tipe konten sesuai dengan jenis gambar yang digunakan
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
}

module.exports = ImageHandler;
