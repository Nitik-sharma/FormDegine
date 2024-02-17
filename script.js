const inputText = document.getElementById("input-btn");
const selectText = document.getElementById("select-btn");
const textArea = document.getElementById("textarea-btn");
const saveBtn = document.getElementById("save-btn");

// Array to store form elements
const formElements = [];

saveBtn.addEventListener("click", () => {
  saveToJson();
});
inputText.addEventListener("click", () => {
  addInputText();
});

selectText.addEventListener("click", () => {
  addSelectInput();
});

textArea.addEventListener("click", () => {
  addTextArea();
});

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  const container = document.getElementById("form-container");
  container.insertBefore(draggedElement, event.target);
}

// Function for add input text
const addInputText = () => {
  var inputElement = document.createElement("input");

  inputElement.classList.add("input-box");
  inputElement.type = "text";
  inputElement.name = "dynamic-input";
  inputElement.placeholder = "Sample Placeholder";
  inputElement.id = generateId();
  inputElement.draggable = true;
  inputElement.ondragstart = function (event) {
    event.dataTransfer.setData("text/plain");
    event.dataTransfer.setData("text", inputElement.type);
  };

  var label = document.createElement("label");
  label.innerHTML = "Simple label";

  const divElement = createContainer();
  divElement.appendChild(label);
  divElement.appendChild(inputElement);

  saveElementDetails(divElement);
};

// Function to add select Input
const addSelectInput = () => {
  var selectElement = document.createElement("select");

  selectElement.classList.add("select");
  selectElement.id = generateId();
  selectElement.draggable = true;
  selectElement.ondragstart = function (event) {
    event.dataTransfer.setData("text/plain");
    event.dataTransfer.setData("text", selectElement.type);
  };

  for (let i = 1; i <= 3; i++) {
    const option = document.createElement("option");
    option.text = "Sample Option" + i;
    selectElement.appendChild(option);
  }

  const label = document.createElement("label");
  label.innerHTML = "Select";

  const container = createContainer();
  container.appendChild(label);
  container.appendChild(selectElement);

  saveElementDetails(container);
};

const addTextArea = () => {
  const textArea = document.createElement("textarea");

  textArea.id = generateId();
  textArea.name = "w3review";
  textArea.rows = "4";
  textArea.cols = "100";
  textArea.placeholder = "Sample Placeholder";
  textArea.draggable = true;
  textArea.ondragstart = function (event) {
    event.dataTransfer.setData("text/plain");
    event.dataTransfer.setData("text", textArea.type);
  };

  const label = document.createElement("label");
  label.innerText = "TextArea";

  const container = createContainer();
  container.appendChild(label);
  container.appendChild(textArea);

  saveElementDetails(container);
};

const createContainer = () => {
  const divElement = document.createElement("div");
  divElement.classList.add("input-text");
  divElement.draggable = true;
  divElement.ondragstart = function (event) {
    event.dataTransfer.setData("text/plain", divElement.id);
  };
  const innerDiv = document.createElement("div");
  innerDiv.classList.add("inner-input-text");
  divElement.appendChild(innerDiv);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  deleteIcon.addEventListener("click", () => {
    divElement.remove();

    removeFromFormElements(divElement);
  });

  divElement.appendChild(deleteIcon);
  document.getElementById("form-container").appendChild(divElement);

  return innerDiv;
};

const saveElementDetails = (container) => {
  const elementType = container.lastChild.tagName.toLowerCase();
  const label = container.firstChild.innerText;
  const id = container.lastChild.id || generateId();

  let elementDetails;

  if (elementType === "select") {
    const options = Array.from(container.lastChild.options).map(
      (option) => option.text
    );
    elementDetails = {
      id: id,
      type: elementType,
      label: label,
      options: options,
    };
  } else {
    const placeholder = container.lastChild.placeholder || "";
    elementDetails = {
      id: id,
      type: elementType,
      label: label,
      placeholder: placeholder,
    };
  }

  formElements.push(elementDetails);
};

const removeFromFormElements = (element) => {
  const elementId = element.firstChild.lastChild.id;
  const index = formElements.findIndex((el) => el.id === elementId);
  if (index !== -1) {
    formElements.splice(index, 1);
  }
};

const generateId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const saveToJson = () => {
  const jsonContent = JSON.stringify(formElements, null, 2);
  console.log(jsonContent);
};

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  const container = event.currentTarget;

  if (draggedElement && container) {
    // Create a clone of the dragged element
    const clonedElement = draggedElement.cloneNode(true);

    // Remove the id attribute to avoid duplicates
    clonedElement.removeAttribute("id");

    // Append the cloned element to the container
    container.appendChild(clonedElement);
  }
}
