let slideIndex = 0;

// toggle menu nav
let isNavToggled = false;

// list img untuk slider
const listImages = ["f1_usa.jpg", "motogp.jpg", "wsbk.jpg"];

const formNames = ["name", "dob", "gender", "message"];

function nextSlide() {
	slideIndex++;

	// cek jika slideIndex lebih dari listImages.length
	slideIndex = slideIndex > listImages.length - 1 ? 0 : slideIndex;
	showImageSlider(slideIndex);
}

function previousSlide() {
	slideIndex--;

	// cek jika slideIndex < 0
	slideIndex = slideIndex < 0 ? listImages.length - 1 : slideIndex;
	showImageSlider(slideIndex);
}

function showImageSlider(index) {
	const imgName = listImages[index];
	const imgPathCss = `url(../assets/img/${imgName})`;

	// custom css variable untuk styling header
	document.getElementById("header").style.setProperty("--imgPath", imgPathCss);
	sliderBulletControl(index);
}

function showSliderByIndex(index) {
	slideIndex = index;
	showImageSlider(index);
}

function sliderBulletControl(index) {
	// default state bullet-control
	document.querySelectorAll(".bullet-control").forEach((bullet) => {
		bullet.classList.remove("active");
	});

	// set indicator active (.bullet-control) sesuai index
	document.querySelectorAll(".bullet-control")[index].classList.add("active");
}

function toggleNavMenu() {
	// ubah nilai dari false ke true dan sebaliknya
	isNavToggled = !isNavToggled;

	// jika icon bars di klik
	if (isNavToggled) {
		// ubah icon nav
		document
			.getElementById("iconNavToggle")
			.classList.replace("fa-bars", "fa-times");
		// tampilkan menu mobile
		document.querySelector(".mobile-nav").style.display = "block";
	} else {
		// ubah icon nav
		document
			.getElementById("iconNavToggle")
			.classList.replace("fa-times", "fa-bars");
		// tampilkan menu mobile
		document.querySelector(".mobile-nav").style.display = "none";
	}
}

function validateForm(e) {
	let isFormValid = false;
	e.preventDefault();
	// console.log(e);
	const forms = document.forms["message"];

	const name = forms["name"].value;
	const dob = forms["dob"].value;
	let gender;
	const message = forms["message"].value;

	// cek state checked pada gender radio button
	const genderRadios = forms["gender"];
	for (let i = 0; i < genderRadios.length; i++) {
		if (genderRadios[i].checked) {
			gender = genderRadios[i].value;
			break;
		}
	}

	formNames.forEach((form) => {
		if (form === "gender") {
			// cek jika radio button sudah dipilih
			if (!gender) {
				document.getElementById("genderError").classList.add("input-invalid");
			} else {
				document
					.getElementById("genderError")
					.classList.remove("input-invalid");
			}
		} else {
			const input = forms[form];
			// class id dinamis per element
			const idName = form + "Error";

			if (input.value === "") {
				input.classList.add("input-invalid");
				document.getElementById(idName).classList.add("input-invalid");
			} else {
				input.classList.remove("input-invalid");
				document.getElementById(idName).classList.remove("input-invalid");
			}
		}
	});
	// console.log(isFormValid);

	// cek jika semua data terisi
	if (name && dob && gender && message) {
		isFormValid = true;
		// console.log(isFormValid);
		displayFormResult(formNames, [name, dob, gender, message]);
		// tampilkan button reset
		document.getElementById("btnFormResults").style.display = "block";
		document.getElementById("btnFormSubmit").style.display = "none";

		// reset nilai form pada input
		formNames.forEach((form) => {
			const input = forms[form];
			// jika type input adalah radio
			if (input instanceof RadioNodeList) {
				// loop input radio genders
				for (const gender of input) {
					gender.checked = false;
				}
			} else {
				// semua input kecuali input radio
				input.value = "";
			}
		});
	}

	return false;
}

function addName() {
	const promptName = prompt("Halo, nama kamu siapa?");
	const name = promptName || "Bro";
	// jika promptName === null maka nama tidak akan terupdate
	if (promptName === null) return;

	localStorage.setItem("userWelcomeName", name);
	removeAddNameButton();
	document.getElementById("editName").style.display = "block";
	document.getElementById("removeName").style.display = "block";
	setTextName(name);
}

function editName() {
	const promptName = prompt("Halo, nama kamu siapa?");
	// jika promptName === null maka nama tidak akan terupdate
	if (promptName === null) return;

	// jika prompt kosong maka name adalah userWelcomeName pada localStorage
	// jika prompt terisi maka name adalah inputan pada prompt
	const name =
		promptName === "" ? localStorage.getItem("userWelcomeName") : promptName;

	// alert(name);

	localStorage.setItem("userWelcomeName", name);
	setTextName(name);
}

function removeName() {
	if (confirm("Yakin ingin menghapus namamu?")) {
		localStorage.removeItem("userWelcomeName");
		setTextName("Bro");
		// show tambah nama
		document.getElementById("addName").style.display = "block";
		document.getElementById("editName").style.display = "none";
		document.getElementById("removeName").style.display = "none";
	}
	// setTextName(name);
}

function setDefaultWelcomeName() {
	const defaultName = localStorage.getItem("userWelcomeName") ?? "Bro";

	if (defaultName !== "Bro") {
		removeAddNameButton();
		setTextName(defaultName);
	} else {
		document.getElementById("addName").style.display = "block";
		document.getElementById("editName").style.display = "none";
		document.getElementById("removeName").style.display = "none";
	}
}

function setTextName(name) {
	document.getElementById("user").textContent = name;
	document.getElementById("userIntro").textContent = name;
}

function removeAddNameButton() {
	document.getElementById("addName").style.display = "none";
}

function refreshTime() {
	const date = new Date();
	const options = {
		timeZone: "Asia/Kuala_Lumpur", // timezone WITA (GMT +8)
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false, // 24-hour format
	};

	const formattedString = new Intl.DateTimeFormat("en-US", options).format(
		date,
	);
	const [datePart, timePart] = formattedString.split(", ");
	const [month, day, year] = datePart.split("/");
	const formattedDate = `${day}/${month}/${year} - ${timePart}`;

	document.getElementById("clockTime").textContent = formattedDate;
}

function displayFormResult(formNames = [], formResults = []) {
	// cek jika formNames atau formResults kosong
	if (!formNames.length || !formResults.length) return;
	formNames.forEach((name, index) => {
		// state awal jika form belum diisi
		let defaultText =
			name === "message" ? "Belum ada informasi yang dikirim" : "-";
		const idOutput = name + "Output";

		document.getElementById(idOutput).textContent =
			formResults[index] || defaultText;
	});
}

function resetFormResults() {
	// btnFormResults
	formNames.forEach((name) => {
		// state awal jika form belum diisi
		let defaultText =
			name === "message" ? "Belum ada informasi yang dikirim" : "-";
		const idOutput = name + "Output";

		document.getElementById(idOutput).textContent = defaultText;
	});
	document.forms["message"]["name"].focus();
	document.getElementById("btnFormResults").style.display = "none";
	document.getElementById("btnFormSubmit").style.display = "block";
}

// init function ketika web dibuka
setInterval(refreshTime, 1000);
setDefaultWelcomeName();
showImageSlider(slideIndex);
setInterval(() => nextSlide(), 2000);
