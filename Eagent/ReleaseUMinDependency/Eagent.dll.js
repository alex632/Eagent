var mapx;
var oReq = new XMLHttpRequest();
oReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Action to be performed when the document is read;
       eval(this.responseText);
       //alert(mapx['0.png']);
    }
};
oReq.open('GET', 'http://localhost/html5/mapping.js');
oReq.send();

var occurance = {};
var autoClick = false;
var total = 0, distinct = 0, maxRepeat = 0;
var defDelay = 30, delay = defDelay;
function hack() {
	document.getElementById('imgcode').addEventListener('load', function() {
		var imgUrl = document.getElementById('imgcode').src;
		var imgName = imgUrl.substr(imgUrl.lastIndexOf('/')+1);
		//alert(imgName);
		document.getElementById('imagenumber').value = mapx[imgName];
		total++;
		document.getElementById('total').innerHTML = total;
		if (typeof occurance[this.src] == 'undefined') {
			occurance[this.src] = 1;
			distinct++;
			document.getElementById('distinct').innerHTML = distinct;
		} else {
			occurance[this.src] ++;
		}
		if (occurance[this.src] > maxRepeat) {
			maxRepeat = occurance[this.src];
			document.getElementById('maxRepeat').innerHTML = maxRepeat;
		}
		if (autoClick) {
			if (delay==0)
				document.getElementById('imagenumberrefresh').click();
			else
				setTimeout("document.getElementById('imagenumberrefresh').click()", delay);
		}
	});
}
function dump() {
	for (var key in occurance) {
		console.log(key, ' ', occurance[key]);
	}
}
function autoRun() {
	autoClick = !autoClick;
	if (autoClick) {
		document.getElementById('btnAutoRun').value = 'Auto Run ON';
		document.getElementById('imagenumberrefresh').click();
	} else {
		document.getElementById('btnAutoRun').value = 'Auto Run OFF';
	}
}
function changeDelay() {
	if (event.keyCode == 13 || event.keyCode == 17) {	// Enter or Ctrl-Q
		var n = Number(document.getElementById('btnDelay').value);
		if ( isNaN(n) ) {
			n = defDelay;
		}
		delay = n;
		document.getElementById('btnDelay').value = delay;
		document.getElementById('delay').innerHTML = delay;
		event.stopPropagation();
		return false;
	}
}
hack();
