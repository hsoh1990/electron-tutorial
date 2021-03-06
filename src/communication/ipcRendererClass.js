const {ipcRenderer} = require('electron');


/**
 * 기본 ipc 통신 함수
 */
function ping() {
	ipcRenderer.send('asynchronous-message', 'ping')
}

ipcRenderer.on('asynchronous-reply', (event, arg) => {
	console.log(arg) // "pong" 출력
});


/**
 *  serialport 모듈를 통한 디바이스 정보 요청
 */
function reqDevice() {
	ipcRenderer.send('reqDevice', 'any');
}

ipcRenderer.on('respDevice', (event, args) => {
	console.log(args);
	jQuery('#deviceList').empty()
	for (let element of args) {
		jQuery('#deviceList').append('<li>' + element.comName +'</li>')
	}
});

