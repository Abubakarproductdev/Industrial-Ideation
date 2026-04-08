"use client";

import { useState } from "react";
import MagneticButton from "./MagneticButton";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section-shell section-space relative w-full border-t border-[var(--surface-border)] bg-[var(--background)]">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--accent)]/5 blur-[120px] pointer-events-none"></div>
      
      <div className="section-inner relative z-10">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-16">
          
          <div className="w-full lg:w-1/2">
            <div className="space-y-5 md:space-y-6">
              <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--accent)] font-medium">
                Start A Conversation
              </h2>
              <h3 className="text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
                Let&apos;s Create <br />
                Something <br />
                <span className="text-gradient-accent">Extraordinary.</span>
              </h3>
            </div>
            
            <p className="mt-8 max-w-md text-lg text-gray-400 md:mt-10 md:text-xl">
              Ready to elevate your digital presence? We&apos;re currently accepting new projects for Q3 2026.
            </p>
            
            <div className="mt-10 space-y-6 md:mt-12">
              <div>
                <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-2">Email</h4>
                <a href="mailto:hello@industrialideation.com" className="text-xl hover:text-[var(--accent)] transition-colors">
                  hello@industrialideation.com
                </a>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-2">Location</h4>
                <p className="text-xl text-gray-300">
                  New York, NY <br />
                  Global Operations
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-5/12">
            <form onSubmit={handleSubmit} className="glass flex flex-col gap-8 rounded-3xl p-6 md:p-10 lg:p-12">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-b border-[var(--surface-border)] pb-4 focus:border-white outline-none transition-colors text-lg"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-b border-[var(--surface-border)] pb-4 focus:border-white outline-none transition-colors text-lg"
                  placeholder="john@company.com"
                />
              </div>
              
              <div className="mb-2 flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400">Project Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-b border-[var(--surface-border)] pb-4 focus:border-white outline-none transition-colors text-lg resize-none"
                  placeholder="Tell us about your goals..."
                />
              </div>
              
              <MagneticButton className="group flex w-full items-center justify-center gap-2 bg-white py-4 text-black hover:bg-gray-200">
                {isSubmitting ? (
                   <span className="animate-pulse">Sending...</span>
                ) : isSubmitted ? (
                   <span>Message Sent!</span>
                ) : (
                   <>
                     Send Inquiry
                     <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   </>
                )}
              </MagneticButton>
              
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
