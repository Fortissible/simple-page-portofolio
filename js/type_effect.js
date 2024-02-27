document.addEventListener('DOMContentLoaded', function() {
  // Text to be typed
  const textToType = "Hello, I'm Fortissible!";

  // Select the typing text element
  const typingText = document.getElementById('hello-name');

  // Function to simulate typing effect
  function typeText() {
    typingText.textContent = "> "; // Clear existing text

    for (let i = 0; i < textToType.length; i++) {
      setTimeout(function() {
        typingText.textContent += textToType[i];
      }, i * 25); // Adjust the speed by changing the multiplier
    }
  }

  // Call the function to start the typing effect
  typeText();
});