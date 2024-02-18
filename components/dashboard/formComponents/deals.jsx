import React from 'react';
const Deals = () => {
    return (
        <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="deals">
                Deals
            </label>

            <div className="flex gap-10">
                <div className="flex flex-col justify-start gap-1 h-[156px] w-[295px] p-5 border rounded-lg drop-shadow-xl bg-white">
                    <h1 className="font-bold">LifeTime 50% off</h1>
                    <p className="text-muted text-sm">
                        $4.99 <span className="line-through text-dull"> $10</span> / monthly
                    </p>
                    <span className="font-medium text-acentGreen p-2 border rounded-lg w-[132px]">
                        You save $5.01
                    </span>
                    <a className="text-DBlue font-medium text-sm" href="#">
                        Click to learn more
                    </a>
                </div>
                <div className="flex flex-col justify-start gap-1 h-[156px] w-[295px] p-5 border rounded-lg drop-shadow-xl bg-white">
                    <h1 className="font-bold">-25% off</h1>
                    <p className="text-muted text-sm">
                        $4.99 <span className="line-through text-dull"> $10</span> / monthly
                    </p>
                    <span className="font-medium text-acentGreen p-2 border rounded-lg w-[132px] text-sm">
                        You save $3.99
                    </span>
                    <a className="text-DBlue font-medium text-sm" href="#">
                        Click to learn more
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Deals;
