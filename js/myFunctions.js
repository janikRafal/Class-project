function storageItemRemove(item) {
  localStorage.removeItem(item);

  for (let i = 0; i < 2; i++) {
    let paraAndBtn = document.getElementById(item);
    paraAndBtn.remove();
  }
}

function checkData(inputID, regex) {
  let element = document.getElementById(inputID);
  if (!regex.test(element.value)) return false;
  else return true;
}

function check() {
  let everythinkGood = true;
  let output = "";

  let visitor = {
    name: "",
    nickname: "",
    email: "",
    periodOfTime: "",
  };

  nameRegex = /^[A-ząćęłńóśźżĄĘŁŃÓŚŹŻ]{3,15}$/;
  nicknameRegex = /^[A-z0-9]{3,20}$/;
  emailRegex = /[a-z0-9.%+-]+@[a-z0-9._-]+\.[a-z]{2,}$/;

  if (!checkData("name", nameRegex)) {
    everythinkGood = false;
    document.getElementById("invalidName").innerHTML = "Wprowadź poprawne imię";
  } else {
    document.getElementById("invalidName").innerHTML = "";
    visitor.name = document.getElementById("name").value;
    console.log(visitor.name);
  }

  if (!checkData("nickname", nameRegex)) {
    everythinkGood = false;
    document.getElementById("invalidNickname").innerHTML =
      "Wprowadź poprawny nick";
  } else {
    document.getElementById("invalidNickname").innerHTML = "";
    visitor.nickname = document.getElementById("nickname").value;
    console.log(visitor.nickname);
  }

  if (!checkData("email", emailRegex)) {
    everythinkGood = false;
    document.getElementById("invalidEmail").innerHTML =
      "Wprowadź poprawny adres email";
  } else {
    document.getElementById("invalidEmail").innerHTML = "";
    visitor.email = document.getElementById("email").value;
    console.log(visitor.email);
  }

  let byeLaws = document.getElementById("bye-laws");
  if (!byeLaws.checked) {
    everythinkGood = false;
    document.getElementById("boxUnchecked").innerHTML =
      "Aby kontynuować, zapoznaj się i zaakceptuj ";

    const container = document.getElementById("boxUnchecked");

    const link = document.createElement("a");
    link.setAttribute("href", "./laws.html");
    link.setAttribute("target", "_blank");
    link.textContent = "regulamin";

    container.appendChild(link);
  } else document.getElementById("boxUnchecked").innerHTML = "";

  if (everythinkGood === true) {
    output =
      "Następujące dane zostaną wysłane:\n\nImię: " +
      document.getElementById("name").value +
      "\n";
    output += "Nick: " + document.getElementById("nickname").value + "\n";
    output += "Adres e-mail: " + document.getElementById("email").value + "\n";

    let radio = document.getElementsByName("periodOfTime");
    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        output +=
          "Mail wysyłany: " +
          radio[i].value +
          "\n\n Potwierdź poprawność danych:";

        visitor.periodOfTime = radio[i].value;
        console.log(visitor.periodOfTime);
      }
    }

    let storageObject = "Object " + localStorage.length;
    localStorage.setItem(storageObject, JSON.stringify(visitor));

    let myLocalData = JSON.parse(localStorage.getItem(storageObject));
    console.log(myLocalData);
    console.log(typeof storageObject);

    const storageContainer = document.getElementById("localStorageContainer");

    const para = document.createElement("p");
    para.textContent = JSON.stringify(myLocalData);
    para.classList.add("d-inline-block");
    para.classList.add("text-truncate");
    para.classList.add("col-12");
    para.style =
      "border: 1px solid rgb(33, 37, 41, 0.25); color: black; padding: 10px";
    para.setAttribute("id", storageObject);

    const button = document.createElement("button");
    button.innerHTML = "X";
    button.classList.add("d-inline-block");
    button.classList.add("btn");
    button.classList.add("btn-danger");
    button.classList.add("col-2");
    button.setAttribute("id", storageObject);
    button.style = "margin-bottom: 16px";
    button.setAttribute("onclick", "storageItemRemove (this.id);");

    storageContainer.appendChild(para);
    storageContainer.appendChild(button);

    if (window.confirm(output)) {
      return output;
    } else return false;
  } else return false;
}
