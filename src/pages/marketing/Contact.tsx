import React, { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, ArrowRight} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:4000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen contact-page-bg">
        <div className="universal-page-overlay" />
        <div className="universal-moving-gradient" />
        <div className="universal-content">

          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="relative z-10 text-center container-responsive">
              <h1 className="responsive-title font-bold mb-4 sm:mb-6 text-white">
                Contact Us
              </h1>
              <p className="responsive-subtitle text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
                We're here to help! Reach out to us with any questions, feedback, or project inquiries.
              </p>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="section-padding bg-transparent">
            <div className="container-responsive">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                  <form onSubmit={handleSubmit}>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-white">Send us a message</CardTitle>
                      <CardDescription className="text-gray-400">
                        We'll get back to you as soon as possible.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid w-full gap-2">
                        <Label htmlFor="name" className="text-white">Name</Label>
                        <Input
                          type="text"
                          id="name"
                          className="bg-white/5 border-white/10 backdrop-blur-md"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid w-full gap-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                          type="email"
                          id="email"
                          className="bg-white/5 border-white/10 backdrop-blur-md"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid w-full gap-2">
                        <Label htmlFor="message" className="text-white">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Your Message"
                          className="bg-white/5 border-white/10 backdrop-blur-md"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        variant="glass"
                        disabled={status === "sending"}
                      >
                        {status === "sending" ? "Sending..." : "Send Message"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardFooter>
                    {status === "success" && (
                      <p className="text-green-500 text-center mt-2 pb-4">Message sent successfully!</p>
                    )}
                    {status === "error" && (
                      <p className="text-red-500 text-center mt-2 pb-4">{errorMessage}</p>
                    )}
                  </form>
                </Card>

                {/* Contact Information */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">Contact Information</CardTitle>
                    <CardDescription className="text-gray-400">
                      Reach out to us through these channels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-white font-medium">Email</div>
                        {/* <div className="text-gray-400">nextgendevelopers@hotmail.com</div> */}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-white font-medium">Address</div>
                        {/* <div className="text-gray-400">123 Tech Street, Innovation City, USA</div> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
