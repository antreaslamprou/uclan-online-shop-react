export default function Footer() {
    return(
        <footer className="bg-secondary p-5 text-white">
            <div className="container-md">
                <div className="d-flex justify-content-between d-none d-lg-flex">
                    <div>
                        <h5>Links</h5>
                        <p><a className="text-white fw-bold" target="blank" href="https://www.uclan.ac.uk/">UCLan Home Page </a></p>
                        <p><a className="text-white fw-bold" target="blank" href="https://www.uclancyprus.ac.cy/">UCLan Cyprus Home Page </a></p>
                    </div>
                    <div>
                        <h5>Contact</h5>
                        <p>Email: <a className="text-white fw-bold" href="mailto:info@uclancyprus.ac.cy">info@uclancyprus.ac.cy</a></p>
                        <p>Phone: <a className="text-white fw-bold" href="tel:+35724694000">+357 24 69 40 00</a></p>
                    </div>
                    <div>
                        <h5>Address</h5>
                        <p>University of Central Lancashire Cyprus</p>
                        <a className="text-white fw-bold" target="blank" href="https://maps.app.goo.gl/fzEL8AzPD3KhCH8z6">12 University Avenue Pyla, 7080, Larnaca</a>
                    </div>
                </div>
                <div className="accordion accordion-flush d-lg-none">
                    <div className="accordion-item">
                        <p className="accordion-header" id="accordion-links">
                            <button className="accordion-button collapsed bg-secondary text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-links" aria-expanded="true" aria-controls="collapseOne">
                                <h5>Links</h5>
                            </button>
                        </p>
                        <div id="collapse-links" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body bg-secondary">
                            <p><a className="text-white fw-bold" target="blank" href="https://www.uclan.ac.uk/">UCLan Home Page </a></p>
                            <p><a className="text-white fw-bold" target="blank" href="https://www.uclancyprus.ac.cy/">UCLan Cyprus Home Page </a></p>
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item text-white">
                        <p className="accordion-header" id="accordion-contact">
                            <button className="accordion-button collapsed bg-secondary text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-contact" aria-expanded="true" aria-controls="collapseOne">
                                <h5>Contact</h5>
                            </button>
                        </p>
                        <div id="collapse-contact" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body bg-secondary">
                            <p>Email: <a className="text-white fw-bold" href="mailto:info@uclancyprus.ac.cy">info@uclancyprus.ac.cy</a></p>
                            <p>Phone: <a className="text-white fw-bold" href="tel:+35724694000">+357 24 69 40 00</a></p>
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item text-white">
                        <p className="accordion-header" id="accordion-address">
                            <button className="accordion-button collapsed bg-secondary text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-address" aria-expanded="true" aria-controls="collapseOne">
                            <h5>Address</h5>
                            </button>
                        </p>
                        <div id="collapse-address" className="accordion-collapse collapse" aria-labelledby="headingOne">
                        <div className="accordion-body bg-secondary">
                            <p>University of Central Lancashire Cyprus</p>
                            <a className="text-white fw-bold" target="blank" href="https://maps.app.goo.gl/fzEL8AzPD3KhCH8z6">12 University Avenue Pyla, 7080, Larnaca</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-md text-center pt-4 opacity-50'>
                <img className="" src="/images/uclanlogo.png" alt="Page Logo" />
            </div>
        </footer>
    )
}