function sendMail() {
    // Validate form first
    if (!validateForm()) {
        return;
    }

    var params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };
  
    const serviceID = "service_t99dtay";
    const templateID = "template_wu1qa4n";
  
    emailjs.send(serviceID, templateID, params)
      .then(res => {
          console.log(res);
          showFormSuccess();
      })
      .catch(err => {
          console.log(err);
          showFormError('Failed to send message. Please try again later.');
      });
}