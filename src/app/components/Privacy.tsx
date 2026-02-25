"use client"

export default function PrivacyPolicy() {
  return (
    <section className="py-28 bg-none" id="privacy">
      <div className="max-w-4xl mx-auto px-6 space-y-12">

        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#0E40C7]">Privacy Policy</h1>
          <p className="mt-4 text-lg text-[#306F7D]">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>

        <div className="space-y-10">

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              1. Information We Collect
            </h2>
            <p className="text-black/70 leading-relaxed">
              We collect information you provide directly to us, such as your name, email, and preferences. We also collect data automatically via cookies and analytics tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-black/70 leading-relaxed">
              Your data is used to improve our services, personalize your experience, communicate updates, and ensure security and compliance with regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              3. Sharing and Disclosure
            </h2>
            <p className="text-black/70 leading-relaxed">
              We do not sell your personal information. We may share data with trusted partners for service delivery and legal compliance only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              4. Your Rights
            </h2>
            <p className="text-black/70 leading-relaxed">
              You can access, correct, or request deletion of your personal data. You may also manage your communication preferences at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              5. Data Security
            </h2>
            <p className="text-black/70 leading-relaxed">
              We implement strong security measures including encryption, secure servers, and restricted access to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              6. Policy Updates
            </h2>
            <p className="text-black/70 leading-relaxed">
              We may update this policy from time to time. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>

        </div>

      </div>
    </section>
  )
}