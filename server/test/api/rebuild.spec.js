const assert = require('assert');

const Request = require('../lib/request');
const config = require('../../config/app.json');
const rebuildConfig = config.podcast.rebuild;

describe('/api/rebuild', () => {
  const request = new Request();

  it('ポッドキャストの一覧が取得できること', (done) => {

    request.nock(rebuildConfig.feedRootUrl)
      .get(rebuildConfig.feedPath)
      .reply(200, `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Test Title</title>
    <description>ウェブ開発、プログラミング、モバイル、ガジェットなどにフォーカスしたテクノロジー系ポッドキャストです。</description>
    <generator>Jekyll</generator>
    <link>http://dummy.fm</link>
    <language>ja</language>

    <item>
      <title>2: Test Title 2</title>
      <pubDate>Sat, 06 Jan 2018 03:00:00 -0800</pubDate>
      <link>http://dummy.fm/2/</link>
      <guid isPermaLink="true">http://dummy.fm/2/</guid>
      <itunes:subtitle>テストエピソード２などについて話しました。
</itunes:subtitle>
      <enclosure url="http://cache.dummy.fm/podcast-ep2.mp3" type="audio/mpeg" length="87429602" />

    </item>

    <item>
      <title>2: Test Title 1</title>
      <pubDate>Sat, 24 Dec 2017 03:00:00 -0800</pubDate>
      <link>http://dummy.fm/1/</link>
      <guid isPermaLink="true">http://dummy.fm/1/</guid>
      <itunes:subtitle>テストエピソード１などについて話しました。
</itunes:subtitle>
      <enclosure url="http://cache.dummy.fm/podcast-ep1.mp3" type="audio/mpeg" length="87429602" />

    </item>
  </channel>
</rss>
`);

    request
      .get('/api/rebuild')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          podcasts: [{
              title: '2: Test Title 2',
              subTitle: 'テストエピソード２などについて話しました。',
              pubDate: '2018-01-06T11:00:00.000Z',
              url: 'http://cache.dummy.fm/podcast-ep2.mp3'
            },
            {
              title: '2: Test Title 1',
              subTitle: 'テストエピソード１などについて話しました。',
              pubDate: '2017-12-24T11:00:00.000Z',
              url: 'http://cache.dummy.fm/podcast-ep1.mp3'
            }
          ]
        });
      })
      .end(done);
  });

  it('ポッドキャストの RSS 取得でエラーが発生した場合 500 エラーとなること', (done) => {
    request.nock(rebuildConfig.feedRootUrl)
      .get(rebuildConfig.feedPath)
      .reply(404, 'Not Found');

    request
      .get('/api/rebuild')
      .expect('Content-Type', /json/)
      .expect(500)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          message: 'Failed to fetch rss. [404]'
        });
      })
      .end(done);
  });
});
