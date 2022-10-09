import React from "react";

import { UpArrow } from "./UpArrow";
import { DownArrow } from "./DownArrow";

export default function StatRow({ bg, stat, statAmount, text }) {

    const statUp = stat === 'up';
    const color = statUp ? 'success' : 'danger';

    return (
        <div className="stat-row">
            <div className={`d-flex align-items-center gap-2 ${bg ? `badge badge--${color}` : ''} `}>
                {statUp ? (<UpArrow />) : (<DownArrow />)}
                <span className={` ${statUp ? 'text-success' : 'text-danger'}`}>
                    {statAmount}%</span>
            </div> {text.toLowerCase()}
        </div>
    )
}