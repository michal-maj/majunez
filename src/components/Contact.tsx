import type { FC } from "react";

const Contact: FC = () => {
  return (
    <div id="contact">
      <div className="container">
        <div className="section_header">
          <h1>
            <i className="icon-envelope-alt"></i> Napisz do Mnie
          </h1>
        </div>
        <div id="contact_form">
          <div className="row">
            <div className="row contacts">
              <div className="span4">
                <h2>
                  <i className="icon-envelope-alt"></i> Email
                </h2>
                <h4>Napisz email!</h4>
                <h4 className="addresses">
                  <img src="/img/majunez-em.png" alt="Email" />
                </h4>
                <p>
                  Napisz do mnie maila, postaram się odpisać jak najszybciej.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
