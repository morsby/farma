const Drug = require('./../models/Drug');

module.exports = app => {
	app.get('/api/drugs', (req, res) => {
		Drug.find()
			.sort({ name: 1 })
			.select(['name', 'important', 'chapters', 'hasInfo', 'preview'])
			.exec((err, drugs) => {
				if (err) res.send(err);

				res.json(drugs);
			});
	});

	app.get('/api/drugs/:drug_id', (req, res) => {
		Drug.findById(req.params.drug_id).exec((err, drug) => {
			if (err) res.send(err);

			res.json(drug);
		});
	});
};
