import React, {
  useState,
  Fragment,
  useContext,
  useEffect,
  useRef,
} from "react";
import AuthContext from "../Store/auth-context";
import Button from "./UI/Button";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { PhoneNumberUtil } from "google-libphonenumber";
import classes from "./PersonalInfo.module.css";

const PersonalInfo = (props) => {
  const ctx = useContext(AuthContext);
  const { userInfo } = ctx;
  const [name, setName] = useState(userInfo.name);
  const [nameIsValid, setNameIsValid] = useState();
  const [email, setEmail] = useState(userInfo.email);
  const [emailIsValid, setEmailIsValid] = useState();
  const [phoneNo, setPhoneNo] = useState(userInfo.phoneNo);
  let phoneNoIsValid;
  const [invalidPhone, setInvalidPhone] = useState();

  const nameRef = useRef();
  const emailRef = useRef();
  // const phoneNoRef = useRef();

  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phone) => {
    try {
      const number = phoneUtil.parseAndKeepRawInput(phone);
      const regionCode = phoneUtil.getRegionCodeForNumber(number);
      return phoneUtil.isValidNumberForRegion(number, regionCode);
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    setNameIsValid(true);
    setEmailIsValid(true);
    setInvalidPhone(false);
  }, []);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const phoneNoChangeHandler = (event) => {
    setPhoneNo(event);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!name) {
      setNameIsValid(false);
      nameRef.current.focus();
      return;
    } else {
      setNameIsValid(true);
    }

    if (!email || !email.includes("@")) {
      setEmailIsValid(false);
      emailRef.current.focus();
      return;
    } else {
      setEmailIsValid(true);
    }

    phoneNoIsValid = isPhoneValid(phoneNo);
    setInvalidPhone(!phoneNoIsValid);

    if (nameIsValid && emailIsValid && phoneNoIsValid) {
      ctx.updateUserInfo({
        name: name,
        email: email,
        phoneNo: phoneNo,
      });
      ctx.updateStep(2);
    }
  };
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.information}>
          <h1>Personal info</h1>
          <p>Please provide your name, email address, and phone number</p>
          <form className={classes["form"]} onSubmit={formSubmitHandler}>
            <div>
              <div>
                <label htmlFor="name">
                  <div>Name</div>
                  {!nameIsValid && <span>This field is required</span>}
                </label>
              </div>
              <input
                ref={nameRef}
                type="text"
                id="name"
                placeholder="e.g. Stephen King"
                required
                onChange={nameChangeHandler}
                value={name}
              />
            </div>
            <div>
              <label htmlFor="email">
                <div>Email Address</div>
                {!emailIsValid && <span>This field is required/Invalid</span>}
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                placeholder="e.g. stephenking@lorem.com"
                required
                onChange={emailChangeHandler}
                value={email}
              />
            </div>
            <div>
              <label htmlFor="number">
                <div>Phone Number</div>
                {invalidPhone && <span>Invalid phone number</span>}
              </label>
              <PhoneInput
                // ref={phoneNoRef}
                className={classes["phone-input"]}
                inputClassName={classes["phone-input-field"]}
                placeholder="Enter Phone Number"
                id="number"
                required
                defaultCountry="ng"
                value={phoneNo}
                onChange={phoneNoChangeHandler}
              />
            </div>
          </form>
        </div>
        <div className={classes.actions}>
          <Button
            title="Next step"
            className={classes["next-btn"]}
            onClick={formSubmitHandler}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(PersonalInfo);
