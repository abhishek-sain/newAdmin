// Login Function (JWT Authentication)
async function validateLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var errorMsg = document.getElementById("error-msg");
  var modalContent = document.querySelector(".modal-content");

  try {
    const response = await fetch(
      "https://admin-backend-wbbc.onrender.com/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Store Token & Set Session
      localStorage.setItem("token", data.token);
      sessionStorage.setItem("isLoggedIn", "true");

      // Redirect to Dashboard or Another Page
      window.location.href = "Home.html";
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorMsg.innerText = error.message;
    errorMsg.style.display = "block"; // Show error message
    //   modalContent.classList.add("shake"); // Apply shake effect

    // Remove shake effect after animation
    //   setTimeout(() => modalContent.classList.remove("shake"), 500);
  }
}

