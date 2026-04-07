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
    <section id="contact" className="py-32 w-full bg-[var(--background)] relative border-t border-[var(--surface-border)]">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--accent)]/5 blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 justify-between">
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--accent)] font-medium mb-6">
              Start A Conversation
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Let's Create <br />
              Something <br />
              <span className="text-gradient-accent">Extraordinary.</span>
            </h3>
            
            <p className="text-xl text-gray-400 mb-12 max-w-md">
              Ready to elevate your digital presence? We're currently accepting new projects for Q3 2026.
            </p>
            
            <div className="space-y-6">
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 glass p-8 md:p-12 rounded-3xl">
              
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
              
              <div className="flex flex-col gap-2 mb-4">
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
              
              <MagneticButton className="w-full bg-white text-black py-4 flex items-center justify-center gap-2 group hover:bg-gray-200">
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
