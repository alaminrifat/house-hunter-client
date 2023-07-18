const isOwner = (user) => {
    if (user?.role === "House Owner") return true;
    else false;
};
const isRenter = (user) => {
    if (user?.role === "House Renter") return true;
    else false;
};

export  { isOwner, isRenter };
