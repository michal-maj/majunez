import type { FC } from "react";
import { useEffect } from "react";

const Start: FC = () => {
  useEffect(() => {
    const timeoutIds: number[] = [];

    const schedule = (callback: () => void, delay = 100) => {
      const id = window.setTimeout(callback, delay);
      timeoutIds.push(id);
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

      schedule(centerSubsectionRows);

      $(".goto1")
        .off("click")
        .on("click", function (event: Event) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: $(".section2").offset().top - 60,
            },
            2000
          );
        });

      $(".goto2")
        .off("click")
        .on("click", function (event: Event) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: $(".section3").offset().top - 60,
            },
            2000
          );
        });

      $(".goto3")
        .off("click")
        .on("click", function (event: Event) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: $(".section4").offset().top - 60,
            },
            2000
          );
        });
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

      schedule(centerSubsectionRows);
    };

    initStart();
    window.addEventListener("resize", handleResize);

    return () => {
      const $ = window.$;

      if ($) {
        $(".goto1, .goto2, .goto3").off("click");
      }

      window.removeEventListener("resize", handleResize);
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div className="mainsection">
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
          <div id="aboutgoto1" className="scrolldown goto1">
            <h1 className="icon-chevron-down"></h1>
          </div>
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
          <div id="aboutgoto2" className="scrolldown goto2">
            <h1 className="icon-chevron-down"></h1>
          </div>
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
          <div id="aboutgoto3" className="scrolldown goto3">
            <h1 className="icon-chevron-down"></h1>
          </div>
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
