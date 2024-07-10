import React from 'react';
import { useAuth } from '../store/auth';

export const Service = () => {
    const { services } = useAuth();
    console.log("I am services from forntend: ", services);
    return (
        <>
            <h1>Services</h1>
            <div className="services-container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {
                    services.map((currElem, index) => {
                        const { service, description, price, provider } = currElem;
                        return (
                            <div key={index} style={{ width: '300px', margin: '2%', border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                                <img src="/images/design.png" alt="Service Image" style={{ width: '100%', height: 'auto' }} />
                                <div style={{ padding: '15px' }}>
                                    <h3 style={{ margin: '0 0 10px 0' }}>{service}</h3>
                                    <p style={{ margin: '0 0 5px 0' }}>{description}</p>
                                    <p style={{ margin: '0 0 5px 0' }}><strong>Price:</strong> {price}</p>
                                    <p style={{ margin: '0' }}><strong>Provider:</strong> {provider}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};
