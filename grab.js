var request = require('request');
var mongojs = require('mongojs');

var db = mongojs('batinthesun', ["videos"]);

db.on('error', function(err) {
  console.log('Database Error:', err);
});

var videos = [
	'K1-oA5joVOk',
	'oCdrAnbXYRY',
	'kF6XHxVlPpI',
	'8Q2uzIv4nhg',
	'QVmKVE3NYMI',
	'2rut_-YgJYw',
	'u3tC8TPh9oQ',
	'qv6saLrn3UY',
	'NkMxa64H0xY',
	'VWkLH97mMdU',
	'MtDe9ZhYGDQ',
	'ur6hSy7DWXw',
	'ap8r3AA0PIk',
	's3wDj7bYve0',
	'wAg2m5UlBYw',
	'6M5pYyW6lLw',
	'DBdyDfKwpmg',
	'QXrjTXD5L3s',
	'nqu1CEy8M4g',
	'UuKQ3Oc97Wk',
	'aF2J_7clCo8',
];

var req = {
	url: 'https://www.googleapis.com/youtube/v3/videos',
	qs: {
		id: videos.join(','),
		key: 'AIzaSyBGg0erZ17kflNYBVqhxrm7KKXgP50ztQ0',
		part: 'snippet,contentDetails,statistics,status'
	}
};

// var url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBGg0erZ17kflNYBVqhxrm7KKXgP50ztQ0&channelId=UCZQPsy92dpejcCJfZDbp__Q&part=snippet,id&order=date&maxResults=50';

request(req, function(err, data, body) {
	body = JSON.parse(body);
	// console.log(body.items);
	body.items.forEach(function(video) {
		db.videos.insert(video);
	})
});