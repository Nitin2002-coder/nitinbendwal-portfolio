import {
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.email.trim()) {
      toast({
        title: "Email is required",
        variant: "destructive"
      });
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({
        title: "Invalid email format",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.message.trim() || formData.message.length < 10) {
      toast({
        title: "Message must be at least 10 characters",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xwpbojaj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent! 🎉",
          description: "I'll get back to you within 24 hours.",
          variant: "success",
          className: "bg-green-600 text-white dark:bg-green-500 border border-green-700 shadow-lg"
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or email me directly at nitinbendwal030@gmail.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-14 px-4 sm:px-6 relative bg-background">
      <div className="container mx-auto max-w-[1280px]">
        <div className="text-center mb-8 space-y-2">
          <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-primary/10 text-primary mb-2">
            Let's Connect
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Get In Touch
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Contact Information */}
          <div className="space-y-4 p-5 rounded-2xl bg-gradient-to-br from-secondary/20 to-background border border-border">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-primary"></span>
              Contact Details
            </h3>

            <div className="space-y-2.5">
              <div className="flex items-center gap-3 sm:gap-4 p-2.5 hover:bg-accent/30 rounded-xl transition-all duration-300">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                  <a
                    href="mailto:nitinbendwal030@gmail.com"
                    className="text-sm sm:text-base font-medium hover:text-primary transition-colors"
                  >
                    nitinbendwal030@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 p-2.5 hover:bg-accent/30 rounded-xl transition-all duration-300">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                  <a
                    href="tel:+919399365343"
                    className="text-sm sm:text-base font-medium hover:text-primary transition-colors"
                  >
                    +91 9399365343
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 p-2.5 hover:bg-accent/30 rounded-xl transition-all duration-300">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                  <span className="text-sm sm:text-base font-medium">
                    Indore, India
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-1 text-left">
              <h4 className="font-medium mb-2 text-xs sm:text-sm text-muted-foreground">Find me on</h4>
              <div className="flex justify-start gap-2 sm:gap-3">
                {[
                  {
                    icon: Github,
                    label: "GitHub",
                    url: "https://github.com/Nitin2002-coder",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    url: "https://www.linkedin.com/in/nitin-bendwal-222382278",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    url: "mailto:nitinbendwal030@gmail.com",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-accent hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-primary"></span>
              Send Me a Message
            </h3>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs sm:text-sm font-medium text-muted-foreground"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs sm:text-sm font-medium text-muted-foreground"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs sm:text-sm font-medium text-muted-foreground"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project or idea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 text-sm sm:text-base",
                  isSubmitting && "opacity-80 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} className="sm:size-[18px]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
