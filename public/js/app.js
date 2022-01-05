const index = document.querySelector('.form');
let firstname = document.getElementById('firstname')
let lastname = document.getElementById('lastname')
let email = document.getElementById('email');
let message = document.getElementById('message');



index.addEventListener('submit', (e)=>{
	e.preventDefault();
	
	let formData = {
		firstname: firstname.value,
		lastname: lastname.value,
		email: email.value,
		message: message.value
	}

	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/');
	xhr.setRequestHeader('content-type', 'application/json');
	xhr.onload = function() {
		console.log(xhr.responseText);
		if(xhr.responseText == 'success'){
			firstname.value = '';
			lastname.value = '';
			email.value = '';
			message.value = '';
		}else {
			alert('something went wrong')
		}
	}

	xhr.send(JSON.stringify(formData));


	checkInputs();

});


function checkInputs(){
	const firstnameValue = firstname.value.trim();
	const lastnameValue = lastname.value.trim();
	const emailValue = email.value.trim();
	const messageValue = message.value.trim();

	if(firstnameValue === '') {
		setErrorFor(firstname, ' Full name cannot be blank');
	} else {
		setSuccessFor(firstname);
	}

	if(lastnameValue === '') {
		setErrorFor(lastname, ' Subject cannot be blank');
	} else {
		setSuccessFor(lastname);
	}

	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
		
	}
	
	if(messageValue === '') {
		setErrorFor(message, 'Message cannot be blank');
	} else if (messageValue.length < 7) {
		setErrorFor(message, 'Message Less than 7 characters');
	} else {
		setSuccessFor(message);
	}
};


function setErrorFor(input, message) {
	const formc = input.parentElement;
	const small = formc.querySelector('small');
	formc.className = 'formc error';
	small.innerText = message;
};

function setSuccessFor(input) {
	const formc = input.parentElement;
	formc.className = 'formc success';
};

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

