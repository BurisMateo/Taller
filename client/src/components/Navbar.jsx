import React from 'react'


const Navbar = () => {
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg" style={{ backgroundColor: "#64FF74" }} >
                <div className="container-fluid mb-0">
                    <a className="navbar-brand" href="#">Navbar</a>
                    
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <div class="input-group input-group-sm w-50 me-5">
                            <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"></input>
                            <button class="btn btn-outline-secondary bg-body-tertiary" type="button" id="button-addon2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="navbar sticky-top navbar-expand-lg" style={{ backgroundColor: "#64FF74" }} >
                <div className='container-fluid mt-0'>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <button type="button" class="btn btn-primary ms-2">Login</button>
                            <button type="button" class="btn btn-success ms-2 me-5">Sign up</button>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar;