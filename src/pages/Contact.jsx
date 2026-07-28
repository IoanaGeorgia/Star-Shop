export default function Contact() {
  return (
    <div className="contact" id="contact">
      <p>Contact</p>

      <div className="contact-wrapper">
        <div>Phone:</div>
        <div>0999999999</div>
      </div>

      <div className="contact-wrapper">
        <div>Email:</div>
        <div>stars@andromeda.com</div>
      </div>

      <div className="contact-wrapper">
        <div>Address:</div>
        <div>Longdon Street, Atlanta, Georgia</div>
      </div>

      <div className="form-wrapper">
        <p>Have anything to share with us?</p>
        <p>Leave us a message below:</p>

        <form>
          <label>Name</label>
          <input type="text"></input>

          <label>Last name</label>
          <input type="text"></input>

          <label>Email address:</label>
          <input type="email"></input>

          <label>Your message for us:</label>
          <textarea></textarea>
        </form>
      </div>
    </div>
  );
}
