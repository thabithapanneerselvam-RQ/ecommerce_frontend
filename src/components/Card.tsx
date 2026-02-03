import React from "react";

export type CardProps={
    title: string
    children: React.ReactNode
}

function Card({title, children}: CardProps){
    return(
        <div className="card">
            <h2>{title}</h2>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export default Card;