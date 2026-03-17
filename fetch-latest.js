const fs = require('fs');

const apiKey = process.env.YOUTUBE_API_KEY;
const channelId = 'UCalSUGPb30MGEAxrIo-_QNw';

function daysSince(dateString) {
	const published = new Date(dateString);
	const now = new Date();
	const diff = now - published;
	let result = Math.floor(diff / (1000 * 60 * 60 * 24));
    return Math.min(result, 8);
}

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
			videoId: video.id.videoId,
			daysSince: daysSince(video.snippet.publishedAt)
		};

		fs.writeFileSync('latest-video.json', JSON.stringify(json, null, 2));
		console.log('s: latest-video.json updated successfully');
	} catch (err) {
		console.error('e:', err.message);
		fs.writeFileSync('latest-video.json', JSON.stringify({ error: err.message }, null, 2));
	} finally {
		process.exit(0);
	}
}

updateLatestVideo();
