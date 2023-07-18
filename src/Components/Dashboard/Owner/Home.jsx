import React from "react";
import ManageHouse from "./ManageHouse";
import Container from "../../../Layout/Container/Container";

const Home = () => {
    return (
        <Container>
            <div>{/* cards for dashboard with charts */}</div>
            <div className="mt-24">
                <ManageHouse />
            </div>
        </Container>
    );
};

export default Home;
