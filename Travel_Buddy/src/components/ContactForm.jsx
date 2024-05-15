import React, { useState } from "react";
import { Button } from "flowbite-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({ success: '', error: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.url || !formData.message) {
      setFormStatus({ success: '', error: 'All fields are required.' });
      return;
    }

    try {
      const response = await fetch('/api/contact/contactForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus({ success: 'Thanks for filling out the form!', error: '' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        setFormStatus({ success: '', error: 'There was a problem with your submission.' });
      }
    } catch (error) {
      setFormStatus({ success: '', error: 'There was a problem with your submission.' });
    }
  };

  return (
    <div className="">
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl text-center mb-8">
              <h3 className="text-4xl font-bold">Let's Connect</h3>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-xl mx-auto">
              <form className="space-y-6">
                <input
                  type="hidden"
                  name="email"
                  data-form-email="true"
                  value=""
                />
                <div className="space-y-4">
                  <div className="hidden alert alert-success w-full">
                    Thanks for filling out the form!
                  </div>
                  <div className="hidden alert alert-danger w-full">
                    Oops...! some problem!
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="form-group ">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      data-form-field="name"
                      className=" w-full  mx-auto p-3 border rounded text-gray-500 dark:text-white dark:bg-slate-800 g"
                      value={formData.name}
                      onChange={handleChange}
                      id="name-form02-0"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      data-form-field="email"
                      className=" w-full p-3 border rounded text-gray-500 dark:text-white dark:bg-slate-800 "
                      value={formData.email}
                      onChange={handleChange}
                      id="email-form02-0"
                    />
                  </div>
                  <div className="form-group col-span-2 ">
                    <input
                      type="phone"
                      name="phone"
                      placeholder="Phone"
                      data-form-field="phone"
                      className=" w-full p-3 border rounded  text-gray-500 dark:text-white dark:bg-slate-800 "
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-span-2">
                    <textarea
                      name="textarea"
                      placeholder="Message"
                      data-form-field="textarea"
                      className=" w-full p-3 border rounded text-gray-500 dark:text-white dark:bg-slate-800 "
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="form-group col-span-2 flex justify-center w-full ">
                    <Button
                      type="submit"
                      className=""
                      gradientDuoTone="purpleToPink"
                      outline
                      onSubmit={handleSubmit}
                    >
                      Start Your Journey
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
