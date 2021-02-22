/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/*                               Form                               */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

const form = document.getElementById('contact-form__form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get submitted data
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const msg = document.getElementById('msg').value;

  // Check reCaptcha score
  grecaptcha.ready(function () {
    grecaptcha
      .execute('6LfEYEUaAAAAAJR_DvIaoSATBg9JW2X6f0PCFdRY', { action: 'submit' })
      .then(function (token) {
        // Create payload
        const options = {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            msg: msg,
            token: token,
          }),
        };
        // http call
        fetch('/enquiry-form', options)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            const sudmittedMsgSuccess = document.getElementsByClassName('submit-success')[0];
            const sudmittedMsgFail = document.getElementsByClassName('submit-fail')[0];
            if (res.status === 'success') {
              sudmittedMsgSuccess.classList.toggle('no-display');
            } else {
              sudmittedMsgFail.classList.toggle('no-display');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
