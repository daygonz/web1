// This is your Stripe public key; replace it with your actual Stripe public key
const stripePublicKey = 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXX';

// Initialize Stripe and Elements
const stripe = Stripe(stripePublicKey);
const elements = stripe.elements();

// Customize your Elements here based on your website's theme
const style = {
  base: {
    color: "#32325d",
  }
};

// Create an instance of the card Element and add it to the 'card-element' div
const card = elements.create('card', {style: style});
card.mount('#card-element');

// Handle real-time validation errors from the card Element
card.on('change', ({error}) => {
  const displayError = document.getElementById('card-errors');
  if (error) {
    displayError.textContent = error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {token, error} = await stripe.createToken(card);

  if (error) {
    // Inform the user if there was an error
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = error.message;
  } else {
    // Send the token to your server
    stripeTokenHandler(token);
  }
});

// Submit the token and the rest of your form to your server
function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  const form = document.getElementById('payment-form');
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}
