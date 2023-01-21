import LRU from 'lru-cache';

const cache = new LRU({
	max: 1000,
	ttl: 1000 * 60 * 60 * 24 * 7
});

export default cache;
