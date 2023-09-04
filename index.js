let lastActivedElement = null;

window.onload = () => {
  document.querySelector(".arrow-right").addEventListener("click", clickRight);
  document.querySelector(".arrow-left").addEventListener("click", clickLeft);
  document
    .querySelector(".send-button")
    .addEventListener("click", showNotification);
  document.querySelectorAll(".project").forEach((element) => {
    element.addEventListener("click", (e) => openModal(e));
  });
  document.body.addEventListener("click", (e) => closeModal(e));
  document.body.addEventListener("keyup", (e) => pressKey(e));
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

/** Esta funcion se llama cuando la persona hace click en el boton de enviar del formulario de contacto */
function showNotification() {
  document.querySelector(".notification").style.display = "flex";
  setTimeout(function () {
    document.querySelector(".notification").style.display = "none";
  }, 3000);
}

/** Esta funcion se llama cuando la persona hace click en cualquier porjecto del carousel */
function openModal(e) {
  lastActivedElement = document.activeElement;
  console.log(lastActivedElement);
  //Se filtrarán las clases marcadas por el target del click que concuerden con el regex
  const elementClass = e.target.className;
  const regex = /project([1-5]+)|project-img([1-5]+)/;
  const arrayMatch = elementClass.match(regex);
  //Obtenermos la etiqueta img del Modal
  const img = document.querySelector(".modal-project-image");
  //Como el regex puede hacer match con dos opciones, se debe validar que grupo () obtuvo.
  if (arrayMatch[1]) {
    img.src = `images/project${arrayMatch[1]}.png`;
  } else {
    img.src = `images/project${arrayMatch[2]}.png`;
  }
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
  //Si se presiona la tecla ESC cerrará el modal
  if (e.keyCode === 27) {
    closeModal(e);
  }
}

function unfocusCloseButton() {
  console.log("Lo dehó");
  document.querySelector(".modal-button").focus();
}
