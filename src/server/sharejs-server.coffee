# A convenience function for creating a document on the server.
ShareJS.initializeDoc = (docName, content) ->
  ShareJS.model.create docName, 'text', {}, (err) ->
    if err
      console.log(err)
      return
    # One op; insert all the content at position 0
    # https://github.com/share/ShareJS/wiki/Server-api
    opData = {
      op: [ {i: content, p: 0} ]
      v: 0
      meta: {}
    }
    ShareJS.model.applyOp docName, opData, (err, res) ->
      console.log(err) if err