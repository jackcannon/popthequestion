express = require 'express'
path = require 'path'
app = express()

folder = '/../site/dist'

app.use express.static __dirname + folder

app.all '/*', (req, res, next) ->
	res.header "Access-Control-Allow-Origin", "*"
	res.header "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
	next()

app.get '/ping', (req, res) ->
	res.status(200).send
		'message': 'pong'

app.get '/', (req, res) ->
	res.sendFile path.resolve __dirname + folder + '/index.html'

app.get '/*', (req, res) ->
	res.sendFile path.resolve __dirname + folder + '/index.html'

port = process.env.PORT or 5000
app.listen port, () -> console.log "Server listening on port \"#{port}\""
