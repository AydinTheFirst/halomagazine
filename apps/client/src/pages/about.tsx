import { HomeLayout } from "@/layouts/Home/Layout";
import { Divider } from "@nextui-org/react";

export const About = () => {
  return (
    <HomeLayout>
      <main className="container my-10">
        <div className="mx-auto max-w-2xl">
          <span className="border-b pb-3 text-4xl">Hakkımızda</span>
          <Divider className="my-3" />

          <div className="flex flex-col gap-10">
            <section className="flex flex-col gap-3">
              <span className="text-2xl">Halo Edebiyat Dergisi Nedir?</span>
              <p>
                Halo Edebiyat Dergisi, Pamukkale Üniversitesi İngiliz Dili ve
                Edebiyatı bölümünün aylık fikir, sanat ve edebiyat dergisidir.
                Öğrenciler okul dışında birikimlerini sunarak dergimizde
                eserleriyle yer alır ve kendilerini geliştirme fırsatı yakalar.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <span className="text-2xl">Biz Kimiz?</span>
              <p>
                Bizler, Pamukkale Üniversitesi İngiliz Dili ve Edebiyatı bölümü
                öğrencileriyiz. Bölümümüzden esinlenerek her ay sanat ve
                edebiyat konuları çerçevesinde içerikler üretiyor,
                öğrendiklerimizi paylaşıp öğretmeyi ve farkındalık kazandırmayı
                amaçlıyoruz.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <span className="text-2xl">Kimler Katılabilir?</span>
              <p>
                Dergimizin kapıları sadece İngiliz Dili ve Edebiyatı bölümü
                öğrencilerine değil, edebiyata ilgisi olan herkese açıktır! Eğer
                isterseniz her ay yazarlık yapmak için başvurabilir, isterseniz
                konuk yazar olarak başvurabilir ve dergiye arada sırada
                yazabilirsiniz.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <span className="text-2xl">
                Yazar ekibine dahil olmak istiyorum, nasıl başvurabilirim?
              </span>
              <p>İki ayrı yazar grubumuz mevcut:</p>
              <span className="text-xl">1- Kalıcı Yazarlar:</span>
              <p>
                Dergi ekibine dahil olmak isteyen ve her ay yazı yazmaya gönüllü
                olan arkadaşımız öncelikle bizlerle bir aylık bir denemece
                sürecine dahil oluyor. Böylece arkadaşımız burada, dergi nasıl
                işliyor, neler yapıyoruz, derginin çıkışı ve sistemi nasıl
                ilerliyor hepsine şahit olmuş oluyor. Ay sonunda yaptığımız
                toplantılarda her geçen ayımızı değerlendiriyoruz ve kendisi
                bizimle devam edip etmeyeceğini bildiriyor. Eğer devam edecek
                olursak artık kalıcı yazarımız oluyor ve ekibimize dahil oluyor!
              </p>
              <span className="text-xl">2- Konuk Yazarlar:</span>
              <p>
                Dergi ekibine dahil olmak yerine “benim yoğunluğum var/sizin
                yoğunluğunuza ayak uyduramam ama arada sırada temaya uygun
                yazılar yazmak isterim” diyen arkadaşlarımız ise konuk
                yazarlarımız oluyor; zira biz sizleri misafir etmekten de keyif
                alıyoruz 😊 Bizlere Instagram sayfamızdan yahut mail
                adresimizden ulaşabilir, öneri ve isteklerinizi dile
                getirebilirsiniz!
              </p>
            </section>
          </div>
        </div>
      </main>
    </HomeLayout>
  );
};

export default About;
