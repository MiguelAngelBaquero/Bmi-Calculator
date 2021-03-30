//variables definition
//modal
const modalContainer = document.querySelector(".modal");
//icons
const iconInfo = document.querySelector(".header__nav-bar__icon"),
  iconClose = document.querySelector(".modal__icon");
//buttons
const buttonCloseModal = document.querySelector(".modal__close-buton");
//radio
const radioMetricHeight = document.getElementById("metric-height"),
  radioImperialHeight = document.getElementById("imperial-height"),
  radioMetricWeight = document.getElementById("metric-weight"),
  radioImperialWeight = document.getElementById("imperial-weight");
//input
const inputCmFt = document.getElementById("height-cm-ft"),
  inputInches = document.getElementById("height-in"),
  inputKgLb = document.getElementById("weight-kg-lb");
//labels
const labelCmFt = document.querySelector(".input__container-cm-ft__label"),
  labelInches = document.querySelector(".input__container-in__label"),
  labelKgLb = document.querySelector(".input__container-kg-lb__label");
//output
const bmiTag = document.querySelector(
    ".output__container__bmi-container_bmi-tag"
  ),
  outputBmiValue = document.querySelector(
    ".output__container__bmi-container_bmi-value"
  );
//constants
const MIN_CM_VALUE = 30,
  MAX_CM_VALUE = 275,
  MIN_KG_VALUE = 1,
  MAX_KG_VALUE = 225,
  MIN_LB_VALUE = 3,
  MAX_LB_VALUE = 500,
  MIN_IN_VALUE = 0,
  MAX_IN_VALUE = 11.99,
  MIN_FT_VALUE = 1,
  MAX_FT_VALUE = 9,
  IN_TO_CM_FACTOR = 2.54,
  LB_TO_KG_FACTOR = 2.205,
  FT_TO_IN_FACTOR = 12,
  CM_TO_M_FACTOR = 100,
  MIN_BMI_VALUE = 18.5,
  NORMAL_BMI_VALUE = 25;
//aditional variables
var mass = 0,
  height = 0,
  bmi = 0,
  isHeightMetric = true,
  isWeightMetric = true;
//radio input change
radioMetricHeight.addEventListener("change", (event) => {
  isHeightMetric = true;
  labelCmFt.textContent = `cm ${event.target.value.replace("on", "")}`;
  inputInches.removeAttribute("required");
  inputInches.style.display = "none";
  labelInches.style.display = "none";
  inputCmFt.setAttribute("min", MIN_CM_VALUE);
  inputCmFt.setAttribute("max", MAX_CM_VALUE);
});
radioImperialHeight.addEventListener("change", (event) => {
  isHeightMetric = false;
  labelCmFt.textContent = `ft ${event.target.value.replace("on", "")}`;
  inputInches.setAttribute("required", "");
  labelInches.style.display = "inline";
  inputInches.style.display = "inline-block";
  inputCmFt.setAttribute("min", MIN_FT_VALUE);
  inputCmFt.setAttribute("max", MAX_FT_VALUE);
});
radioMetricWeight.addEventListener("change", (event) => {
  isWeightMetric = true;
  labelKgLb.textContent = `kg ${event.target.value.replace("on", "")}`;
  inputKgLb.setAttribute("min", MIN_KG_VALUE);
  inputKgLb.setAttribute("max", MAX_KG_VALUE);
});
radioImperialWeight.addEventListener("change", (event) => {
  isWeightMetric = false;
  labelKgLb.textContent = `lb ${event.target.value.replace("on", "")}`;
  inputKgLb.setAttribute("min", MIN_LB_VALUE);
  inputKgLb.setAttribute("max", MAX_LB_VALUE);
});

