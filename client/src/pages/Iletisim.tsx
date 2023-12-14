import { NavbarComponent } from "../components/Navbar";
import { Button, Footer, Label, TextInput, Textarea } from "flowbite-react";

import { HiMail } from "react-icons/hi";

export const Iletisim = () => {
  return (
    <>
      <NavbarComponent />

      <main className="max-w-2xl mx-auto my-[5rem] pb-10 text-black dark:text-white p-3">
        <div className="font-bold flex flex-col gap-6">
          <span className="text-5xl">İletişim</span>
          <p>
            Bir sorunuz ya da öneriniz mi var? Bizimle iletişime geçin!
            Aşağıdaki iletişim bilgilerini kullanarak çekinmeden bize ulaşın
            veya formu kullanarak mail gönderin.
          </p>

          <hr />
          <section className="flex justify-center gap-10 text-xl my-5 text-center">
            <a
              href="https://www.instagram.com/haloidergisi/"
              className="flex flex-col"
            >
              <i className="fa-brands fa-instagram me-2 text-3xl"></i>
              @haloidergisi
            </a>

            <a
              href="mailto:haloidergisipau@gmail.com"
              className="flex flex-col"
            >
              <i className="fa-solid fa-envelope me-2 text-3xl"></i>
              haloide
            </a>
          </section>
          <hr />
          <section className="">
            <form action="mailto:haloidergisipau@gmail.com" method="post">
              <div className="max-w-md mb-3">
                <div className="mb-2 block">
                  <Label htmlFor="subject" value="Konu" />
                </div>
                <TextInput
                  id="subject"
                  name="subject"
                  type="text"
                  minLength={10}
                  icon={HiMail}
                  placeholder="Bir önerim var!"
                  required
                />
              </div>

              <div className="max-w-md mb-3">
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Mesajınız" />
                </div>
                <Textarea
                  id="body"
                  name="body"
                  placeholder="Mesajınız"
                  minLength={30}
                  required
                  rows={4}
                  className="p-3"
                />
              </div>
              <Button type="submit">Gönder</Button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};
