class Mouse {
	create () {
		window.addEventListener('mousemove', function (e) {
			console.log('[X]:', e.clientX, '[Y]:', e.clientY)
		})
	}
}

export default Mouse;

// class Message {
// 	constructor () {
// 		this.message = 'hello world'
// 	}
// }

// module.exports = Message;