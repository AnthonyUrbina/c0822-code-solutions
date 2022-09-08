var $form = document.querySelector('form');

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  var name = $form.elements.name.value;
  var email = $form.elements.email.value;
  var message = $form.elements.message.value;

  var formData = {
    name,
    email,
    message
  };

  console.log(formData);
  $form.reset();

}
