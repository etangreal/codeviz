
Package.describe({
	summary: "Handelbars (byMeTM)"
});

Package.on_use(function(api) {
	api.export('Handelbars', ['server']);

	api.use(['handlebars'], ['server']);
	// api.add_files(['handlebars.runtime-v1.3.0.js'], ['client','server']);
});