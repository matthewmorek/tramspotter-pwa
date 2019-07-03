import path from 'path';
import nock from 'nock';
import { handler } from '../../src/lambda/nearest-stop';

describe('Manchester Metrolink', () => {
  it('returns the metrolink data', async () => {
    /*
     enabling nock.recorder.rec() will show what output you'll need to put below
     see https://github.com/nock/nock#recording
     */
    // nock.recorder.rec()
    nock('https://api.tfgm.com')
      .get('/odata/Metrolinks')
      .query(true)
      .replyWithFile(
        200,
        path.join(__dirname, '../__fixtures__/metrolinks.json')
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
