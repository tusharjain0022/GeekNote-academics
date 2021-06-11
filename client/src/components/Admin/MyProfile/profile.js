import "./profile.css";
import mail from "../../../images/mail.svg";
import github from "../../../images/GitHub_logo.svg";
// import instagram from "../../../../images/Instagram_logo.svg";
import linkedin from "../../../images/LinkedIn_logo.svg";

function Profile({ admin }) {
    return (
        <div className='container' key={admin._id}>
            <div className='row'>
                <div className='col-12 col-lg-4  align-self-center'>
                    <img
                        className=' dev-images'
                        src='images/def.png'
                        alt='tushar'
                    ></img>
                </div>
                <div className='dev-text-box col-12 col-lg-8'>
                    <div className='row'>
                        <div className='col-12 col-lg-6'>
                            <h4 className='mt-3'>{admin.name}</h4>
                            <p> {admin.adminType} Admin</p>
                        </div>
                        <div className='col-12 col-lg-6'>
                            <button type='button' className='btn profile-btn'>
                                Edit Profile
                            </button>
                            <button type='button' className='btn profile-btn'>
                                Verify Profile
                            </button>
                            <button type='button' className='btn profile-btn'>
                                Delete Profile
                            </button>
                        </div>
                        <div className='col-12'>
                            <p className='dev-intro'> {admin.intro}</p>
                            <div className='Links'>
                                <a href={admin.github} className='mr-3'>
                                    <img src={github} alt='github' />
                                </a>
                                <a href={admin.linkedin} className='mr-3'>
                                    <img src={linkedin} alt='Dribbble' />
                                </a>
                                <a
                                    href={"mailto:" + admin.email}
                                    className='mr-3'
                                >
                                    <img src={mail} alt='mail' />
                                </a>
                                {/* {admin.instaLink !== "null" && (
                            <a href={admin.instaLink} className='mr-3'>
                                <img src={instagram} alt='instagram' />
                            </a>
                        )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;
