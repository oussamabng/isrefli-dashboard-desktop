import React from 'react';

//? import css
import "../../assets/css/Resume.css";
import { Icon } from 'semantic-ui-react';

const Resume = () => {
    return (
        <div className="resume">
            <h1>Résumé</h1>
            <div className="stats">
                <div className="card">
                    <Icon name="shopping cart" style={{
                        background:"rgb(96, 145, 209)"
                    }} />
                    <p>20</p>
                    <span>Commandes</span>
                </div>
                <div className="card">
                    <Icon name="checkmark" style={{
                        background:"rgb(126, 235, 235)"
                    }} />
                    <p>20</p>
                    <span>Commandes terminés</span>
                </div>
                <div className="card">
                    <Icon name="times" style={{
                        background:"rgb(228, 119, 146)"
                    }} />
                    <p>20</p>
                    <span>Commandes annulés</span>
                </div>
                <div className="card">
                    <Icon name="exclamation" style={{
                        background:"rgb(224, 203, 132)"
                    }} />
                    <p>0</p>
                    <span>Commandes non traités</span>
                </div>
            </div>
        </div>
    );
}

export default Resume;
