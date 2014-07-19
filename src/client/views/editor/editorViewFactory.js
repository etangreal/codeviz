
// -----------------------------------------------------------------------------------------------------------------
// EditorViewFactory
// -----------------------------------------------------------------------------------------------------------------

this.EditorViewFactory = {

	docListSurface: function(classes) {
	
		var classes = classes || [];
		var WIDTH = 220;

		var docListAdd = new Famous.MeteorSurface({
			template: Template.docListAdd,
			size: [WIDTH, 37],
			classes: classes,
			properties: {
				overflow: 'visible',
				backgroundColor: 'white'
			}
		});

		var docList = new Famous.MeteorSurface({
			template: Template.docList,
			size: [WIDTH, 600],
			classes: classes,
			properties: {
				overflow: 'scroll',
				backgroundColor: 'white'
			}
		});

		// Template.docList.rendered = function() {
		// 	console.log('docList.rendered')
		// 	//element = contentSurface._currTarget;
		// 	var list = $('.div-docList');
		// 	//docList.setSize([WIDTH,list.offsetHeight]);
		// 	console.log(list.height());
		// }

	    var layout = new Famous.SequentialLayout({
	        direction: Famous.Utility.Direction.Y,
	        //itemSpacing: 20
	    });

	    var surfaces = [];
		layout.sequenceFrom(surfaces);
		surfaces.push(docListAdd);
		surfaces.push(docList);

		//layout.sequenceFrom([docListAdd, docList]);

		return layout;
	},

	// -----------------------------------------------------------------------------------------------------------------

	docListViewTest: function() {

		var view = new Famous.View();

        var mod = new Famous.Modifier({
            origin: [.5, .5],
            size: [300, 300]
        });
		
		var docList = this.docListSurface(['div-docList-test']);

		view.add(mod).add(docList);

		return view;
	}

}//EditorViewFactory

// -----------------------------------------------------------------------------------------------------------------
// END
// -----------------------------------------------------------------------------------------------------------------