import type { PortfolioItemData } from "../types/portfolio";

interface PortfolioItemProps {
  item: PortfolioItemData;
  category: string;
}

const PortfolioItem = ({ item, category }: PortfolioItemProps) => {
  const renderPlayButton = () => {
    if (!item.hasVideo) {
      return null;
    }

    return <div className="play_btn"></div>;
  };

  const renderLink = (link: string, label: string, iconClass: string) => (
    <a href={link} className="seemore">
      <i className={iconClass}></i>
      {label}
    </a>
  );

  const renderContent = () => {
    if (!item.thumbnail) {
      return (
        <div className="title">
          <h3>{item.title}</h3>
        </div>
      );
    }

    const mediaTarget = item.video ?? item.image ?? item.flash ?? "#";
    const link = item.link;

    if (item.hasDetails && item.description) {
      return (
        <>
          <div className="title">
            <img src={item.thumbnail} alt={item.title} />
            {renderPlayButton()}
            <h3>{item.title}</h3>
          </div>
          <div className="info">
            <p>
              {item.description}
              <br />
              <br />
            </p>
          </div>
          <a
            href={mediaTarget}
            className="mask portfolio_gallery"
            data-fancybox-group="gallery"
          >
            <h3>{item.title}</h3>
            {item.details && <small>{item.details}</small>}
            <div className="more">+</div>
          </a>
          {link &&
            renderLink(
              link,
              "Zobacz Projekt",
              link.includes("http")
                ? "icon-external-link-sign"
                : "icon-folder-open"
            )}
        </>
      );
    }

    return (
      <>
        <img src={item.thumbnail} alt={item.title} />
        {renderPlayButton()}
        <a
          href={mediaTarget}
          className="mask portfolio_gallery"
          data-fancybox-group="gallery"
        >
          <h3>{item.title}</h3>
          {item.details && <small>{item.details}</small>}
          <div className="more">+</div>
        </a>
        {link &&
          renderLink(
            link,
            link.includes("http") ? "Zobacz Stronę" : "Zobacz Projekt",
            link.includes("http")
              ? "icon-external-link-sign"
              : "icon-folder-open"
          )}
      </>
    );
  };

  const getClasses = () => {
    let classes = `photo ${category}`;
    if (!item.thumbnail) {
      classes += " about";
    }

    return classes;
  };

  return <div className={getClasses()}>{renderContent()}</div>;
};

export default PortfolioItem;
