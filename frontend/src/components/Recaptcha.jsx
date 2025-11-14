import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Recaptcha = forwardRef(({ onVerify, onExpire, onError }, ref) => {
  const recaptchaRef = useRef(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    },
    execute: () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.execute();
      }
    },
    getValue: () => {
      if (recaptchaRef.current) {
        return recaptchaRef.current.getValue();
      }
      return null;
    }
  }));

  const handleVerify = (token) => {
    console.log('✅ reCAPTCHA verified:', token ? 'Success' : 'Failed');
    if (onVerify) {
      onVerify(token);
    }
  };

  const handleExpire = () => {
    console.log('⏰ reCAPTCHA expired');
    if (onExpire) {
      onExpire();
    }
  };

  const handleError = (error) => {
    console.error('❌ reCAPTCHA error:', error);
    if (onError) {
      onError(error);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LcoxgwsAAAAAHGVP1X_beZO0EgAqoIbnibXCvXB"
        onChange={handleVerify}
        onExpired={handleExpire}
        onErrored={handleError}
        theme="light"
        size="normal"
      />
    </div>
  );
});

Recaptcha.displayName = 'Recaptcha';

export default Recaptcha;
