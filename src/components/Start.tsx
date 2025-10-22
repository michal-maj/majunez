import type { FC } from "react";
import React, { useEffect } from "react";

const Start: FC = () => {
  useEffect(() => {
    const timeoutIds: number[] = [];

    const schedule = (callback: () => void, delay = 100) => {
      const id = window.setTimeout(callback, delay);
      timeoutIds.push(id);
    };

    const handleParallax = () => {
      const scrolled = window.pageYOffset;

      // Parallax for subsections
      const sections = document.querySelectorAll(".subsection");
      sections.forEach((section, index) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const windowHeight = window.innerHeight;

        // Calculate if section is in viewport
        if (
          scrolled + windowHeight > sectionTop &&
          scrolled < sectionTop + sectionHeight
        ) {
          const offset =
            (scrolled + windowHeight - sectionTop) /
            (windowHeight + sectionHeight);
          const parallaxSpeed = 0.4; // Adjust for more/less parallax effect
          const translateY = (offset - 0.5) * 100 * parallaxSpeed;

          const content = section.querySelector(
            ".subsectionrow"
          ) as HTMLElement;
          if (content) {
            content.style.transform = `translateY(${translateY}px)`;
          }

          // Add depth effect to images within sections
          const images = section.querySelectorAll("img");
          images.forEach((img, imgIndex) => {
            const imgSpeed = 0.2 + imgIndex * 0.1;
            const imgTranslate = (offset - 0.5) * 80 * imgSpeed;
            (
              img as HTMLElement
            ).style.transform = `translateY(${imgTranslate}px) scale(${
              1 + offset * 0.05
            })`;
          });

          // Add parallax to section backgrounds (more subtle effect)
          const sectionElement = section as HTMLElement;
          const bgSpeed = 4; // Reduced speed for subtler effect
          const scrollProgress = (scrolled - sectionTop) / sectionHeight;
          const bgTranslate = scrollProgress * 50 * bgSpeed; // More controlled movement
          sectionElement.style.backgroundPositionY = `${bgTranslate}px`;
        }
      });

      // Parallax for hero video
      const heroVideo = document.querySelector(
        ".hero-video__media"
      ) as HTMLElement;
      if (heroVideo) {
        const heroSection = document.querySelector(
          ".hero-intro"
        ) as HTMLElement;
        if (heroSection) {
          const heroHeight = heroSection.offsetHeight;
          const scrollPercent = Math.min(scrolled / heroHeight, 1);
          heroVideo.style.transform = `translate(-50%, calc(-50% + ${
            scrollPercent * 50
          }px)) scale(${1 + scrollPercent * 0.1})`;
        }
      }

      // Fade and scale effect for scroll down buttons
      const scrollButtons = document.querySelectorAll(".scrolldown");
      scrollButtons.forEach((button) => {
        const parent = (button as HTMLElement).closest(
          ".subsection"
        ) as HTMLElement;
        if (parent) {
          const parentTop = parent.offsetTop;
          const parentHeight = parent.offsetHeight;
          const distanceFromTop = scrolled - parentTop;
          const fadeStart = parentHeight * 0.7;

          if (distanceFromTop > fadeStart) {
            const fadeProgress = Math.min(
              (distanceFromTop - fadeStart) / (parentHeight * 0.3),
              1
            );
            (button as HTMLElement).style.opacity = String(1 - fadeProgress);
            (button as HTMLElement).style.transform = `translateY(${
              fadeProgress * 20
            }px)`;
          } else {
            (button as HTMLElement).style.opacity = "1";
            (button as HTMLElement).style.transform = "translateY(0)";
          }
        }
      });
    };

    const updateHeroHeight = () => {
      const $ = window.$;

      if (!$) {
        return;
      }

      const $hero = $(".hero-intro");

      if (!$hero.length) {
        return;
      }

      const headerHeight =
        $(".navbar.navbar-fixed-top").outerHeight() ??
        $(".navbar").outerHeight() ??
        0;

      const viewportHeight = $(window).height();
      const targetHeight = Math.max(viewportHeight - headerHeight, 420);

      const paddingTop = parseFloat($hero.css("padding-top") ?? "0");
      const paddingBottom = parseFloat($hero.css("padding-bottom") ?? "0");
      const verticalPadding = paddingTop + paddingBottom;

      const contentHeight = Math.max(targetHeight - verticalPadding, 320);

      $hero.css({
        height: contentHeight,
        "min-height": contentHeight,
      });
    };

    const centerSubsectionRows = () => {
      const $ = window.$;

      if (!$) {
        return;
      }

      $(".subsectionrow").each(function (this: HTMLElement) {
        const $section = $(this).closest(".subsection");
        const subsectionHeight = $section.height();
        const rowHeight = $(this).height();
        const calculatedMargin = (subsectionHeight - rowHeight) / 2;

        $(this).css(
          "margin-top",
          calculatedMargin > 50 ? calculatedMargin : 50
        );
      });
    };

    const initStart = () => {
      const $ = window.$;

      if (!$) {
        return;
      }

      $(".full-page1").css("min-height", $(window).height() - 160);
      $(".full-page").css("min-height", $(window).height() - 60);

      $("#start4").css({
        "margin-bottom": "0",
        "padding-bottom": "40px",
      });

      updateHeroHeight();
      schedule(updateHeroHeight, 250);
      schedule(centerSubsectionRows);
    };

    const handleResize = () => {
      const $ = window.$;

      if (!$) {
        return;
      }

      $(".full-page1").css("min-height", $(window).height() - 160);
      $(".full-page").css("min-height", $(window).height() - 60);

      $("#start4").css({
        "margin-bottom": "0",
        "padding-bottom": "40px",
      });

      updateHeroHeight();
      schedule(updateHeroHeight, 250);
      schedule(centerSubsectionRows);
    };

    initStart();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleParallax);
    handleParallax(); // Initial call

    return () => {
      const $ = window.$;

      if ($) {
        $(".goto-start, .goto1, .goto2, .goto3").off("click keydown");
      }

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleParallax);
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Animated hero title logic
  const animatedWords = [
    "Michał",
    "programistą",
    "designerem",
    "developerem",
    "twórcą",
  ];
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [displayedText, setDisplayedText] = React.useState(animatedWords[0]);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [charIndex, setCharIndex] = React.useState(animatedWords[0].length);
  const [blink, setBlink] = React.useState(true);

  useEffect(() => {
    let typingTimeout: number;
    let blinkTimeout: number;
    const currentWord = animatedWords[currentWordIndex];

    // Blinking cursor effect
    blinkTimeout = window.setTimeout(() => {
      setBlink((b) => !b);
    }, 500);

    if (isDeleting) {
      if (charIndex > 0) {
        typingTimeout = window.setTimeout(() => {
          setDisplayedText(currentWord.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 60);
      } else {
        typingTimeout = window.setTimeout(() => {
          setIsDeleting(false);
          setCurrentWordIndex((i) => (i + 1) % animatedWords.length);
        }, 400);
      }
    } else {
      if (charIndex < animatedWords[currentWordIndex].length) {
        typingTimeout = window.setTimeout(() => {
          setDisplayedText(currentWord.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 80);
      } else {
        typingTimeout = window.setTimeout(() => {
          setIsDeleting(true);
        }, 1200);
      }
    }
    return () => {
      window.clearTimeout(typingTimeout);
      window.clearTimeout(blinkTimeout);
    };
  }, [charIndex, isDeleting, currentWordIndex]);

  return (
    <div className="mainsection">
      <section className="hero-intro">
        <div className="hero-video" aria-hidden="true">
          <video
            className="hero-video__media video__media"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/assets/majunez_bg.webm" type="video/webm" />
            <source src="/assets/majunez_bg.mp4" type="video/mp4" />
            <source src="/assets/majunez_bg.ogv" type="video/ogg" />
          </video>
        </div>
        <div className="container hero-content">
          <div className="row">
            <div className="span12">
              <h1 className="hero-title">
                Cześć, jestem{" "}
                <span
                  className="hero-animated-word"
                  style={{
                    borderRight: blink
                      ? "2px solid #fff"
                      : "2px solid transparent",
                    paddingRight: "4px",
                    transition: "border-color 0.2s",
                  }}
                >
                  {displayedText}
                </span>
              </h1>
              <h2 className="hero-subtext">
                Tworzę produkty, które łączą inżynierię z dobrym designem
              </h2>
            </div>
          </div>
          {/* <div className="row">
            <div className="span12">
              <img
                src="/img/majunez_logo_big.png"
                alt="Majunez Logo"
                className="hero-logo"
              />
            </div>
          </div> */}
          <div className="row">
            <div className="span10 offset1">
              <p className="hero-lead">
                Zaczynałem jako grafik — dziś tworzę aplikacje w React i
                Node.js, które łączą estetykę z technologią. Lubię, gdy kod jest
                czysty, interfejs intuicyjny, a technologia naprawdę ułatwia
                ludziom życie.
              </p>
              {/*<div className="hero-pill-group">
                <span className="hero-pill">
                  Full-stack React &amp; Node.js
                </span>
                <span className="hero-pill">UX-first Engineering</span>
                <span className="hero-pill">AI-assisted Workflows</span>
              </div> */}
              <a className="hero-cta goto-start" href="#start1">
                <i className="icon-chevron-down"></i> Zobacz projekty i historie
              </a>
            </div>
          </div>
        </div>
      </section>
      <div id="start1" className="full-page1 section1 subsection">
        <div className="container">
          <div className="row subsectionrow">
            <div className="span5 sectiontxt">
              <div className="section_header">
                <h1>
                  Pisk opon, ryk silników... <small>i liczenie punktów</small>
                </h1>
              </div>
              <p>
                W tym roku po raz kolejny uczestniczyłem w organizacji zawodów
                Budmat Drift Show. Tym razem oprócz animacji i wstawek
                wzbogacających imprezę, liczyłem punkty... za pomocą stworzonej
                własnoręcznie aplikacji. System pozwolił na wyświetlanie belek z
                info o zawodnikach, teamach i maszynach z odpowiadającą im
                aktualną punktacją. Punkty automatycznie trafiały do tabel,
                które później można było również wyświetlić na telebimie.
                Wszystko zadziałało bez zarzutu, więc miałem przy tym sporo
                frajdy ;]
              </p>
              <a href="#?id=sub/budmat" className="seemore1">
                <i className="icon-folder-open"></i> Zobacz Projekt
              </a>
            </div>
            <div className="span7 ytv">
              <iframe
                width="640"
                height="360"
                src="//www.youtube.com/embed/Pa2ehYMIvCk?wmode=opaque&rel=0"
                title="Budmat Drift Show"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="outerbottom">
          <a id="aboutgoto1" className="scrolldown" href="#start2">
            <h1 className="icon-chevron-down"></h1>
          </a>
        </div>
      </div>

      <div id="start2" className="full-page section2 subsection">
        <div className="container">
          <div className="row subsectionrow">
            <div className="span5 sectiontxt">
              <div className="section_header">
                <h1>
                  Zaksa na mistrza! <br />
                  <small>koszulki i logo fanklubu</small>
                </h1>
              </div>
              <p>
                Fanklub Zaksy Kędzierzyn Koźle z okazji wielkiego finału
                potrzebował koszulki na tę specjalną okazję. Na spółkę z kolegą
                stworzyliśmy projekt, który tak się spodobał, że fanklub
                postanowił przyjąć go jako swój herb :)
              </p>
              <img
                src="/img/gallery/img/zaksa_fanclub.jpg"
                alt="Zaksa Fanclub"
              />
            </div>
            <div className="span7 ytv">
              <img src="/img/gallery/img/zaksa_tsirt.jpg" alt="Zaksa Tshirt" />
            </div>
            <div className="span5">
              <img src="/img/gallery/img/zaksa_hala.jpg" alt="Zaksa Hala" />
            </div>
            <a href="#?id=sub/zaksa" className="seemore1">
              <i className="icon-folder-open"></i> Zobacz Projekt
            </a>
          </div>
        </div>
        <div className="outerbottom">
          <a id="aboutgoto1" className="scrolldown" href="#start3">
            <h1 className="icon-chevron-down"></h1>
          </a>
        </div>
      </div>

      <div id="start3" className="full-page section3 subsection">
        <div className="container">
          <div className="row subsectionrow">
            <div className="span5 sectiontxt">
              <div className="section_header">
                <h1>
                  Dobra szama!
                  <br />
                  <small>Wizualizacja restauracji</small>
                </h1>
              </div>
              <p>
                Projekt niewielkiej restauracji w amerykańskim stylu. Połączenie
                niebieskiej wykładziny, biało-czerwonych obrusów nawiązuje do
                dawnych restauracji w USA.
              </p>
              <img
                src="/img/gallery/img/wiz_25b.jpg"
                alt="Restauracja Wizualizacja"
              />
            </div>
            <div className="span7 ytv">
              <img src="/img/restauracja_start.jpg" alt="Restauracja Start" />
            </div>
            <a href="#?id=sub/restauracja" className="seemore1">
              <i className="icon-folder-open"></i> Zobacz Projekt
            </a>
          </div>
        </div>
        <div className="outerbottom">
          <a id="aboutgoto1" className="scrolldown" href="#start4">
            <h1 className="icon-chevron-down"></h1>
          </a>
        </div>
      </div>

      <div id="start4" className="full-page section4 subsection">
        <div className="container">
          <div className="row subsectionrow">
            <div className="span4 sectiontxt">
              <div className="section_header">
                <h1>Zwycięstwo w konkursie na logo</h1>
              </div>
              <p>
                Projekt niewielkiej restauracji w amerykańskim stylu. Połączenie
                niebieskiej wykładziny, biało-czerwonych obrusów nawiązuje do
                dawnych restauracji w USA.
              </p>
              <img src="/img/zwyciestwo1.jpg" alt="Zwycięstwo" />
            </div>
            <div className="span8 ytv">
              <img src="/img/gallery/img/log_2.jpg" alt="Projekt Logo" />
            </div>
            <a href="#?id=sub/srodowiskologo" className="seemore1">
              <i className="icon-folder-open"></i> Zobacz Projekt
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
