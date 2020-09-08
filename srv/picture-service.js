const cds = require('@sap/cds');
const {
	Readable
} = require('stream')

module.exports = cds.service.impl((srv) => {

	const {
        PictureSet
    } = srv.entities
    
	srv.on('READ', 'PictureSet', async(req, next) => {
		if (!req.data.ID) {
			return next()
		}

		const url = req._.req.path
		if (url.includes('content')) {
			const id = req.data.ID
			console.log(id)
			var tx = cds.transaction(req);
			var mediaObj = await tx.run(SELECT.from(PictureSet, ['content']).where('ID =', id))
            if (mediaObj.length <= 0) {
				req.reject(404, 'Media not found for the ID')
				return
            }
            var decodedMedia= "";
			for (var i in mediaObj) {
                if(mediaObj[i].hasOwnProperty("content")) {
                    decodedMedia = new Buffer.from(
					     (mediaObj[i].content.toString()).split(';base64,').pop(),
					    'base64'
				    )
                } else {
						req.reject(404, 'Media not found for the ID')
				return
				}
			}
            return _formatResult(decodedMedia)
		} else return next()
	})

	function _formatResult(decodedMedia) {
		const readable = new Readable()
		const result = new Array()
        readable.push(decodedMedia)
		readable.push(null)
		result.push({
			value: readable
        })
		return result
	}
})