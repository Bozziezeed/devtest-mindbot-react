import femaleImage from "../assets/female.png";
import maleImage from "../assets/male.png";
import "../style/GenderCard.css";
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
function GenderCard({ result }) {
  let genderImage;
  if (result.name.length > 0) {
    genderImage = result.gender === "female" ? femaleImage : maleImage;
  }

  return result.probability > 0.5 ? (
    <div className="card-container">
      <div className="image-bg-circle">
        <img src={genderImage} alt={genderImage} />
      </div>
      <div className="result-card">
        <p className="name">{result.name}</p>
        <div className="rectangle">
          <div className="percent">
            <span>
              <span className="percent-span">✦ </span>
              <span className="percent-span2">Gender:</span>
              <span className="percent-span3"> </span>
              <span className={`percent-span4 ${result.gender}`}>
                {result.gender.toUpperCase()}
                <br />
              </span>
              <span className="percent-span5">✦ </span>
              <span className="percent-span6">Probability:</span>
              <span className="percent-span7"> </span>
              <span className={`percent-span8 ${result.gender}`}>
                {(result.probability * 100).toFixed(2)}%
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="card-container">
      <div className="name-error">
        <span>
          Can not generate gender of
          <br />" {result.name} "
          <br />
          Please try other name
        </span>
      </div>
    </div>
  );
}

export default GenderCard;
