import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleVerification = () => {
    if (verificationCode === "karanjan123570") {
      setIsVerified(true);
      toast({
        title: "Verified Successfully",
        description: "You can now view the contact information.",
      });
    } else {
      toast({
        title: "Verification Failed",
        description: "Please enter the correct verification code.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24">
      <motion.div
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Get In Touch</h2>
          <p className="text-muted-foreground mt-4">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <CardContent className="p-6 space-y-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full mb-4">
                    {isVerified ? (
                      <>
                        <Unlock className="mr-2 h-4 w-4" />
                        Contact Information Visible
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Verify to View Contact Info
                      </>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Verify Your Identity</DialogTitle>
                    <DialogDescription>
                      Enter verification code to view contact information.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <Input
                      type="text"
                      placeholder="Enter verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <Button onClick={handleVerification} className="w-full">
                      Verify
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {isVerified ? (
                <>
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:abhishek123570@gmail.com" className="hover:text-primary transition-colors">
                      abhishek123570@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href="tel:+919631480320" className="hover:text-primary transition-colors">
                      +91 96314 80320
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <Mail className="h-5 w-5" />
                    <span>Email hidden - Verify to view</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <Phone className="h-5 w-5" />
                    <span>Phone hidden - Verify to view</span>
                  </div>
                </>
              )}
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Gurgaon, India</span>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <Button
              type="submit"
              className="w-full"
              disabled={contactMutation.isPending}
            >
              <Send className="mr-2 h-4 w-4" />
              {contactMutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}