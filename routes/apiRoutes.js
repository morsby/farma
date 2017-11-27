const Drug = require('./../models/Drug');

module.exports = app => {
	app.get('/api/drugs', (req, res) => {
		Drug.find()
			.collation({ locale: 'en', strength: 1 })
			.sort({ name: 1 })
			.select(['name', 'important', 'chapters', 'hasInfo', 'content'])
			.exec((err, drugs) => {
				if (err) {
					res.send(err);
				} else {
					res.json(drugs);
				}
			});
	});

	app.get('/api/drugs/:drug_id', (req, res) => {
		Drug.findById(req.params.drug_id).exec((err, drug) => {
			if (err) {
				res.send(err);
			} else {
				res.json(drug);
			}
		});
	});

	app.get('/api/drugs/search/:search_term', (req, res) => {
		if (req.params.search_term) {
			let searchParam = `"${req.params.search_term.replace(' ', '" "')}"`;
			//searchParam = req.params.search_term;
			//// TODO: Search virker ikke...
			searchParams = req.params.search_term.split(' ');
			searchParam = '^';
			searchParams.map(param => {
				searchParam += `(?=[\\s\\S]*${param}[\\s\\S]*)`;
			});
			searchParam += '[\\s\\S]+$';

			console.log(searchParam);

			Drug.find({
				content: new RegExp(searchParam, 'i')
			})
				.select('id')
				.exec((err, docs) => {
					if (err) {
						res.send(err);
					} else {
						res.json(docs);
					}
				});
		} else {
			res.send('No search string given');
		}
	});
};
