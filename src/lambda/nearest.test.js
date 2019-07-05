import path from 'path';
import nock from 'nock';
import { handler } from './nearest';

describe('Manchester Metrolink', () => {
  // FIXME: There's a problem with the async/await and callback-based implementation
  it.skip('returns the metrolink data', async () => {
    /*
     enabling nock.recorder.rec() will show what output you'll need to put below
     see https://github.com/nock/nock#recording
     */
    nock.recorder.rec();
    nock('https://api.tfgm.com')
      .get('/odata/Metrolinks')
      .query(true)
      .replyWithFile(
        200,
        path.join(__dirname, '../__test__/__fixtures__/metrolinks.json')
      );

    const data = await handler(null, null);
    const json = JSON.parse(data.body);
    expect(data.statusCode).toEqual(200);
    expect(data.headers['Content-Type']).toEqual('application/json');
    expect(json[0]).toEqual(
      expect.objectContaining({
        id: 695,
        line: 'Airport'
      })
    );
  });
});
