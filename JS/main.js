$( document ).ready(function() {
	var menu = document.getElementsByClassName('menu')[0],
		interative_area = document.getElementsByClassName('interative_area')[0],
		btn_status = document.getElementById('btn_status'),
		btn_clear = document.getElementById('btn_clear'),
		btn_add = document.getElementById('btn_add'),
		btn_slow = document.getElementById('btn_slow'),
		btn_medi = document.getElementById('btn_medi'),
		btn_fast = document.getElementById('btn_fast'),
		sld_fixed = document.getElementById('sld_fixed'),
		npt_fixed = document.getElementById('npt_fixed'),
		sld_lived = document.getElementById('sld_lived'),
		npt_lived = document.getElementById('npt_lived');

	//resize interative-area with window size
	interative_area.style.width = document.body.offsetWidth - menu.offsetWidth
	interative_area.style.left = menu.offsetWidth

	$( window ).resize(function() {
		interative_area.style.width = document.body.offsetWidth - menu.offsetWidth
		interative_area.style.left = menu.offsetWidth
	});

	//Button functions
	var fixed_min_value = 1,
		fixed_max_index = 0.14,
		normal_min_value = 1,
		normal_max_index = 0.05;
	var status = false
	var vel = 20
	var div_index = 3
	function updateStatus() {
		if(status) {
			btn_status.className = "actived"
			btn_status.innerText = "Pause"
		} else {
			btn_status.className = ""
			btn_status.innerText = "Start"
		}
	}

	btn_status.onclick = function(e) {
		if (status == true)
			status = false
		else
			status = true

		updateStatus()
	}

	btn_clear.onclick = function(e) {
		status = false
		updateStatus()
		var paras = document.getElementsByClassName('normal-point');
		while(paras[0]){
			paras[0].parentNode.removeChild(paras[0])
		}
	}

	btn_add.onclick = function(e) {
		var colors = ['2E325E', '5F2952', '99653E', '31705E', '687D36','7D3326', '705C23', '365E21', '1D5E5F', '3F2A99']
		var color = colors[Math.floor(Math.random() * colors.length)];
		var myCircle = document.createElementNS(svgNS,"circle");

		myCircle.setAttributeNS(null,"class","fixed-point");
		myCircle.setAttributeNS(null,"cx", Math.floor(Math.random() * (interative_area.offsetWidth - 100, 100)) + 100);
		myCircle.setAttributeNS(null,"cy", Math.floor(Math.random() * (interative_area.offsetHeight - 100, 100)) + 100);
		myCircle.setAttributeNS(null,"r", fixed_min_value + fixed_max_index * npt_fixed.value);
		myCircle.setAttributeNS(null,"fill","#" + color);
		myCircle.setAttributeNS(null,"stroke","none");
		$(myCircle).mousedown(function(e){
			grab_status = true;
			target = e.target;
		}).mouseup(function(e){
			grab_status = false;
			target = null;
		})
		$(myCircle).mousedown(function(e){
			grab_status = true;
			target = e.target;
		}).mouseup(function(e){
			grab_status = false;
			target = null;
		})
		document.getElementById('main').appendChild(myCircle)
	}

	btn_slow.onclick = function(e) {
		vel = 100;
		btn_slow.className = "actived"
		btn_medi.className = ""
		btn_fast.className = ""
	}

	btn_medi.onclick = function(e) {
		vel = 20;
		btn_slow.className = ""
		btn_medi.className = "actived"
		btn_fast.className = ""
	}

	btn_fast.onclick = function(e) {
		vel = 1;
		btn_slow.className = ""
		btn_medi.className = ""
		btn_fast.className = "actived"
	}

	function changeFixedSize(per) {
		$('.fixed-point').each(function(i, ele) {
			ele.setAttribute('r', fixed_min_value + fixed_max_index * per)
		})
		$('.start-point').each(function(i, ele) {
			ele.setAttribute('r', fixed_min_value + fixed_max_index * per)
		})
	}

	function changeLivedSize(per) {
		$('.normal-point').each(function(i, ele) {
			ele.setAttribute('r', normal_min_value + normal_max_index * per)
		})
	}

	sld_fixed.onchange = function(e) {
		npt_fixed.value = sld_fixed.value
		changeFixedSize(sld_fixed.value)
	}

	npt_fixed.onchange = function(e) {
		if(npt_fixed.value > 100) npt_fixed.value = 100
		sld_fixed.value = npt_fixed.value
		changeFixedSize(npt_fixed.value)
	}

	sld_lived.onchange = function(e) {
		npt_lived.value = sld_lived.value
		changeLivedSize(npt_lived.value)
	}

	npt_lived.onchange = function(e) {
		if(npt_lived.value > 100) npt_lived.value = 100
		sld_lived.value = npt_lived.value
		changeLivedSize(sld_lived.value)
	}


	//Drag functions
	grab_status = false;
	target = null;
	$('.fixed-point').mousedown(function(e){
		grab_status = true;
		target = e.target;
	}).mouseup(function(e){
		grab_status = false;
		target = null;
	})
	$('.start-point').mousedown(function(e){
		grab_status = true;
		target = e.target;
	}).mouseup(function(e){
		grab_status = false;
		target = null;
	})
	$(document).mousemove(function(e) {
		if(grab_status) {
			var posX = e.pageX - menu.offsetWidth,
				posY = e.pageY;
			target.setAttribute('cx', posX)
			target.setAttribute('cy', posY)
		}

	})


	var svgNS = "http://www.w3.org/2000/svg";
	function statusListener() {

		//Create a new point
		function placeAPoint(lp, fp) {
			var fixed = fp[Math.floor(Math.random() * fp.length)];
			var next_pos = [((lp.cx.baseVal.value + fixed.cx.baseVal.value)/3), ((lp.cy.baseVal.value + fixed.cy.baseVal.value)/3)]

			var myCircle = document.createElementNS(svgNS,"circle");

			myCircle.setAttributeNS(null,"class","normal-point");
			myCircle.setAttributeNS(null,"cx",next_pos[0]);
			myCircle.setAttributeNS(null,"cy",next_pos[1]);
			myCircle.setAttributeNS(null,"r", normal_min_value + normal_max_index * npt_lived.value);
			myCircle.setAttributeNS(null,"fill","black");
			myCircle.setAttributeNS(null,"stroke","none");
			document.getElementById('main').appendChild(myCircle)
		}

		//Listening status var
		if(status) {
			var normal_points = document.getElementsByClassName('normal-point')
			 if(!normal_points[0]) {
				 placeAPoint(document.getElementsByClassName('start-point')[0], document.getElementsByClassName('fixed-point'))
			 } else {
				placeAPoint(normal_points[normal_points.length - 1], document.getElementsByClassName('fixed-point'))
			}
			setTimeout(function () {
				statusListener()
			}, vel);
		} else {
			setTimeout(function () {
				statusListener()
			}, 1);
		}
	}
	statusListener()
})
