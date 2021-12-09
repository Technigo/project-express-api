// get a list of songs. The endpoint can be named anything,
// but the data need to have the same name as the imported data.
// app.get('/songs', (req, res) => {
//   const { topMusicData } = req.query;

//   let topMusicDataToSort = topMusicData;

//   // long line of code. indexOf... includes search results that include part of the words.
// // Hel = both hello and helsinki.
//   if (trackName) {
//     topMusicDataToSort = topMusicDataToSort.filter(
//       (item) =>
//         item.trackName.toLowerCase().indexOf(trackName.toLowerCase()) !== -1
//     );
//   }
//   // if - if. we can enter one, borth or none of the if statements.
//   if (artistName) {
//     topMusicDataToSort = topMusicDataToSort.filter(
//       (item) =>
//         item.artistName.toLowerCase().indexOf(artistName.toLowerCase()) !== -1
//     );
//   }

//   res.json({
//     response: topMusicDataToSort,
//     success: true,
//   });
// });

// app.get('/fundings/index/:index', (req, res) => {
//   const { index } = req.params;

//   const companyId = techFundings.find((company) => company.index === +index);
//   if (!companyId) {
//     // handle if there is no data
//     console.log('no company found');
//     res.status(404).send('No company found with that id');
//   } else {
//     // show the data
//     res.json(companyId);
//   }
// });

// app.get('/fundings/comapny/:company', (req, rex) => {
//   const { company } = req.params;

//   const companyByName = techFundings.find(
//     (item) => item.Company.toLowerCase() === company.toLowerCase()
//   );

//   if (!companyByName) {
//     res.status(404).json({
//       response: 'no company found with that name',
//       success: false,
//     });
//   } else {
//     res.status(200).json({
//       response: companyByName,
//       success: true,
//     });
//   }
// });
