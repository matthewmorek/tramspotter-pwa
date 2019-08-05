import compileDepartureData from './compileDepartureData';
import nearbyStops, {
  stopsWithoutASpecialMessage
} from '../__test__/__fixtures__/nearbyStops';

describe('Utility method compileDepartureData', () => {
  test('It exists', () => {
    expect(compileDepartureData).toBeTruthy();
  });

  test('Returns appropriately shaped data object', async () => {
    const finalData = {
      arrivals: [
        {
          carriages: 'Single',
          destination: 'Rochdale Town Centre',
          id: expect.any(String),
          status: 'Due',
          wait: 1
        },
        {
          carriages: 'Single',
          destination: 'Shaw and Crompton',
          id: expect.any(String),
          status: 'Due',
          wait: 7
        },
        {
          carriages: 'Single',
          destination: 'Rochdale Town Centre',
          id: expect.any(String),
          status: 'Due',
          wait: 14
        },
        {
          carriages: 'Single',
          destination: 'Shaw and Crompton',
          id: expect.any(String),
          status: 'Due',
          wait: 20
        }
      ],
      direction: 'Incoming',
      lastUpdated: '2019-07-05T16:00:44Z',
      line: 'South Manchester',
      messageBoard:
        'On 6th & 7th July planned improvement works are taking place on the Bury line as part of the Trafford Park line project. For more information please visit www.tfgm.com or Tweet us at @MCRMetrolink',
      stationLocation: 'East Didsbury',
      timestamp: expect.any(Number)
    };

    expect(compileDepartureData(nearbyStops)).toEqual(
      expect.objectContaining(finalData)
    );
  });

  test('Do not return `messageBoard` when there is `<no message>`', () => {
    expect(compileDepartureData(stopsWithoutASpecialMessage)).toEqual(
      expect.not.objectContaining({ ['messageBoard']: expect.any(String) })
    );
  });
});
