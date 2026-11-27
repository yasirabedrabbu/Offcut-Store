export const metadata = { title: 'Contact | Offcut' };

export default function Contact() {
  return (
    <section className="wrap">
      <h1 className="h1">Contact</h1>
      <p className="sub">Questions about an order or a drop? Send a note.</p>
      <form className="form" action="mailto:hello@example.com" method="post" encType="text/plain">
        <input name="name" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <textarea name="message" placeholder="Message" required />
        <button className="btn ui" type="submit">Send</button>
      </form>
    </section>
  );
}