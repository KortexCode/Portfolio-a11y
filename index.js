let lastActivedElement = null;

window.onload = () => {
  //Eventos de click del las flechas del carrusel
  document.querySelector(".arrow-right").addEventListener("click", clickRight);
  document.querySelector(".arrow-left").addEventListener("click", clickLeft);
  //Eventos de click en los inputs del formulario
  document.getElementById("nombre").addEventListener("click", closeErrorName);
  document.getElementById("correo").addEventListener("click", closeErrorEmail);
  document
    .getElementById("mensaje")
    .addEventListener("click", closeErrorMessage);
  /*  document.getElementById("correo");
  document.getElementById("mensaje"); */

  //Evento de envío de formulario
  document
    .querySelector(".send-button")
    .addEventListener("click", (e) => validateForm(e));
  //Eventos de apertura del modal
  document.querySelectorAll(".project").forEach((element) => {
    element.addEventListener("click", (e) => openModal(e));
  });
  //Eventos de cierre del modal con click
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.addEventListener("click", (e) => closeModal(e));

  modalContainer.addEventListener("keydown", (e) => pressKey(e));
  //Eventos de cierre del modal con botón
  const btnClose = document.querySelector(".modal-button");
  btnClose.addEventListener("click", (e) => closeModal(e));
  btnClose.addEventListener("blur", unfocusCloseButton, true);
};

/** Esta funcion se llama cuando la persona hace click en la fecha derecha del carousel para navegar a la derecha */
function clickRight() {
  const currentLeft = parseInt(
    getComputedStyle(document.querySelector(".project-container")).left,
    10
  );
  if (currentLeft < -270) {
    //si el valor de izquierda es menor a -270, para de mover el contenido
    return;
  }
  let newValue = currentLeft - 270; //270 toma en cuenta el tamaño de la imagen mas sus margines
  //Variando el tabIndex de la navegación en cada proyecto
  document.querySelector(".project-container").style.left = `${newValue}px`;
  switch (newValue) {
    case -270:
      document.querySelector(".project1").setAttribute("tabindex", "-1");
      document
        .querySelector(".project1-container")
        .setAttribute("aria-hidden", true);
      document.querySelector(".project4").removeAttribute("tabindex");
      document
        .querySelector(".project4-container")
        .removeAttribute("aria-hidden");
      break;
    case -540:
      document.querySelector(".project2").setAttribute("tabindex", "-1");
      document
        .querySelector(".project2-container")
        .setAttribute("aria-hidden", "true");
      document.querySelector(".project5").removeAttribute("tabindex");
      document
        .querySelector(".project5-container")
        .removeAttribute("aria-hidden");
      break;
    default:
      break;
  }
}

/** Esta funcion se llama cuando la persona hace click en la fecha izquierda del carousel para navegar a la izquierda */
function clickLeft() {
  const currentLeft = parseInt(
    getComputedStyle(document.querySelector(".project-container")).left,
    10
  );
  if (currentLeft === 0) {
    //si el valor de izquiera es 0, retornar para no seguir movierno el contenido
    return;
  }
  let newValue = currentLeft + 270;
  document.querySelector(".project-container").style.left = `${newValue}px`;
  //Variando el tabIndex de la navegación en cada proyecto
  switch (newValue) {
    case -270:
      document.querySelector(".project5").setAttribute("tabindex", "-1");
      document
        .querySelector(".project5-container")
        .setAttribute("aria-hidden", "true");
      document.querySelector(".project2").removeAttribute("tabindex");
      document
        .querySelector(".project2-container")
        .removeAttribute("aria-hidden");
      break;
    case 0:
      document.querySelector(".project4").setAttribute("tabindex", "-1");
      document
        .querySelector(".project4-container")
        .setAttribute("aria-hidden", "true");
      document.querySelector(".project1").removeAttribute("tabindex");
      document
        .querySelector(".project1-container")
        .removeAttribute("aria-hidden");
      break;
    default:
      break;
  }
}

