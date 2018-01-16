const FeedParser = require('feedparser');
const request = require('request');
const googleHome = require('google-home-notifier');

const Logger = require('./Logger');
const config = require('../config/app.json');

const logger = new Logger();

const lang = 'ja';
const ip = config.googleHome.ip;
googleHome.ip(ip, lang);

class Podcast {
  static play(data) {
    this.parseRssFeed(data.url, (err, rssItems) => {
      if (err) {
        logger.error('Failed to parse rss feed.', err);
        return;
      }
      const latestUrl = this.getLatestUrl(rssItems);
      googleHome.play(latestUrl, (notifyRes) => {
        logger.info(notifyRes);
      });
    });
  }

  static getPodcasts(feedUrl, callback) {
    this.parseRssFeed(feedUrl, (error, rssItems) => {
      if (error) {
        logger.error('Failed to parse rss feed.', error);
        return callback(error);
      }
      const podcasts = rssItems.map((rssItem) => {
        const enclosure = rssItem.enclosures[0];
        return {
          title: rssItem.title,
          subTitle: rssItem['itunes:subtitle']['#'],
          pubDate: rssItem.pubDate,
          url: enclosure.url
        };
      });
      return callback(null, podcasts);
    });
  }

  static parseRssFeed(url, callback) {
    const feedparser = new FeedParser();
    const rssItems = [];

    request.get(url)
      .on('response', (res) => {
        if (res.statusCode !== 200) {
          return callback(new Error(`Failed to fetch rss. [${res.statusCode}]`));
        }
      })
      .on('error', (error) => callback(error))
      .pipe(feedparser);

    feedparser
      .on('error', (error) => callback(error))
      .on('readable', () => {
        let item = null;
        while ((item = feedparser.read())) {
          rssItems.push(item);
        }
      })
      .on('end', function() {
        return callback(null, rssItems);
      });
  }

  static getLatestUrl(rssItems) {
    for (const rssItem of rssItems) {
      for (const enclosure of rssItem.enclosures) {
        if (enclosure.url) {
          return enclosure.url;
        }
      }
    }
    return '';
  }
}

module.exports = Podcast;