  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var err = urlParams.get("err");
  if(err) {
    const gendiv = document.getElementById("idkbox")
    const errdiv = document.createElement("div");
    errdiv.className = "alert alert-warning"
    errdiv.textContent = err
    errdiv.role = "alert"
    gendiv.appendChild(errdiv);
  }
