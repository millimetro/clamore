"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Il nome è obbligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Inserisci un'email valida";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "L'oggetto è obbligatorio";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Il messaggio è obbligatorio";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Il messaggio deve contenere almeno 10 caratteri";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Messaggio inviato con successo! Ti risponderemo presto.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Errore nell'invio del messaggio. Riprova più tardi.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Errore di connessione. Controlla la tua connessione e riprova.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-2 border-black rounded-3xl p-5 md:p-6 lg:p-7 shadow-lg"
    >
      <div className="space-y-4 md:space-y-5">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-black font-apfel font-medium text-sm md:text-base mb-1.5"
          >
            Nome *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 md:px-4 py-2 md:py-3 border-2 border-black rounded-xl bg-cream text-black font-apfel text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-black/20 transition-all ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Il tuo nome"
          />
          {errors.name && (
            <p className="mt-1.5 text-red-600 font-apfel text-xs md:text-sm">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-black font-apfel font-medium text-sm md:text-base mb-1.5"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 md:px-4 py-2 md:py-3 border-2 border-black rounded-xl bg-cream text-black font-apfel text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-black/20 transition-all ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="la.tua.email@esempio.it"
          />
          {errors.email && (
            <p className="mt-1.5 text-red-600 font-apfel text-xs md:text-sm">{errors.email}</p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label
            htmlFor="subject"
            className="block text-black font-apfel font-medium text-sm md:text-base mb-1.5"
          >
            Oggetto *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-3 md:px-4 py-2 md:py-3 border-2 border-black rounded-xl bg-cream text-black font-apfel text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-black/20 transition-all ${
              errors.subject ? "border-red-500" : ""
            }`}
            placeholder="Oggetto del messaggio"
          />
          {errors.subject && (
            <p className="mt-1.5 text-red-600 font-apfel text-xs md:text-sm">{errors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-black font-apfel font-medium text-sm md:text-base mb-1.5"
          >
            Messaggio *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-3 md:px-4 py-2 md:py-3 border-2 border-black rounded-xl bg-cream text-black font-apfel text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-black/20 transition-all resize-y ${
              errors.message ? "border-red-500" : ""
            }`}
            placeholder="Scrivi il tuo messaggio qui..."
          />
          {errors.message && (
            <p className="mt-1.5 text-red-600 font-apfel text-xs md:text-sm">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-5 md:px-6 py-3 md:py-4 border-2 border-black rounded-full bg-black text-cream font-bold font-gambarino text-base md:text-lg lg:text-xl hover:bg-cream hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            isSubmitting ? "cursor-wait" : "cursor-pointer"
          }`}
        >
          {isSubmitting ? "Invio in corso..." : "Invia Messaggio"}
        </button>

        {/* Status Message */}
        {submitStatus.type && (
          <div
            className={`p-3 md:p-4 border-2 border-black rounded-xl ${
              submitStatus.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <p className="font-apfel text-sm md:text-base">{submitStatus.message}</p>
          </div>
        )}
      </div>
    </form>
  );
}

