"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */
type FormData = {
  agencyName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
  website: string;
};

/* ---------------- VALIDATION CONSTANTS ---------------- */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRONG_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

/* ---------------- COMPONENT ---------------- */
export default function AgentSignup() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    agencyName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    password: "",
    website: "",
  });

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* ---------------- AUTO USERNAME ---------------- */
  useEffect(() => {
    if (form.agencyName) {
      const clean = form.agencyName.replace(/\s+/g, "").toLowerCase();
      const randomNum = Math.floor(100 + Math.random() * 900);
      setUsername(`${clean}@A${randomNum}`);
    } else {
      setUsername("");
    }
  }, [form.agencyName]);

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  /* ---------------- PASSWORD BLUR VALIDATION ---------------- */
  const handlePasswordBlur = () => {
    if (!form.password) return;

    if (!STRONG_PASSWORD.test(form.password)) {
      setError("Not a strong password");
    } else {
      setError((prev) =>
        prev === "Not a strong password" ? "" : prev
      );
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.agencyName ||
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.password
    ) {
      setError("All mandatory fields must be filled");
      return;
    }

    if (!EMAIL_REGEX.test(form.email)) {
      setError("Invalid email format");
      return;
    }

    if (!STRONG_PASSWORD.test(form.password)) {
      setError("Not a strong password");
      return;
    }

    setError("");
    setSuccess(true);
    alert("Registered successfully!");
    router.push("/");
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white max-w-2xl w-full rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex bg-blue-100">
          <img
            src="/images/agent-signup.jpg.jpeg"
            alt="Agent Signup"
            className="w-full h-full object-cover max-h-[640px]"
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-8 space-y-2 text-xs">
          <h2 className="text-2xl font-semibold text-blue-700">
            Agent / Agency Signup
          </h2>

          {/* TOP ERROR MESSAGE (Supplier Style) */}
          {error && (
            <div
              role="alert"
              className="bg-red-100 border border-red-400 px-4 py-2 rounded-md font-medium"
              style={{ color: "#b91c1c" }}
            >
              {error}
            </div>
          )}

          {success && (
            <p className="bg-green-100 text-green-700 px-4 py-2 rounded">
              Registration successful!
            </p>
          )}

          {/* AGENCY NAME */}
          <Input
            label="Agency Name *"
            name="agencyName"
            onChange={handleChange}
          />

          {/* OWNER NAME */}
          <Input label="First Name *" name="firstName" onChange={handleChange} />
          <Input label="Middle Name" name="middleName" onChange={handleChange} />
          <Input label="Last Name *" name="lastName" onChange={handleChange} />

          {/* EMAIL */}
          <Input
            label="Email *"
            name="email"
            onChange={handleChange}
            tooltip="Enter a valid email address (example: name@company.com)"
          />

          {/* PHONE */}
          <div className="flex flex-col">
            <label className="font-medium text-xs mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex border rounded bg-white h-[34px]">
              <select
                name="countryCode"
                onChange={handleChange}
                className="px-2 text-xs bg-transparent border-r outline-none"
              >
                <option value="+91">IN +91</option>
                <option value="+1">US +1</option>
                <option value="+44">UK +44</option>
              </select>
              <input
                name="phone"
                onChange={handleChange}
                className="flex-1 px-2 text-xs outline-none"
              />
            </div>
          </div>

          {/* USERNAME */}
          <Input label="Username" value={username} readOnly />

          {/* PASSWORD */}
          <Input
            type="password"
            label="Password *"
            name="password"
            onChange={handleChange}
            onBlur={handlePasswordBlur}
            tooltip="Min 8 char, at least one uppercase letter, one lowercase letter, one number, and one special char."
          />

          {/* WEBSITE */}
          <Input label="Website (Optional)" name="website" onChange={handleChange} />

          {/* BUTTONS */}
          <div className="flex gap-4 pt-6 justify-center">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-2 rounded-full"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-2 rounded-full"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- INPUT COMPONENT ---------------- */
function Input({
  label,
  tooltip,
  ...props
}: {
  label: string;
  tooltip?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const isRequired = label.includes("*");

  return (
    <div className="flex flex-col">
      <label className="font-medium text-xs mb-1 flex items-center">
        {label.replace("*", "")}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
        {tooltip && (
          <span
            title={tooltip}
            className="ml-2 text-blue-600 text-xs cursor-help"
          >
            ⓘ
          </span>
        )}
      </label>
      <input {...props} className="border rounded px-2 py-1.5 text-xs" />
    </div>
  );
}
