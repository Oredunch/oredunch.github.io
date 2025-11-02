const fs = require('fs');
const fetch = require('node-fetch');

const apiKey = process.env.YOUTUBE_API_KEY;
const channelId = 'UCalSUGPb30MGEAxrIo-_QNw';

async function updateLatestVideo() {
	const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
	const data = await res.json();
	if (!data.items || !data.items[0]) throw new Error('No video found');
	const video = data.items[0];
	const json = { title: video.snippet.title, videoId: video.id.videoId };
	fs.writeFileSync('latest-video.json', JSON.stringify(json, null, 2));
}

updateLatestVideo().catch(err => { console.error(err); process.exit(1); });
