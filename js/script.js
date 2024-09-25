let slideIndex = 0;

// toggle menu nav
let isNavToggled = false;

// list img untuk slider
const listImages = ["f1_usa.jpg", "motogp.jpg", "wsbk.jpg"];

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
	e.preventDefault();
	console.log(e);

	const forms = document.forms["message"];
	const formNames = ["name", "dob", "gender", "message"];

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

	// console.log("name: ", name);
	// console.log("dob: ", dob);
	// console.log("gender: ", gender);
	// console.log("message: ", message);

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

	return false;
}

function addName() {
	const promptName = prompt("Halo, nama kamu siapa?");
	const name = promptName || "Bro";
	if (promptName === null) return;

	localStorage.setItem("userWelcomeName", name);
	removeAddNameButton();
	document.getElementById("editName").style.display = "block";
	document.getElementById("removeName").style.display = "block";
	setTextName(name);
}

function editName() {
	const promptName = prompt("Halo, nama kamu siapa?");
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

// init function ketika web dibuka
setDefaultWelcomeName();
showImageSlider(slideIndex);
setInterval(() => nextSlide(), 2000);
