import React from "react";
import QRcodeScan from "qrcode.react";
const Qr = () => {
  return (
    <div style={{ marginTop: "12px" }}>
      welcome to qr
      <QRcodeScan value="http://facebook.github.io/react/" size={150} />
     </div>
  );
};

export default Qr;