/** Esta funcion se llama cuando la persona hace click en cualquier porjecto del carousel */
function openModal(e) {
  console.log("presionado2", e.target);
  lastActivedElement = document.activeElement;
  if (e.target.className === "project") {
  }
  //Se obtiene la imágen seleccionada en el carrusel
  const carouselImgSelected = e.target;
  //Obtenermos la etiqueta img del Modal
  const img = document.querySelector(".modal-project-image");
  const header = document.getElementById("modal-header");
  //Obtener etiqueta de link
  const link = document.getElementById("modal-project-link");
  //Se agrega la fuente a la imágen del modal y la dirección al link
  img.src = carouselImgSelected.src;
  link.href = carouselImgSelected.dataset.link;
  header.textContent = carouselImgSelected.dataset.name;
  //Se hace visible el modal.
  document.querySelector(".modal-container").style.display = "flex";
  document.getElementById("modal-button--focus").focus();
}

/** Esta funcion se llama para cerrar el modal */
function closeModal(e) {
  // si el click ocurrió dentro de las imagenes del carousel o dentro del modal no se cerrará el modal

  //Validamos si el modal tiene display flex
  const state = getComputedStyle(
    document.querySelector(".modal-container")
  ).display;
  //Condicionales que determinan si se debe o no cerrar el modal
  if (
    e.target.className.includes("project") ||
    e.target.className === "modal" ||
    e.target.className === "header"
  ) {
    return;
  }
  if (e.target.className === "modal-button") {
    document.querySelector(".modal-container").style.display = "none";
    lastActivedElement.focus();
  }
  if (state === "flex") {
    document.querySelector(".modal-container").style.display = "none";
    lastActivedElement.focus();
  }
}

//Si se presiona alguna tecla estando el modal abierto
function pressKey(e) {
  console.log("presionado");
  //Si se presiona la tecla ESC cerrará el modal
  if (e.keyCode === 27) {
    closeModal(e);
  }
}
//Evita que el focus se vaya del botón de cierre en el modal
function unfocusCloseButton() {
  document.querySelector(".modal-button").focus();
}

//Validar el formulario antes de enviar la norificación
function validateForm(e) {
  e.preventDefault();
  //Etiquetas input de formulario
  const nameField = document.getElementById("nombre");
  const emailField = document.getElementById("correo");
  const messageField = document.getElementById("mensaje");
  //Etiquetas span de error
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  //Se generan mensajes de error si los campos están vacios
  if (nameField.value === "") {
    nameError.textContent = "Debes llenar el campo con un nombre";
  }
  if (emailField.value === "") {
    emailError.textContent = "Debes llenar el campo con un email";
  }
  if (messageField.value === "") {
    messageError.textContent = "Debes llenar el campo con un mensaje";
  }
  //Se valida que los campos tengan datos
  if (
    nameField.value !== "" &&
    emailField.value !== "" &&
    messageField.value !== ""
  ) {
    showNotification();
  }
}

/** Esta funcion se llama cuando la persona hace click en el boton de enviar del formulario de contacto */
function showNotification() {
  const noti = document.querySelector(".notification");
  noti.style.display = "flex";
  noti.textContent = "El formulario fue enviado sin errores";
  setTimeout(function () {
    document.querySelector(".notification").style.display = "none";
  }, 3000);
}

//Cerrar mensajes de error al hacer click sobre un input
function closeErrorName() {
  const nameError = document.getElementById("name-error");
  if (nameError.textContent !== "") {
    nameError.textContent = "";
  }
}
function closeErrorEmail() {
  const emailError = document.getElementById("email-error");
  if (emailError.textContent !== "") {
    emailError.textContent = "";
  }
}
function closeErrorMessage() {
  const messageError = document.getElementById("message-error");
  if (messageError.textContent !== "") {
    messageError.textContent = "";
  }
}
