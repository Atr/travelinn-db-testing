const fs = require('fs');
const faker = require('faker');

////////////////////////////////
// Helpers

const generatePhotosArr = () => {
  let photos = [];
  const numPhotos = Math.floor(Math.random() * 10) + 10;
  for (let i = 0; i < numPhotos; i+=1) {
    const photoID = Math.floor(Math.random() * 1059);
    photos.push(`https://s3-us-west-1.amazonaws.com/travelinn-photos/Photo${photoID}.jpg`);
  }
  return photos;
};

const generateReviewsArr = () => {
  let reviews = [];
  const numReviews = Math.floor(Math.random() * 10) + 20;
  for (let i = 0; i < numReviews; i+=1) {
    reviews.push({
      rating: Math.floor(Math.random() * 10),
      topFeature: faker.commerce.productAdjective(),
    });
  }
  return reviews;
};

////////////////////////////////
// Real Functions!
////////////////////////////////

////////////////////////////////
// For locations

const writeToFileLocations = (batchSize, numBatches) => {
  let toWriteTo = '';
  for (let i = 0; i < numBatches; i++) {
    toWriteTo = '';
    for (let j = 1; j < batchSize + 1; j++) {
      toWriteTo += JSON.stringify({
        _id: 'l' + ((i * batchSize) + j),
        city: faker.address.city(),
        country: faker.address.country(),
      }) + '\n';      
    }
    try {
      fs.appendFileSync('./database/datafiles/locations.json', toWriteTo);
    } catch (err) {
      console.log('oops!');
    }   
  }
};

////////////////////////////////
// For hostels without locations

// Make sure location id parameter exists!
const writeToFileHostels = (batchSize, numBatches) => {
  let toWriteTo = '';
  for (let i = 0; i < numBatches; i++) {
    toWriteTo = '';
    for (let j = 1; j < batchSize + 1; j++) {
      toWriteTo += JSON.stringify({
        _id: '' + ((i * batchSize) + j),
        name: faker.address.streetName() + faker.company.bsNoun(),
        description: faker.lorem.paragraph(),
        photos: generatePhotosArr(),
        reviews: generateReviewsArr(),
        locationId: 'l' + Math.floor(Math.random() * 10000) + 1,
      }) + '\n';      
    }
    try {
      fs.appendFileSync('./database/datafiles/hostels.json', toWriteTo);
    } catch (err) {
      console.log('oops!');
    }   
  }
};

/////////////////////////////
// For hostels with locations

const writeToFileSyncHostelsWithLocations = (batchSize, numBatches) => {
  let toWriteTo = '';
  for (let i = 0; i < numBatches; i++) {
    toWriteTo = '';
    for (let j = 1; j < batchSize + 1; j++) {
      toWriteTo += JSON.stringify({
        _id: '' + ((i * batchSize) + j),
        name: faker.address.streetName() + faker.company.bsNoun(),
        description: faker.lorem.paragraph(),
        photos: generatePhotosArr(),
        reviews: generateReviewsArr(),
        location: {
          city: faker.address.city(),
          country: faker.address.country(),
        },
      }) + '\n';      
    }
    try {
      fs.appendFileSync('./database/datafiles/hostelswithlocationstest.json', toWriteTo);
    } catch (err) {
      console.log('oops!');
    }   
  }
};

////////////////////////////////
// Run the functions above

writeToFileLocations(100, 100);
writeToFileHostels(100, 100);
//writeToFileSyncHostelsWithLocations(1000, 100);