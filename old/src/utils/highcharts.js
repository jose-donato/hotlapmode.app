import Highcharts from 'highcharts';

export default (node, config) => {
	const redraw = true;
	const oneToOne = true;
	const chart = Highcharts.chart(node, config);

	return {
		update(config) {
			chart.update(config, redraw, oneToOne);
		},
		destroy() {
			chart.destroy();
		}
	};
};
