import React, { Component } from 'react'

export default class MobileNav extends Component {
    render() {
        return (
            <>
                <button class=" mobNav bg-transparent d-flex d-md-none " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    <i class='bx bx-menu text-light' style={{ fontSize: "2rem" }}></i>
                </button>

                <div class="offcanvas bg-dark offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div class="offcanvas-header">
                        <h4 class="offcanvas-title text-light" id="offcanvasExampleLabel">Menu</h4>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">

                    </div>
                </div>
            </>
        )
    }
}
