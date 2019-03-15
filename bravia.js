var Bravia = require('bravia');

// Accepts two parameters, IP and PSKKey
var bravia = new Bravia('192.168.0.2', '80', '0015');

// // Retrieves all the available IRCC commands from the TV.
// bravia.getIRCCCodes()
//   .then((commands) => console.log('getIRCCCodes', commands))
//   .catch((error) => console.error(error));

// // Queries the volume info.
// bravia.audio.invoke('getVolumeInformation')
//   .then((info) => console.log('getVolumeInformation', info))
//   .catch((error) => console.error(error));

bravia.send('WakeUp')
  .then(() => bravia.send('Num2'))
  .catch(err => console.err('err!!!!', err));
//bravia.send('PowerOff').then().catch(err => console.err('err!!!!', err));
