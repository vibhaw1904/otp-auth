import { useState } from "react";
import "./App.css";
import { MdAccountCircle } from "react-icons/md";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

function App() {

  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="otp">
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {user ? (
        <h2 className="login">
          👍Login Success
        </h2>
      ) : (
        <div className="middle" >
         
          {showOTP ? (
            <>
              <div className="otp1">
              <MdAccountCircle size={40}/>
              </div>
              <label
                htmlFor="otp"
                className="phn"
              >
                Enter your OTP
              </label>
             <div className="otpinput">
             <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                // className="opt-container "
              ></OtpInput>
             </div>
              
              <button
                onClick={onOTPVerify}
                className="button2"
              >
                {loading && (
                  <CgSpinner size={20} className="spinner" />
                )}
                <span>Verify OTP</span>
              </button>
            </>
          ) : (
            <>
              <div className="otp1">
                <MdAccountCircle size={40} />
              </div>
              <label
                htmlFor=""
                className="phn"
              >
                Verify your phone number
              </label>
              <div className="phoneinput"> 
              <PhoneInput country={"in"} value={ph} onChange={setPh} />

              </div>
              <button
                onClick={onSignup}
                className="button2"
              >
                {loading && (
                  <CgSpinner size={20} className="spinner" />
                )}
                <span>Send code via SMS</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  </section>
  );
}

export default App;
