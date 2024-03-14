import '../styles/LoginBackground.css';

const LoginBackground = () => {
    return (
        <div className='login-background'>
            <div className="position-absolute d-flex flex-row m-0" 
            style={{height:"100%", width: "100%", left: "0", top: "0", zIndex: "-2", }}>
                <div className='position-relative col-xl-6 col-lg-9 col-md-10 col-11 mx-auto' 
                style={{height: "70%", top: "15%", backgroundColor: "#0a0c27", border: "5px solid #0a0c27", borderRadius: "20px"}}>
                </div>
            </div>
            <div className="position-absolute d-flex flex-row m-0" style={{height:"100%", width: "95%", left: "2.5%", top: "0", zIndex: "-1"}}>
                <div className='doodle-wrapper position-relative col-xl-6 col-lg-9 col-md-10 col-11 mx-auto' style={{height: "70%", top: "15%", 
                animation: "fade 4s linear", animationIterationCount: "infinite"}}>
                    <css-doodle>
                        {`
                            :doodle {
                                @grid: 20x14 / 100% 100% / #0a0c27;
                                @grid-gap: 0px;
                            }
                            @random {
                                border-left: 1px solid #5d81bc;
                            }
                            @random {
                                border-top: 1px solid #5d81bc;
                            }
                            @random(.25) {
                                background: linear-gradient(
                                    @p(#fff, tan, #5d81bc), @lp
                                )
                                50% / @r(60%) @lr
                                no-repeat;
                            }
                            @random {
                                filter: drop-shadow(0 0 10px #fff);
                            }
                            @media (max-width: 576px) {
                                cell {
                                    border: 0px solid #0a0c27 !important;
                                }
                            }
                        `}
                    </css-doodle>
                </div>
            </div>
        </div>
    )
}

export default LoginBackground;