import type { FC } from "react";
import { useEffect } from "react";
import { FaCode } from "react-icons/fa";
import {
  SiAngular,
  SiCss3,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";

const About: FC = () => {
  useEffect(() => {
    const $ = window.$ as any;

    if ($) {
      const windowHeight = $(window).height();
      $(".full-page1").css("min-height", windowHeight - 160);
      $(".full-page").css("min-height", windowHeight - 60);
      $("#about4").css("min-height", windowHeight - 60);
    }
  }, []);

  useEffect(() => {
    let isInitialized = false;
    let observer: IntersectionObserver | null = null;

    const observeProgressBars = (): IntersectionObserver | null => {
      const $ = window.$ as any;

      if (!$) {
        return null;
      }

      if (window.IntersectionObserver) {
        const localObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const $progressBar = window.$?.(entry.target) as any;

                if ($progressBar && $progressBar.data("triggered") !== 1) {
                  const percentage = `${$progressBar.find("span").text()}%`;
                  $progressBar.find("div").animate({ width: percentage }, 1500);
                  $progressBar.animate({ opacity: "1" }, 500);
                  $progressBar.data("triggered", 1);
                }
              }
            });
          },
          {
            threshold: 0.3,
            rootMargin: "0px 0px -100px 0px",
          }
        );

        $(".progressBar").each((_: number, element: Element) => {
          localObserver.observe(element);
        });

        return localObserver;
      }

      const scrollHandler = () => {
        try {
          $(".progressBar").each(function (this: HTMLElement) {
            const $this = $(this);
            const offset = $this.offset();

            if (!offset) {
              return;
            }

            const elementTop = offset.top;
            const elementBottom = elementTop + $this.outerHeight();
            const $window = $(window) as any;
            const viewportTop =
              typeof $window.scrollTop === "function" ? $window.scrollTop() : 0;
            const viewportBottom = viewportTop + $window.height();

            if (
              viewportBottom > elementTop + 100 &&
              viewportTop < elementBottom
            ) {
              if ($this.data("triggered") !== 1) {
                const percentage = `${$this.find("span").text()}%`;
                $this.find("div").animate({ width: percentage }, 1500);
                $this.animate({ opacity: "1" }, 500);
                $this.data("triggered", 1);
              }
            }
          });
        } catch (error) {
          console.error("Progress bar scroll handler error:", error);
        }
      };

      $(window)
        .off("scroll.aboutProgress")
        .on("scroll.aboutProgress", scrollHandler as never);
      return null;
    };

    const initAbout = () => {
      const $ = window.$ as any;

      if (isInitialized || !$) {
        return;
      }

      isInitialized = true;

      $(".subsectionrow").each(function (this: HTMLElement) {
        const $this = $(this);
        const sectionHeight = $(".subsection").height();
        const rowHeight = $this.height();
        const marginTop =
          (sectionHeight - rowHeight) / 2 > 50
            ? (sectionHeight - rowHeight) / 2
            : 50;
        $this.css({ "margin-top": marginTop });
      });

      $(".progressBar").each(function (this: HTMLElement) {
        const $progressBar = $(this);
        $progressBar.css({ opacity: 0 });
        $progressBar.find("div").css({ width: "0%" });
        $progressBar.removeData("triggered");
      });

      const attachScrollHandler = (selector: string, target: string) => {
        $(selector)
          .off("click")
          .on("click", function () {
            const targetOffset = $(target).offset()?.top ?? 0;
            $("html, body").animate(
              {
                scrollTop: targetOffset - 60,
              },
              2000
            );
          });
      };

      attachScrollHandler(".goto1", ".section2");
      attachScrollHandler(".goto2", ".section3");
      attachScrollHandler(".goto3", ".section4");

      observer = observeProgressBars();
    };

    const handleResize = () => {
      const $ = window.$ as any;

      if ($) {
        $(".full-page1").css("min-height", $(window).height() - 160);
        $(".full-page").css("min-height", $(window).height() - 60);
      }
    };

    const timeoutId = window.setTimeout(() => {
      const $ = window.$ as any;

      if ($ && window.scrollHandler) {
        $(window).unbind("scroll", window.scrollHandler);
      }

      initAbout();
    }, 500);

    window.addEventListener("resize", handleResize);

    return () => {
      const $ = window.$ as any;

      if ($) {
        $(window).off("scroll.aboutProgress");
        $(".goto1, .goto2, .goto3").off("click");
      }

      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="mainsection">
      <div id="about1" className="full-page1 section1">
        <div className="container">
          <div
            className="row"
            itemScope
            itemType="http://data-vocabulary.org/Person"
          >
            <div className="span6 offset6">
              <div className="section_header">
                <h1>
                  <i className="icon-user"></i> Michał Maj{" "}
                  <small>Programista, Grafik, Animator</small>
                </h1>
              </div>
              <p>
                Nazywam się <span itemProp="name">Michał Maj</span> i jestem
                programistą. <br />
                <br />
                Zaczynałem jako <strong>grafik i projektant interfejsów</strong>
                , zafascynowany tym, jak obraz potrafi przekazać emocje.
                <br />Z czasem odkryłem, że jeszcze większą satysfakcję daje mi
                tworzenie tego, <strong>co za tym obrazem stoi</strong> -
                logiki, interakcji i całych aplikacji.
                <br />
                Tak trafiłem do świata programowania. <br />
                <br />
                Dziś, po ponad <strong>15 latach w branży</strong>, jestem{" "}
                <strong>Senior Front-End Engineerem</strong> pracującym z{" "}
                <strong>Reactem, Node.js i TypeScriptem</strong>.<br />
                Buduję aplikacje od frontu po backend, projektuję rozwiązania,
                które są szybkie, intuicyjne i skalowalne.
                <br />
                Łączę <strong>techniczne myślenie inżyniera</strong> z{" "}
                <strong>estetyką projektanta</strong>, dzięki czemu tworzę
                produkty, które nie tylko działają, ale też dobrze wyglądają i
                mają sens dla użytkownika.
                <br />
                <br />
                Uwielbiam wyzwania — od złożonych systemów AI po usprawnienia,
                które oszczędzają zespołom godziny pracy.
                <br />
                Wciąż uczę się nowych rzeczy, bo wierzę, że technologia jest
                najciekawsza wtedy, gdy naprawdę{" "}
                <strong>rozwiązuje problemy ludzi</strong>.
              </p>
            </div>
          </div>
        </div>
        <div className="outerbottom">
          <div id="aboutgoto1" className="scrolldown goto1">
            <h1 className="icon-chevron-down"></h1>
          </div>
        </div>
      </div>

      <div id="about2" className="full-page section2">
        <div className="container">
          <div className="row">
            <div className="span12">
              <h2>
                <i className="icon-code"></i> Programowanie
              </h2>
              <div className="row">
                <div className="span6">
                  <h4>
                    <i className="icon-list-alt"></i> FRONT END / APLIKACJE
                    INTERNETOWE
                  </h4>
                  <p>
                    Od ponad 15 lat tworzę nowoczesne aplikacje webowe - od
                    koncepcji po wdrożenie.
                    <br />
                    Specjalizuję się w{" "}
                    <strong>TypeScript, React i Node.js</strong>, pracując dziś
                    głównie full-stack. Moim celem jest zawsze{" "}
                    <strong>intuicyjny interfejs</strong>,{" "}
                    <strong>czysty kod</strong> i{" "}
                    <strong>realna wartość dla użytkownika</strong>.
                    <br />
                    <br />
                    Na co dzień rozwijam produkty w międzynarodowych zespołach -
                    ostatnio w amerykańskim startupie <strong>project44</strong>
                    , gdzie odpowiadałem za projektowanie i rozwój nowych
                    funkcji front-endowych oraz ich integrację po stronie
                    back-endu.
                    <br />
                    Pracuję z technologiami{" "}
                    <strong>React, Node.js, Nest.js</strong>, a także{" "}
                    <strong>Vercel AI SDK, Zod, Jest, Playwright</strong>.
                    <br />
                    Uwielbiam łączyć inżynierię z dobrym UX-em - to połączenie,
                    które daje najlepsze efekty.
                    <br />
                    <br /> Jednym z moich autorskich projektów był{" "}
                    <strong>
                      silnik do generowania dynamicznych szablonów e-mailowych
                    </strong>{" "}
                    w React + Node.js. Zastąpił ręczne tworzenie HTML-ów
                    komponentami, skracając czas pracy zespołów o ponad{" "}
                    <strong>60%</strong>. Z małego pomysłu powstało narzędzie
                    używane firmowo na szeroką skalę.
                  </p>
                </div>
                <div className="span6">
                  <h4>
                    <i className="icon-list-alt"></i> AI / NARZĘDZIA
                  </h4>
                  <p>
                    Najnowszym wyzwaniem, nad którym pracowałem, był{" "}
                    <strong>
                      AI Chatbot do zgłaszania problemów w miejscu pracy
                    </strong>
                    .<br />
                    Zintegrowałem go z{" "}
                    <strong>
                      mapami Mapbox i zewnętrznym systemem zgłaszania ticketów
                    </strong>
                    , dzięki czemu użytkownik może zgłosić usterkę, wskazać
                    lokalizację na mapie i dodać zdjęcie - a cały proces
                    tworzenia zgłoszenia odbywa się automatycznie.
                    <br />
                    Zastosowałem <strong>
                      Vercel AI SDK, OpenAPI i Zod
                    </strong>{" "}
                    do zarządzania przepływem danych i walidacji, a całość
                    zbudowałem w <strong>React</strong>.<br />
                    Projekt znacząco usprawnia proces raportowania i zmniejsza
                    obciążenie zespołów utrzymaniowych.
                  </p>
                </div>
                <div className="span6">
                  <h4>
                    <i className="icon-list-alt"></i> APLIKACJE MOBILNE I
                    STARTUPY
                  </h4>
                  <p>
                    Mam doświadczenie w pracy z <strong>React Native</strong>,{" "}
                    <strong>Flutter</strong> i <strong>Androidem</strong>.<br />
                    Jako współzałożyciel startupu, który łączył{" "}
                    <strong>zarządzanie zespołem z systemem benefitów</strong>,
                    odpowiadałem za <strong>koncepcję produktu, UX</strong> i
                    prowadzenie <strong>zespołu developerskiego</strong>.<br />
                    Aplikacja pozwalała tworzyć zadania i konkursy dla
                    pracowników, nagradzając ich punktami za aktywność -
                    połączenie grywalizacji i HR w jednym.
                  </p>
                </div>
              </div>

              <h2>
                <i className="icon-edit-sign"></i> UX / UI / GRAFIKA
              </h2>
              <div className="row">
                <div className="span6">
                  <h4>
                    <i className="icon-facetime-video"></i> ANIMACJE / FILMY /
                    EFEKTY SPECJALNE
                  </h4>
                  <p>
                    Zanim zostałem programistą, byłem{" "}
                    <strong>grafikiem i projektantem interfejsów</strong> - i to
                    doświadczenie zostało ze mną do dziś.
                    <br />
                    Dzięki temu potrafię patrzeć na produkt zarówno oczami
                    inżyniera, jak i użytkownika.
                    <br />
                    Mam doświadczenie w pracy z{" "}
                    <strong>
                      Photoshopem, Illustratorem, After Effectsem i 3ds Maxem
                    </strong>{" "}
                    - tworzyłem animacje eventowe, wizualizacje 3D i oprawy
                    wideo dla dużych marek.
                    <br />
                    <br />
                    Dziś to zaplecze przekłada się na{" "}
                    <strong>dopracowane detale interfejsów</strong> i lepsze
                    zrozumienie użytkownika.
                  </p>
                </div>
                <div className="span6">
                  <h4>
                    <i className="icon-fighter-jet"></i> NIETYPOWE PROJEKTY
                  </h4>
                  <p>
                    Lubię wychodzić poza schematy.
                    <br />
                    <br />W przeszłości tworzyłem:
                    <li>
                      <strong>strony 3D</strong> oglądane w okularach
                      anaglifowych,
                    </li>
                    <li>
                      <strong>projekty AR</strong> z wykorzystaniem kamery
                      internetowej,
                    </li>
                    <li>
                      <strong>gry i animacje interaktywne</strong> w Flash
                      (ActionScript 3.0) i Unity3D (C#).
                    </li>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="outerbottom">
          <div id="aboutgoto2" className="scrolldown goto2">
            <h1 className="icon-chevron-down"></h1>
          </div>
        </div>
      </div>

      <div id="about3" className="full-page section3">
        <div className="container">
          <div className="row">
            <div className="span12">
              <h1>
                <i className="icon-book"></i> Chodziłem do szkoły{" "}
                <small>
                  Uniwersytet Łódzki - Wydział Matematyki i Informatyki
                </small>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="span8">
              <h2>
                Praca Magisterska - Wykorzystanie rozszerzonej rzeczywistości w
                aplikacji edukacyjnej dla dzieci
              </h2>
              <h4>OPIS APLIKACJI</h4>
              <p>
                Stworzona aplikacja ma charakter edukacyjny i służy do nauki
                słów przez najmłodszych i tym samym do nauki czytania ze
                zrozumieniem. Rozszerzona rzeczywistość pozwala na odczytywanie
                liter układanych przez użytkownika w postaci rzeczywistych
                symboli przedstawionych na wydrukowanych kartkach, przez
                aplikację, poprzez kamerę podłączoną do komputera. Aplikacja
                losuje wyraz z bazy danych odczytywanej jako zewnętrzny XML, po
                czym odczytuje w dosłowny sposób (dźwiękowy) wyraz, który ma
                ułożyć użytkownik. Po tej czynności sprawdza w pętli czasowej
                czy użytkownik ułożył podany wyraz.
              </p>
            </div>
            <div className="span4">
              <div className="row">
                <div className="span2">
                  <img src="/img/magisterka1.jpg" alt="Magisterka 1" />
                </div>
                <div className="span2">
                  <img src="/img/magisterka2.jpg" alt="Magisterka 2" />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="span2">
                  <img src="/img/magisterka3.jpg" alt="Magisterka 3" />
                </div>
                <div className="span2">
                  <img src="/img/magisterka4.jpg" alt="Magisterka 4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="outerbottom">
          <div id="aboutgoto3" className="scrolldown goto3">
            <h1 className="icon-chevron-down"></h1>
          </div>
        </div>
      </div>

      <div id="about4" className="container section4">
        <div className="row">
          <div className="span12">
            <h1>
              <i className="icon-code"></i> Języki programowania
            </h1>
            <div className="programs_list code_icons">
              <div className="row">
                <div className="span1">
                  <SiTypescript size={48} style={{ color: "#3178C6" }} />
                </div>
                <div className="span11">
                  <div className="progressBar" data-tech="typescript">
                    <div>
                      <h2>TypeScript</h2>
                    </div>
                    <span>85</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="span1">
                  <SiJavascript size={48} style={{ color: "#F7DF1E" }} />
                </div>
                <div className="span11">
                  <div className="progressBar" data-tech="javascript">
                    <div>
                      <h2>
                        Javascript<small> (ES6) </small>
                      </h2>
                    </div>
                    <span>90</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="span1">
                  <SiReact size={48} style={{ color: "#61DAFB" }} />
                </div>
                <div className="span11">
                  <div className="progressBar" data-tech="react">
                    <div>
                      <h2>React</h2>
                    </div>
                    <span>90</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="span1">
                  <SiNodedotjs size={48} style={{ color: "#339933" }} />
                </div>
                <div className="span11">
                  <div className="progressBar" data-tech="nodejs">
                    <div>
                      <h2>Node.js</h2>
                    </div>
                    <span>70</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="span1">
                  <SiReact size={48} style={{ color: "#61DAFB" }} />
                </div>
                <div className="span11">
                  <div className="progressBar" data-tech="react-native">
                    <div>
                      <h2>React Native</h2>
                    </div>
                    <span>50</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="span1">
                  <SiAngular size={48} style={{ color: "#E23237" }} />
                </div>
                <div className="span11">
                  <div className="progressBar" data-tech="angular">
                    <div>
                      <h2>Angular</h2>
                    </div>
                    <span>30</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="span1">
                  <FaCode size={48} style={{ color: "#8A4182" }} />
                </div>
                <div className="span11">
                  <div className="progressBar" data-tech="testing">
                    <div>
                      <h2>Unit testing (Vitest, Jest, RTL)</h2>
                    </div>
                    <span>90</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="span1">
                  <SiCss3 size={48} style={{ color: "#1572B6" }} />
                </div>
                <div className="span11">
                  <div className="progressBar" data-tech="css3">
                    <div>
                      <h2>
                        CSS3<small> (Sass, Less) </small>
                      </h2>
                    </div>
                    <span>85</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="span1">
                  <SiHtml5 size={48} style={{ color: "#E34F26" }} />
                </div>
                <div className="span11">
                  <div className="progressBar" data-tech="html5">
                    <div>
                      <h2>HTML5</h2>
                    </div>
                    <span>80</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="span1 code_icons">
                  <SiGit size={48} style={{ color: "#F05032" }} />
                </div>
                <div className="span11">
                  <div className="progressBar" data-tech="git">
                    <div>
                      <h2>GIT</h2>
                    </div>
                    <span>70</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
