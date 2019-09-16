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
          destination: 'Altrincham',
          id: expect.any(String),
          status: 'Departing',
          wait: 0
        },
        {
          carriages: 'Double',
          destination: 'Old Trafford',
          id: expect.any(String),
          status: 'Arrived',
          wait: 0
        },
        {
          carriages: 'Single',
          destination: 'Piccadilly',
          id: expect.any(String),
          status: 'Due',
          wait: 9
        },
        {
          carriages: 'Double',
          destination: 'Altrincham',
          id: expect.any(String),
          status: 'Due',
          wait: 14
        },
        {
          carriages: 'Single',
          destination: 'Piccadilly',
          id: expect.any(String),
          status: 'Due',
          wait: 21
        },
        {
          carriages: 'Single',
          destination: 'Altrincham',
          id: expect.any(String),
          status: 'Due',
          wait: 25
        }
      ],
      direction: 'Outgoing',
      lastUpdated: '2019-09-16T20:19:38Z',
      line: 'Altrincham',
      messageBoard: expect.any(String),
      stationLocation: 'Timperley',
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
