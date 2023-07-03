import './LandingPage.css';
import testSpot from '../../images/testspot.jpg';

const testArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export default function LandingPage(store) {
    // console.log("LandingPage Store Content => ", store.getState);
    return (
                <div className="landing-page landing-page-container">
                    <div className="landing-page spot-card">
                        <img className="landing-page spot-card-img" src={testSpot} />
                        <div className="landing-page spot-card-details">
                            <div className="spot-details"><span>City, State</span><span>STAR</span></div>
                            <div className="spot-details"><span>PRICE night</span></div>
                        </div>
                    </div>
                </div>
    );
}
