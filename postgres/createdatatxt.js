const fs = require('fs');
const faker = require('faker');

//NOTE:
//You'll need to update the id fields appropriately, 
//depending on how many records you're generating (see comments below)

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
      //Location Id - make sure the multiplier is equal to the number of locations generated
      toWriteTo += Math.floor(Math.random() * 1000000) + 1,
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
      //Hostel Id - make sure the multiplier is equal to the number of hostels generated
      toWriteTo += Math.floor(Math.random() * 10000000) + 1,
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
// **Remember, if you change totals here, change multipliers per comments above

// writeToFileHostels(1000, 1000);
// writeToFileLocations(1000, 100);
// writeToFileReviews(1000, 1000);
// // should have as many photo arrays as hostels. 1:1
// writeToFilePhotosArrays(10, 100);

////////////////////////////////
// Run your TIMED functions here
// **Remember, if you change numbers here, change multipliers per comments above

console.time('hostel');
writeToFileHostels(1000, 10000);
console.timeEnd('hostel');

console.time('locations');
writeToFileLocations(1000, 1000);
console.timeEnd('locations');

console.time('review');
writeToFileReviews(1000, 100000);
console.timeEnd('review');

// should have as many photo arrays as hostels. 1:1
console.time('photos');
writeToFilePhotosArrays(1000, 10000);
console.timeEnd('photos');

