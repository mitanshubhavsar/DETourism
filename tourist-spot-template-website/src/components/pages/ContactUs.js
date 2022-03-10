import React, { useState } from 'react';
import axios from '../../axiosUsers';
import './ContactUs.css';
import Footer from '../Footer';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const clearForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const submitMessage = (e) => {
    e.preventDefault();

    const userMessage = {
      Name: name,
      Email: email,
      Phone: phone,
      message: message,
    };
    axios
      .post('/message.json', userMessage)
      .then((response) => {
        console.log(response);
        clearForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div class="contact" id="contact">
        <div class="violet-overlay">
          <div class="container">
            <h2 class="text-center">Get in touch</h2>
            <div class="contact-form">
              <form>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <input type="submit" value="SEND" onClick={submitMessage} />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
