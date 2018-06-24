const fs = require('fs');
const faker = require('faker');

////////////////////////////////
// Helpers

const generatePhotosArrPostgresFormat = () => {
  let photoString = '[';
  const numPhotos = Math.floor(Math.random() * 10) + 10;
  for (let i = 0; i < numPhotos; i += 1) {
    const photoID = Math.floor(Math.random() * 1059);
    photoString += `'https://s3-us-west-1.amazonaws.com/travelinn-photos/Photo${photoID}.jpg'`;
    if (i < numPhotos - 1) { photoString += ','};
  }
  photoString += ']';
  return photoString;
};

////////////////////////////////
// Real Functions!
////////////////////////////////





// 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
// 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
// 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
// 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
// 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111

// const generateReviewPostgresFormat = () => {

// };



// const generateReview = () => {
//   let reviews = [];
//   const numReviews = Math.floor(Math.random() * 10) + 20;
//   for (let i = 0; i < numReviews; i+=1) {
//     reviews.push(JSON.stringify({
//       rating: Math.floor(Math.random() * 10),
//       topFeature: faker.commerce.productAdjective(),
//     }));
//   }
//   return reviews;
// };

// const generateReviewsArr = () => {
//   let reviews = [];
//   const numReviews = Math.floor(Math.random() * 10) + 20;
//   for (let i = 0; i < numReviews; i+=1) {
//     reviews.push(JSON.stringify({
//       rating: Math.floor(Math.random() * 10),
//       topFeature: faker.commerce.productAdjective(),
//     }));
//   }
//   return reviews;
// };



const generateReviewsArrPostgresFormat = () => {
  let reviewString = '[';
  const numReviews = Math.floor(Math.random() * 10) + 20;
  for (let i = 0; i < numReviews; i+=1) {
    reviewString += JSON.stringify({
      rating: Math.floor(Math.random() * 10),
      topFeature: faker.commerce.productAdjective(),
    });
    if (i < numReviews - 1) { reviewString += ','};
  }
  reviewString += ']';
  return reviewString;
};

////////////////////////////////
// Real Functions!
////////////////////////////////

////////////////////////////////
// For locations

// const writeToFileLocations = (batchSize, numBatches) => {
//   let toWriteTo = '';
//   for (let i = 0; i < numBatches; i++) {
//     toWriteTo = '';
//     for (let j = 1; j < batchSize + 1; j++) {
//       toWriteTo += JSON.stringify({
//         _id: 'L' + ((i * batchSize) + j),
//         city: faker.address.city(),
//         country: faker.address.country(),
//       }) + '\n';      
//     }
//     try {
//       fs.appendFileSync('./postgres/datafiles/locations.csv', toWriteTo);
//     } catch (err) {
//       console.log('oops!');
//     }   
//   }
// };

////////////////////////////////
// For hostels without locations

// Make sure location id parameter number exists!
const writeToFileHostels = (batchSize, numBatches) => {
  let toWriteTo = '';
  for (let i = 0; i < numBatches; i++) {
    toWriteTo = '';
    console.time();
    for (let j = 1; j < batchSize + 1; j++) {
      toWriteTo += '' + ((i * batchSize) + j);
      toWriteTo += '|';
      toWriteTo += faker.address.streetName() + ' ' + faker.company.bsNoun();
      toWriteTo += '|';
      toWriteTo += faker.lorem.paragraph();
      toWriteTo += '|';
      toWriteTo += generatePhotosArrPostgresFormat();
      toWriteTo += '|';
      toWriteTo += generateReviewsArr();
      toWriteTo += '|';
      toWriteTo += 'L' + Math.floor(Math.random() * 1000) + 1,
      toWriteTo += '\n';

      // JSON.stringify({
      //   _id: '' + ((i * batchSize) + j),
      //   name: faker.address.streetName() + faker.company.bsNoun(),
      //   description: faker.lorem.paragraph(),
      //   photos: generatePhotosArr(),
      //   reviews: generateReviewsArr(),
      //   locationId: 'L' + Math.floor(Math.random() * 100000) + 1,
      // }) + '\n';      
    }
    console.timeEnd();
    console.log('batch added to toWriteTo, on batch ', i, ' of ', numBatches);
    try {
      fs.appendFileSync('./postgres/datafiles/hostels.txt', toWriteTo);
    } catch (err) {
      console.log('oops!');
    }   
  }
};

/////////////////////////////
// For hostels with locations

// const writeToFileSyncHostelsWithLocations = (batchSize, numBatches) => {
//   let toWriteTo = '';
//   for (let i = 0; i < numBatches; i++) {
//     toWriteTo = '';
//     for (let j = 1; j < batchSize + 1; j++) {
//       toWriteTo += JSON.stringify({
//         _id: '' + ((i * batchSize) + j),
//         name: faker.address.streetName() + faker.company.bsNoun(),
//         description: faker.lorem.paragraph(),
//         photos: generatePhotosArr(),
//         reviews: generateReviewsArr(),
//         location: {
//           city: faker.address.city(),
//           country: faker.address.country(),
//         },
//       }) + '\n';      
//     }
//     try {
//       fs.appendFileSync('./postgres/datafiles/hostelswithlocationstest.csv', toWriteTo);
//     } catch (err) {
//       console.log('oops!');
//     }   
//   }
// };

////////////////////////////////
// Run the functions above

//writeToFileLocations(1000, 100);
writeToFileHostels(100, 1);
//writeToFileSyncHostelsWithLocations(1000, 100);
//console.log(generatePhotosArrPostgresFormat());