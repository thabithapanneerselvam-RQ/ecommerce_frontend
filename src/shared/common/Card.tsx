import React from "react";
import "/home/thabitha/Documents/Frontend_training/ecommerce_FE_project/ecommerce/src/shared/styles/Card.scss"

export type CardProps={
    title: string
    children: React.ReactNode
}

function Card({title, children}: CardProps){
    return(
        <div className="card">
            <h2 className="card-title">{title}</h2>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export default Card;