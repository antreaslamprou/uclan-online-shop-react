export default function Footer() {
    return(
        <footer className="bg-secondary p-5 text-white">
            <div className="container-md d-flex flex-column flex-md-row justify-content-between">
                <div>
                    <h3>Links</h3>
                    <p><a className="text-white fw-bold" href="https://www.uclan.ac.uk/">UCLan Home Page </a></p>
                    <p><a className="text-white fw-bold" href="https://www.uclancyprus.ac.cy/">UCLan Cyprus Home Page </a></p>
                </div>
                <div>
                    <h3>Contact</h3>
                    <p>Email: <a className="text-white fw-bold" href="mailto:info@uclancyprus.ac.cy">info@uclancyprus.ac.cy</a></p>
                    <p>Phone: <a className="text-white fw-bold" href="tel:+35724694000">+357 24 69 40 00</a></p>
                </div>
                <div>
                    <h3>Address</h3>
                    <p>University of Central Lancashire Cyprus</p>
                    <p>12 University Avenue Pyla, 7080, Larnaca</p>
                </div>
            </div>
            <div className='container-md text-center pt-4 opacity-50'>
                <img className="" src="/images/uclanlogo.png" alt="Page Logo" />
            </div>
        </footer>
    )
}