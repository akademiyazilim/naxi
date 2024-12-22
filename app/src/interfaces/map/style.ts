import { cssVar } from '@naxi/utils/browser';

export function getMapStyle() {
	const color = [
		'case',
		['==', ['get', 'mode'], 'static'],
		cssVar('--black'),
		['==', ['get', 'active'], 'true'],
		cssVar('--theme--secondary'),
		cssVar('--theme--primary'),
	];

	return [
		{
			id: 'naxi-polygon-fill',
			type: 'fill',
			filter: ['all', ['==', '$type', 'Polygon']],
			paint: {
				'fill-color': color,
				'fill-outline-color': color,
				'fill-opacity': 0.15,
			},
		},
		{
			id: 'naxi-polygon-stroke',
			type: 'line',
			filter: ['all', ['==', '$type', 'Polygon']],
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
			},
			paint: {
				'line-color': color,
				'line-width': 2,
			},
		},
		{
			id: 'naxi-polygon-midpoint',
			type: 'circle',
			filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
			paint: {
				'circle-radius': 3,
				'circle-color': cssVar('--theme--secondary'),
			},
		},
		{
			id: 'naxi-line',
			type: 'line',
			filter: ['all', ['==', '$type', 'LineString']],
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
			},
			paint: {
				'line-color': color,
				'line-width': 2,
			},
		},
		{
			id: 'naxi-polygon-and-line-vertex',
			type: 'circle',
			filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point']],
			paint: {
				'circle-radius': 3,
				'circle-color': cssVar('--theme--secondary'),
				'circle-opacity': ['case', ['==', ['get', 'active'], 'true'], 1, 0.2],
				'circle-stroke-color': [
					'case',
					['==', ['get', 'active'], 'true'],
					cssVar('--white'),
					cssVar('--theme--secondary'),
				],
				'circle-stroke-width': 2,
			},
		},
		{
			id: 'naxi-point-shadow',
			filter: [
				'all',
				['==', '$type', 'Point'],
				['==', 'meta', 'feature'],
				['!=', 'meta', 'midpoint'],
				['!=', 'mode', 'static'],
			],
			type: 'circle',
			layout: {},
			paint: {
				'circle-radius': 10,
				'circle-blur': 1,
				'circle-opacity': 0.9,
				'circle-color': cssVar('--black'),
			},
		},
		{
			id: 'naxi-point',
			filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'feature'], ['!=', 'meta', 'midpoint']],
			type: 'circle',
			layout: {},
			paint: {
				'circle-radius': 6,
				'circle-color': color,
				'circle-stroke-color': ['case', ['==', ['get', 'mode'], 'static'], cssVar('--black'), cssVar('--white')],
				'circle-opacity': ['case', ['==', ['get', 'mode'], 'static'], 0.2, 1],
				'circle-stroke-width': 2,
				'circle-stroke-opacity': 1,
			},
		},
	];
}
