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
        _id: 'L' + ((i * batchSize) + j),
        city: faker.address.city(),
        country: faker.address.country(),
      }) + '\n';      
    }
    try {
      fs.appendFileSync('./couchdb/datafiles/locations.json', toWriteTo);
    } catch (err) {
      console.log('oops!');
    }   
  }
};

////////////////////////////////
// For hostels without locations

// Make sure location id parameter number exists!
const writeToFileHostels = (batchSize, numBatches) => {
  let toWriteTo = '';
  for (let i = 0; i < numBatches; i++) {
    toWriteTo = '';
    console.time();
    for (let j = 1; j < batchSize + 1; j++) {
      toWriteTo += JSON.stringify({
        _id: '' + ((i * batchSize) + j),
        name: faker.address.streetName() + faker.company.bsNoun(),
        description: faker.lorem.paragraph(),
        photos: generatePhotosArr(),
        reviews: generateReviewsArr(),
        locationId: 'L' + Math.floor(Math.random() * 100000) + 1,
      }) + '\n';      
    }
    console.timeEnd();
    console.log('batch added to toWriteTo, on batch ', i, ' of ', numBatches);
    try {
      fs.appendFileSync('./couchdb/datafiles/hostels.json', toWriteTo);
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
      fs.appendFileSync('./couchdb/datafiles/hostelswithlocationstest.json', toWriteTo);
    } catch (err) {
      console.log('oops!');
    }   
  }
};

////////////////////////////////
// Run the functions above

writeToFileLocations(1000, 100);
writeToFileHostels(1000, 10000);
//writeToFileSyncHostelsWithLocations(1000, 100);