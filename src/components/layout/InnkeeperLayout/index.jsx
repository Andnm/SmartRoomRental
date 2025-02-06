import React from "react";
import InnkeeperSidebar from "../../slider/InnkeeperSidebar";

const InnkeeperLayout = ({ children }) => {
    return (
        <div className="light-gray-background py-12">
            <div className="container account-page">
                <div className="flex h-fit ">
                    <InnkeeperSidebar />
                    <div className="flex-1 px-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default InnkeeperLayout;