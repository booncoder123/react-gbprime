import React, { useState } from "react";
import CryptoJS from "crypto-js";

import dotenv from "dotenv";

function MobileBankingForm() {
  const [checksum, setChecksum] = useState("");

  function genChecksum() {
    var elements = document.getElementsByName("bankCode");
    var bankCode = "";
    for (var i = 0, l = elements.length; i < l; i++) {
      if (elements[i].checked) {
        bankCode = elements[i].value;
      }
    }
    var hash = CryptoJS.HmacSHA256(
      document.getElementsByName("amount")[0].value +
        document.getElementsByName("referenceNo")[0].value +
        document.getElementsByName("responseUrl")[0].value +
        document.getElementsByName("backgroundUrl")[0].value +
        bankCode,
      process.env.REACT_APP_GBPRIME_PRIVATE_KEY
    );

    setChecksum(hash);
  }

  return (
    <div>
      <form
        id="mobileBankingform"
        action="https://api.gbprimepay.com/v2/mobileBanking"
        method="POST"
      >
        <input
          type="hidden"
          name="publicKey"
          value={process.env.REACT_APP_GBPRIME_PUBLIC_KEY}
        />
        <input type="hidden" name="customerTelephone" value="0945462171" />
        <input type="hidden" name="referenceNo" value="pecgo123" />
        <input type="hidden" name="backgroundUrl" value="www.pecgo.com" />
        <input type="hidden" name="responseUrl" value="www.pecgo.com" />
        <label>Amount: </label>
        <input
          type="number"
          name="amount"
          maxLength="13"
          placeholder="Amount"
          defaultValue="1.00"
        />
        <div>
          <label>Bank Code: </label>
          <input type="radio" name="bankCode" value="004" defaultChecked />{" "}
          kBank
          <input type="radio" name="bankCode" value="014" /> SCB
          <input type="radio" name="bankCode" value="025" /> Krungsri
          <input type="radio" name="bankCode" value="002" /> BBL
          <input type="radio" name="bankCode" value="006" /> Krungthai
        </div>
        <input type="hidden" name="detail" placeholder="Detail" value="123" />
        <input type="hidden" name="customerName" value="chanok" />
        <input
          type="hidden"
          name="customerEmail"
          value="pecgo.chanok@gmail.com"
        />
        <input type="hidden" name="customerAddress" value="99/3" />
        <input
          type="hidden"
          name="merchantDefined1"
          value="{merchantDefined1}"
        />
        <input
          type="hidden"
          name="merchantDefined2"
          value="{merchantDefined2}"
        />
        <input
          type="hidden"
          name="merchantDefined3"
          value="{merchantDefined3}"
        />
        <input
          type="hidden"
          name="merchantDefined4"
          value="{merchantDefined4}"
        />
        <input
          type="hidden"
          name="merchantDefined5"
          value="{merchantDefined5}"
        />
        <div>
          <label>Checksum: </label>
          <input type="text" name="checksum" value={checksum} readOnly />
          <input
            type="button"
            onClick={genChecksum}
            value="Generate Checksum"
          />
        </div>
        <div>
          <button type="submit">Pay</button>
        </div>
      </form>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/hmac-sha256.min.js"></script>
    </div>
  );
}

export default MobileBankingForm;
