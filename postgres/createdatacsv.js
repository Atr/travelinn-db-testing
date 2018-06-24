const fs = require('fs');
const faker = require('faker');

////////////////////////////////
// Helpers

const generatePhotosArrPostgresFormat = () => {
  let photoString = '{';
  const numPhotos = Math.floor(Math.random() * 10) + 10;
  for (let i = 0; i < numPhotos; i += 1) {
    const photoID = Math.floor(Math.random() * 1059);
    photoString += `'https://s3-us-west-1.amazonaws.com/travelinn-photos/Photo${photoID}.jpg'`;
    if (i < numPhotos - 1) { photoString += ','};
  }
  photoString += '}';
  return photoString;
};

////////////////////////////////
// Functions to write data to csv

const writeToFileHostels = (batchSize, numBatches) => {
  let toWriteTo = '';
  for (let i = 0; i < numBatches; i++) {
    toWriteTo = '';
    for (let j = 1; j < batchSize + 1; j++) {
      toWriteTo += faker.address.streetName() + ' ' + faker.company.bsNoun();
      toWriteTo += '|';
      toWriteTo += faker.lorem.paragraph();
      toWriteTo += '|';
      toWriteTo += Math.floor(Math.random() * 1000) + 1,
      toWriteTo += '\n';
    }
    try {
      fs.appendFileSync('./postgres/datafiles/hostels.txt', toWriteTo);
    } catch (err) {
      console.log('oops!');
    }   
  }
};

const writeToFileLocations = (batchSize, numBatches) => {
  let toWriteTo = '';
  for (let i = 0; i < numBatches; i++) {
    toWriteTo = '';
    for (let j = 1; j < batchSize + 1; j++) {
      toWriteTo += faker.address.city();
      toWriteTo += '|';
      toWriteTo += faker.address.country();
      toWriteTo += '|';
      toWriteTo += Math.floor(Math.random() * 1000) + 1,
      toWriteTo += '\n';
    }
    try {
      fs.appendFileSync('./postgres/datafiles/locations.txt', toWriteTo);
    } catch (err) {
      console.log('oops!');
    }   
  }
};

const writeToFileReviews = (batchSize, numBatches) => {
  let toWriteTo = '';
  for (let i = 0; i < numBatches; i++) {
    toWriteTo = '';
    for (let j = 1; j < batchSize + 1; j++) {
      toWriteTo += Math.floor(Math.random() * 10) + 1;
      toWriteTo += '|';
      toWriteTo += faker.commerce.productAdjective();
      toWriteTo += '|';
      toWriteTo += Math.floor(Math.random() * 1000) + 1,
      toWriteTo += '\n';
    }
    try {
      fs.appendFileSync('./postgres/datafiles/reviews.txt', toWriteTo);
    } catch (err) {
      console.log('oops!');
    }   
  }
};

const writeToFilePhotosArrays = (batchSize, numBatches) => {
  let toWriteTo = '';
  for (let i = 0; i < numBatches; i++) {
    toWriteTo = '';
    for (let j = 1; j < batchSize + 1; j++) {
      toWriteTo += generatePhotosArrPostgresFormat();
      toWriteTo += '|';
      toWriteTo += Math.floor(Math.random() * 1000) + 1,
      toWriteTo += '\n';
    }
    try {
      fs.appendFileSync('./postgres/datafiles/photos.txt', toWriteTo);
    } catch (err) {
      console.log('oops!');
    }   
  }
};

////////////////////////////////
// Run your functions here

writeToFileHostels(100, 1);
writeToFileLocations(100, 1);
writeToFileReviews(100, 1);
writeToFilePhotosArrays(100, 1);

