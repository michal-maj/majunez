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
            <div className="span9 offset3">
              <div className="section_header">
                <h1>
                  <i className="icon-user"></i> Michał Maj{" "}
                  <small>Programista, Grafik, Animator</small>
                </h1>
              </div>
              <p>
                <b>
                  Nazywam się <span itemProp="name">Michał Maj</span> i pracuję
                  jako programista Front End, a także{" "}
                  <span itemProp="title">grafik</span> /{" "}
                  <span itemProp="title">animator</span>. Pod względem
                  graficznym zajmuję się projektowaniem, animacją, wizualizacją
                  i poligrafią. Robię to już od 8 lat. Od dziecka wykazywałem
                  zdolności rysunkowe i manualne. <br />
                  <br /> Moją drugą pasją jest programowanie, co udaje mi się
                  połączyć w części z moich projektów z grafiką. Z wykształcenia
                  jestem informatykiem (Wydział Matematyki i Informatyki
                  Uniwersytetu Łódzkiego), potrafię więc poprawnie i efektywnie
                  programować w kilku językach.
                </b>
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
                    <i className="icon-list-alt"></i> FRONT END / STRONY
                    INTERNETOWE
                  </h4>
                  <p>
                    Obecnie pracuję jako programista Front End i codziennie
                    koduję w HTML, CSS, SASS oraz Javascript. Posługuje się
                    również jQuery, Require JS oraz Prototype. Korzystam z
                    wbudowanych debuggerów przeglądarkowych oraz pluginów takich
                    jak Firebug. Dodatkowo wspomagam się tusk runnerami takimi
                    jak Grunt oraz Docpad, a także Compassem. Do kontroli wersji
                    używam SVN lub GITa. Obecnie pracuję przy developmencie
                    stron m.in. Polskich Linii Lotniczych LOT, Orange.pl, NJU
                    Mobile, PGNiG, DUON, Reiffeisen Polbank, Zakład Ubezpieczeń
                    Społecznych
                  </p>
                </div>
                <div className="span6">
                  <h4>
                    <i className="icon-gamepad"></i> PROGRAMOWANIE GIER I
                    APLIKACJI
                  </h4>
                  <p>
                    Programuję aplikacje na platformę Android z wykorzystaniem
                    technologii Bluetooth. Programowałem gry i aplikacje z
                    wykorzystaniem obiektów 3D w programach Flash (ActionScript
                    3.0), oraz Unity3D (C#).
                  </p>
                </div>
              </div>

              <h2>
                <i className="icon-edit-sign"></i> Grafika
              </h2>
              <div className="row">
                <div className="span3">
                  <h4>
                    <i className="icon-facetime-video"></i> ANIMACJE / FILMY /
                    EFEKTY SPECJALNE
                  </h4>
                  <p>
                    After Effects w połączeniu z 3ds Max'em - to programy, w
                    których zwykle przygotowuję filmy i animacje wyświetlane na
                    dużym ekranie podczas eventów. Wymyślanie oraz tworzenie
                    takich animacji opanowałem do perfekcji, wykorzystując przy
                    tym najnowsze techniki wizualizacji (m.in. particle,
                    motiontracking). W temacie animacji czuję się jak ryba w
                    wodzie.
                  </p>
                </div>
                <div className="span3">
                  <h4>
                    <i className="icon-eye-open"></i> WIZUALIZACJE 3D
                  </h4>
                  <p>
                    3ds Max (VRay) i Photoshop - korzystam z nich przy tworzeniu
                    wizualizacji. Począwszy od małych, nieskomplikowanych
                    przedmiotów jak projekty poligraficzne, poprzez bryły, takie
                    jak meble - zakończywszy na budynkach wraz z wnętrzem.
                    Modele oczywiście zawierają odpowiednie tekstury oraz
                    oświetlenie, dające fotorealistyczny wizerunek. Do projektów
                    budynków wykorzystuję również AutoCAD.
                  </p>
                </div>
                <div className="span3">
                  <h4>
                    <i className="icon-fighter-jet"></i> NIETYPOWE PROJEKTY
                  </h4>
                  <p>
                    Gdy standardy nie wystarczają sięgam po dodatkowe narzędzia.
                    Strona do oglądania w okularach 3D (czerwone, niebieskie) w
                    pełnym trójwymiarze, Rozszerzona rzeczywistość
                    wykorzystująca kamerę (również przez internet), oraz proste
                    gry, to jedne z takich projektów. Wykorzystuję do tego celu
                    programy takie jak Adobe Flash, którym posługuje się
                    perfekcyjnie zarówno w animacji, jak i skryptach
                    (ActionScript 3.0).
                  </p>
                </div>
                <div className="span3">
                  <h4>
                    <i className="icon-picture"></i> POLIGRAFIA, DTP, RYSUNEK,
                    WYKROJNIKI
                  </h4>
                  <p>
                    Adobe Photoshop, InDesign, Illustrator to programy, które
                    opanowałem doskonale. Zaprojektowanie i stworzenie grafiki
                    lub layoutu wraz z przygotowaniem do druku nie stanowi dla
                    mnie problemu. Na koncie mam dziesiątki wydrukowanych
                    poprawnie projektów, również o nietypowych kształtach, do
                    których sam tworzę wykrojniki. Mam też zdolności rysunkowe.
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
