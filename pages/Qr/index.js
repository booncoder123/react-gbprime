const Test = () => {
  return (
    <div>
      <form
        name="form"
        action="https://api.gbprimepay.com/v3/qrcode"
        method="POST"
      >
        <input
          type="hidden"
          name="token"
          value={process.env.REACT_APP_GBPRIME_TOKEN}
        ></input>
        <input
          type="text"
          name="publicKey"
          value={process.env.REACT_APP_GBPRIME_PUBLIC_KEY}
        />

        <input type="text" name="referenceNo" value="231003084725110" />
        <input type="hidden" name="backgroundUrl" value="www.pecgo.com" />
        <input
          type="number"
          name="amount"
          maxlength="13"
          placeholder="Amount"
          value="100.00"
        />
        <br />
        <input id="button" type="submit" value="Pay Now" />
      </form>
    </div>
  );
};
export default Test;