//change BMI tag according to the BMI value
function changeBmiTagAndValue() {
  outputBmiValue.textContent = bmi;
  if (bmi < 18.5) {
    bmiTag.textContent = "Underweight";
  } else if (bmi > MIN_BMI_VALUE && bmi <= NORMAL_BMI_VALUE) {
    bmiTag.textContent = "Normal";
  } else if (bmi > NORMAL_BMI_VALUE) {
    bmiTag.textContent = "Overweight";
  }
  return bmiTag.textContent;
}

//validation process
function submitData() {
  if (validateHeight() && validateMass()) {
    defineHeight();
    defineMass();
    calculateAfterValidation();
  } else {
    console.log("Incorrect data input");
  }
}

//final calculation if everyting is ok
function calculateAfterValidation() {
  calculateBmi(mass, height);
  changeBmiTagAndValue();
}

//validate height input data is right
function validateHeight() {
  let heightValidation;
  if (isHeightMetric) {
    parseFloat(inputCmFt.value) >= MIN_CM_VALUE &&
    parseFloat(inputCmFt.value) <= MAX_CM_VALUE
      ? (heightValidation = true)
      : (heightValidation = false);
  } else {
    parseFloat(inputCmFt.value) >= MIN_FT_VALUE &&
    parseFloat(inputCmFt.value) <= MAX_FT_VALUE &&
    parseFloat(inputInches.value) >= MIN_IN_VALUE &&
    parseFloat(inputInches.value) <= MAX_IN_VALUE
      ? (heightValidation = true)
      : (heightValidation = false);
  }
  return heightValidation;
}

//validate weight input data is right
function validateMass() {
  let weightValidation;
  if (isWeightMetric) {
    parseFloat(inputKgLb.value) >= MIN_KG_VALUE &&
    parseFloat(inputKgLb.value) <= MAX_KG_VALUE
      ? (weightValidation = true)
      : (weightValidation = false);
  } else {
    parseFloat(inputKgLb.value) >= MIN_LB_VALUE &&
    parseFloat(inputKgLb.value) <= MAX_LB_VALUE
      ? (weightValidation = true)
      : (weightValidation = false);
  }
  return weightValidation;
}

//calculate BMI
function calculateBmi(mass, height) {
  const result = mass / Math.pow(height, 2);
  bmi = roundDecimalNumbers(result, 1);
  return bmi;
}

//round numbers
const roundDecimalNumbers = (number, decimalPlaces) =>
  Math.round(number * Math.pow(10, decimalPlaces)) /
  Math.pow(10, decimalPlaces);

//Units convertion
const convertInToCm = (incheValue) => incheValue * IN_TO_CM_FACTOR;
const convertLbToKg = (lbValue) => lbValue / LB_TO_KG_FACTOR;
const convertCmToM = (cmValue) => cmValue / CM_TO_M_FACTOR;
const convertFtToIn = (ftValue) => ftValue * FT_TO_IN_FACTOR;

//get height from data input
function defineHeight() {
  if (!isHeightMetric) {
    const ftValue = parseFloat(inputCmFt.value);
    const incheValue = parseFloat(inputInches.value);
    const totalInches = convertFtToIn(ftValue) + incheValue;
    height = convertCmToM(convertInToCm(totalInches));
  } else {
    const cmValue = parseFloat(inputCmFt.value);
    height = convertCmToM(cmValue);
  }
  return height;
}

//get weight from data input
function defineMass() {
  if (!isWeightMetric) {
    const lbValue = parseFloat(inputKgLb.value);
    mass = convertLbToKg(lbValue);
  } else {
    mass = parseFloat(inputKgLb.value);
  }
  return mass;
}

//show modal
iconInfo.addEventListener("click", (event) => {
  modalContainer.style.display = "block";
  iconClose.addEventListener("click", hideModal);
  buttonCloseModal.addEventListener("click", hideModal);
});

//hide modal
function hideModal(action) {
  iconClose.removeEventListener("click", hideModal);
  buttonCloseModal.removeEventListener("click", hideModal);
  modalContainer.style.display = "none";
}