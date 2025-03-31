document.addEventListener("DOMContentLoaded", () => {
    // Declare Swal if it's not already available globally
    if (typeof Swal === "undefined") {
      console.error("SweetAlert2 is not loaded. Make sure to include it in your HTML.")
      return // Stop execution if Swal is not available
    }
  
    const form = document.querySelector("form")
  
    form.addEventListener("submit", (event) => {
      event.preventDefault()
  
      // Get form values
      const fullName = document.querySelector('input[placeholder="Full Name"]').value.trim()
      const email = document.querySelector('input[placeholder="Email Address"]').value.trim()
      const password = document.querySelector('input[placeholder="Password"]').value
      const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]').value
      const termsChecked = document.getElementById("termsCheck").checked
  
      // Client-side validation
      if (!fullName) {
        showErrorPopup("Please enter your full name")
        return
      }
  
      if (!email) {
        showErrorPopup("Please enter your email address")
        return
      }
  
      if (!isValidEmail(email)) {
        showErrorPopup("Please enter a valid email address")
        return
      }
  
      if (!password) {
        showErrorPopup("Please enter a password")
        return
      }
  
      if (password.length < 8) {
        showErrorPopup("Password must be at least 8 characters long")
        return
      }
  
      if (!confirmPassword) {
        showErrorPopup("Please confirm your password")
        return
      }
  
      if (password !== confirmPassword) {
        showErrorPopup("Passwords do not match")
        return
      }
  
      if (!termsChecked) {
        showErrorPopup("Please agree to the Terms and Conditions")
        return
      }
  
      // If all validations pass, submit to server
      submitFormToServer(fullName, email, password, confirmPassword, termsChecked)
    })
  
    // Helper function to validate email format
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  
    // Function to submit form data to server
    function submitFormToServer(fullName, email, password, confirmPassword, termsChecked) {
      // Show loading state
      Swal.fire({
        title: "Processing...",
        text: "Creating your account",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })
  
      // Create form data
      const formData = new FormData()
      formData.append("fullName", fullName)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("confirmPassword", confirmPassword)
      formData.append("termsChecked", termsChecked ? "1" : "0")
  
      // Send data to server
      fetch("register.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showSuccessPopup(data.message)
          } else {
            showErrorPopup(data.message)
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          showErrorPopup("An error occurred. Please try again later.")
        })
    }
  
    // Function to show error popup
    function showErrorPopup(message) {
      Swal.fire({
        title: "Oops!",
        text: message,
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#A688FA",
        background: "white",
        customClass: {
          popup: "animated-popup",
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      })
    }
  
    // Function to show success popup
    function showSuccessPopup(message = "Your account has been created successfully!") {
      Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#A688FA",
        background: "white",
        customClass: {
          popup: "animated-popup",
        },
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page
          window.location.href = "index.html"
        }
      })
    }
  })
  
  