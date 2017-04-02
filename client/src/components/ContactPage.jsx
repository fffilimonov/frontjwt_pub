import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const ContactPage = () => (
  <Card className="container">
    <CardTitle title="Likeuser.com" subtitle="Test web like user." />
    <CardText>
      Address: Cyprus Limassol Chrysi Demetriadi 9 204 3106<br/>
      Phone: +35796900653<br/>
      Email: admin@likeuser.com<br/>
    </CardText>
  </Card>
);

export default ContactPage;
