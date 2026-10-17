import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  MapPin,
  UserRound,
} from "lucide-react";

const STEPS = [
  { label: "Personal info", description: "Tell us who you are", icon: UserRound },
  { label: "Your address", description: "Where can we reach you?", icon: MapPin },
  { label: "Review", description: "Check your details", icon: ClipboardCheck },
];

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  apartment: "",
  city: "",
  region: "",
  postalCode: "",
  country: "",
};

const STEP_FIELDS = [
  ["firstName", "lastName", "email", "phone"],
  ["street", "city", "region", "postalCode", "country"],
];

function validateField(name, value) {
  const trimmed = value.trim();
  if (!trimmed) return "This field is required.";

  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Enter a valid email address.";
  }

  if (name === "phone" && !/^\+?[0-9\s().-]{7,20}$/.test(trimmed)) {
    return "Enter a valid phone number.";
  }

  if (name === "postalCode" && !/^[A-Za-z0-9][A-Za-z0-9\s-]{2,11}$/.test(trimmed)) {
    return "Enter a valid postal or ZIP code.";
  }

  return "";
}

function Field({ id, label, value, onChange, onBlur, error, autoComplete, type = "text" }) {
  return (
    <div className={`field${error ? " field-invalid" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        required
      />
      {error && <span className="field-error" id={`${id}-error`}>{error}</span>}
    </div>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
  }

  function validateStep(stepIndex) {
    const nextErrors = {};
    for (const field of STEP_FIELDS[stepIndex]) {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    }
    setErrors((current) => {
      const updated = { ...current };
      STEP_FIELDS[stepIndex].forEach((field) => delete updated[field]);
      return { ...updated, ...nextErrors };
    });
    return Object.keys(nextErrors).length === 0;
  }

  function goNext(event) {
    event.preventDefault();
    if (step < 2 && validateStep(step)) {
      setStep((current) => current + 1);
    }
  }

  function goBack() {
    setErrors({});
    setStep((current) => Math.max(0, current - 1));
  }

  function submitForm(event) {
    event.preventDefault();
    if (validateStep(1)) setSubmitted(true);
  }

  function startOver() {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStep(0);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="app-shell">
        <header className="site-header">
          <a className="brand" href="/" aria-label="Step by Step home">
            <span className="brand-mark"><Check size={19} /></span>
            <span>step<span className="brand-accent">wise</span></span>
          </a>
          <span className="header-note">A smoother way to get started</span>
        </header>
        <main className="success-card">
          <div className="success-icon"><CheckCircle2 size={34} /></div>
          <p className="eyebrow">FORM COMPLETE</p>
          <h1>Thanks, {values.firstName}!</h1>
          <p className="success-description">
            You’ve completed every step and reviewed your information.
          </p>
          <div className="success-email"><Mail size={17} />{values.email}</div>
          <p className="demo-notice">
            This is a front-end demo. Your information has not been sent or saved.
          </p>
          <button className="primary-button" type="button" onClick={startOver}>
            Start a new form <ArrowRight size={17} />
          </button>
        </main>
        <footer className="page-footer">A clear path, one step at a time.</footer>
      </div>
    );
  }

  const ActiveIcon = STEPS[step].icon;

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Step by Step home">
          <span className="brand-mark"><Check size={19} /></span>
          <span>step<span className="brand-accent">wise</span></span>
        </a>
        <span className="header-note">A smoother way to get started</span>
      </header>

      <main className="wizard-layout">
        <section className="intro">
          <p className="eyebrow">WELCOME — LET’S GET STARTED</p>
          <h1>A few details, <span>one step at a time.</span></h1>
          <p>Complete the form at your own pace. You can go back and edit your answers before submitting.</p>
        </section>

        <section className="wizard-card" aria-label="Multi-step form">
          <nav className="progress-nav" aria-label="Form progress">
            {STEPS.map((item, index) => {
              const StepIcon = item.icon;
              const complete = index < step;
              const current = index === step;
              return (
                <React.Fragment key={item.label}>
                  <div
                    className={`progress-step${current ? " is-current" : ""}${complete ? " is-complete" : ""}`}
                    aria-current={current ? "step" : undefined}
                  >
                    <span className="progress-icon">
                      {complete ? <Check size={17} /> : <StepIcon size={17} />}
                    </span>
                    <span className="progress-label">
                      <strong>{item.label}</strong>
                      <small>{item.description}</small>
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <span className={`progress-connector${complete ? " is-complete" : ""}`} />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          <div className="step-progress" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
            <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>

          <form onSubmit={step === 2 ? submitForm : goNext} noValidate>
            <div className="step-heading">
              <span className="step-heading-icon"><ActiveIcon size={20} /></span>
              <div>
                <p className="step-count">STEP {String(step + 1).padStart(2, "0")} OF 03</p>
                <h2>{step === 0 ? "Personal information" : step === 1 ? "Address details" : "Review your information"}</h2>
                <p>{step === 0 ? "Let’s start with a few details about you." : step === 1 ? "Add the address you’d like us to use." : "Make sure everything looks right before you finish."}</p>
              </div>
            </div>

            {step === 0 && (
              <div className="fields-grid">
                <Field id="firstName" label="First name" value={values.firstName} onChange={updateField} onBlur={handleBlur} error={errors.firstName} autoComplete="given-name" />
                <Field id="lastName" label="Last name" value={values.lastName} onChange={updateField} onBlur={handleBlur} error={errors.lastName} autoComplete="family-name" />
                <Field id="email" label="Email address" type="email" value={values.email} onChange={updateField} onBlur={handleBlur} error={errors.email} autoComplete="email" />
                <Field id="phone" label="Phone number" type="tel" value={values.phone} onChange={updateField} onBlur={handleBlur} error={errors.phone} autoComplete="tel" />
              </div>
            )}

            {step === 1 && (
              <div className="fields-grid">
                <Field id="street" label="Street address" value={values.street} onChange={updateField} onBlur={handleBlur} error={errors.street} autoComplete="address-line1" />
                <Field id="apartment" label="Apartment, suite, etc. (optional)" value={values.apartment} onChange={updateField} autoComplete="address-line2" />
                <Field id="city" label="City or town" value={values.city} onChange={updateField} onBlur={handleBlur} error={errors.city} autoComplete="address-level2" />
                <Field id="region" label="State, province, or region" value={values.region} onChange={updateField} onBlur={handleBlur} error={errors.region} autoComplete="address-level1" />
                <Field id="postalCode" label="ZIP or postal code" value={values.postalCode} onChange={updateField} onBlur={handleBlur} error={errors.postalCode} autoComplete="postal-code" />
                <Field id="country" label="Country" value={values.country} onChange={updateField} onBlur={handleBlur} error={errors.country} autoComplete="country-name" />
              </div>
            )}

            {step === 2 && (
              <div className="review-list">
                <section className="review-section">
                  <div className="review-section-heading">
                    <span className="review-icon"><UserRound size={17} /></span>
                    <h3>Personal information</h3>
                    <button className="edit-button" type="button" onClick={() => setStep(0)}>Edit</button>
                  </div>
                  <div className="review-values">
                    <ReviewValue label="Name" value={`${values.firstName} ${values.lastName}`} />
                    <ReviewValue label="Email" value={values.email} />
                    <ReviewValue label="Phone" value={values.phone} />
                  </div>
                </section>
                <section className="review-section">
                  <div className="review-section-heading">
                    <span className="review-icon"><MapPin size={17} /></span>
                    <h3>Address</h3>
                    <button className="edit-button" type="button" onClick={() => setStep(1)}>Edit</button>
                  </div>
                  <div className="review-values">
                    <ReviewValue label="Street" value={`${values.street}${values.apartment ? `, ${values.apartment}` : ""}`} />
                    <ReviewValue label="City / Region" value={`${values.city}, ${values.region} ${values.postalCode}`} />
                    <ReviewValue label="Country" value={values.country} />
                  </div>
                </section>
                <p className="review-note">
                  This demo does not send or store your information. Submitting shows the completed-form confirmation only.
                </p>
              </div>
            )}

            <div className="form-actions">
              {step > 0 ? (
                <button className="back-button" type="button" onClick={goBack}>
                  <ArrowLeft size={17} /> Back
                </button>
              ) : <span />}
              <button className="primary-button" type="submit">
                {step === 2 ? "Submit form" : "Continue"}
                {step < 2 && <ArrowRight size={17} />}
                {step === 2 && <Check size={17} />}
              </button>
            </div>
          </form>
        </section>

        <p className="privacy-note"><span><Check size={13} /></span> Your details stay in this demo and are not sent to a server.</p>
      </main>

      <footer className="page-footer">A clear path, one step at a time.</footer>
    </div>
  );
}

function ReviewValue({ label, value }) {
  return (
    <div className="review-value">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
