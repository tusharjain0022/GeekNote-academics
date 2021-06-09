import "./InviteLink.css";

function InviteLink({ adminType }) {
    return (
        <div className='invite-component container'>
            <h4>Invite Link for {adminType} Admin </h4>
            <div className='row'>
                <div className='col-12 col-lg-9'>
                    <input
                        type='text'
                        className='invite-link'
                        value={`https://geeknote-academics.netlify.app?id=1234567892y7625152628873`}
                    ></input>
                </div>
                <div className='col-12 col-lg-3'>
                    <button type='button' className='btn invite-btn'>
                        Copy Link
                    </button>
                    <button type='button' className='btn invite-btn'>
                        New Link
                    </button>
                </div>
            </div>
        </div>
    );
}
export default InviteLink;
