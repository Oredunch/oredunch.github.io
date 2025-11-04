const fs = require('fs');
const fetch = require('node-fetch');

const apiKey = process.env.YOUTUBE_API_KEY;
const channelId = 'UCalSUGPb30MGEAxrIo-_QNw';

async function updateLatestVideo() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${apiKey}`;
  console.log('Fetching:', url.replace(apiKey, '[KEY HIDDEN]'));

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
    const data = await res.json();
    console.log('Response:', JSON.stringify(data, null, 2));

    if (!data.items || data.items.length === 0) {
      throw new Error('No video items returned');
    }

    const video = data.items[0];
    const json = {
      title: video.snippet.title,
      videoId: video.id.videoId
    };

    fs.writeFileSync('latest-video.json', JSON.stringify(json, null, 2));
    console.log('✅ latest-video.json updated successfully');
  } catch (err) {
    console.error('❌', err.message);
    fs.writeFileSync('latest-video.json', JSON.stringify({ error: err.message }, null, 2));
  } finally {
    process.exit(0);
  }
}

updateLatestVideo();